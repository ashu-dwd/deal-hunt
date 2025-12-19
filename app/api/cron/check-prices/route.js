import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropAlert } from "@/lib/email";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || cronSecret !== authHeader.split(" ")[1]) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //use service role to bypass rls
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");
    if (productsError) {
      console.error("Error fetching products:", productsError);
      return NextResponse.json(
        { error: "Error fetching products" },
        { status: 500 }
      );
    }
    const results = {
      total: products.length,
      success: true,
      products,
      updated: 0,
      failed: 0,
      priceChanges: 0,
    };
    for (const product of products) {
      try {
        const productData = await scrapeProduct(product.url);
        if (!productData.currentPrice) {
          results.failed++;
          continue;
        }

        const newPrice = parseFloat(productData.currentPrice);
        const currency = productData.currencyCode || product.currency || "USD";

        const isPriceChanged = newPrice !== product.current_price;

        const { data: upsertedProduct, error } = await supabase
          .from("products")
          .update({
            name: productData.productName,
            current_price: newPrice,
            currency,
            image_url: productData.productImageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id)
          .select()
          .single();

        if (error) {
          results.failed++;
          continue;
        }

        if (isPriceChanged) {
          await supabase.from("price_history").insert({
            product_id: upsertedProduct.id,
            price: newPrice,
            currency,
            checked_at: new Date().toISOString(),
          });

          const {
            data: { user },
            error,
          } = (await supabase).auth.admin.getUserById(product.user_id);
          if (error) {
            console.error("Error getting user:", error);
            continue;
          }
          if (user?.id) {
            //send mail to user
            const emailResult = await sendPriceDropAlert(
              user.email,
              product,
              oldPrice,
              newPrice
            );

            if (emailResult.success) {
              results.alertSent++;
            }
          }

          results.priceChanges++;
        }

        results.updated++;
      } catch (err) {
        console.error("Error scraping product:", err);
        results.failed++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cron job completed successfully",
      results,
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
