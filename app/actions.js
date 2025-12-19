"use server";

import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@/utils/supabase/server";
import { parse } from "date-fns";
import { is } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { success } from "zod";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}

export const addProduct = async (formData) => {
  const url = formData.get("url");
  if (!url) {
    return { error: "Please enter a valid URL" };
  }
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "You must be logged in to add a product" };
    }
    const productData = await scrapeProduct(url);
    if (!productData.productName) {
      return { error: "Failed to scrape product data" };
    }
    const newPrice = parseFloat(productData.currentPrice);
    const currency = productData.currencyCode || "USD";
    const { data: existingProduct } = await supabase
      .from("products")
      .select("id", "current_price")
      .eq("user_id", user_id)
      .eq("url", url)
      .single();

    const isUpdate = !!existingProduct;

    //upsert product
    const { data: product, error } = await supabase
      .from("products")
      .upsert(
        {
          user_id: user.id,
          url: url,
          name: productData.productName,
          current_price: newPrice,
          currency: currency,
          image_url: productData.productImageUrl,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "url,user_id",
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (error) {
      return { error: "Failed to add product" };
    }
    //add to price_history if it is a new product or price has changed
    if (isUpdate || newPrice !== existingProduct.current_price) {
      await supabase
        .from("price_history")
        .insert({
          user_id: user.id,
          product_id: product.id,
          price: newPrice,
          currency: currency,
          date: new Date().toISOString(),
        })
        .select()
        .single();
    }
    revalidatePath("/");
    return {
      success: true,
      message: isUpdate ? "Updated product" : "Added product",
      product: product,
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return { error: error.message || "Failed to add product" };
  }
};

//delete product
export const deleteProduct = async (productId) => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to delete a product" };
  }
  const { data: product, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("user_id", user.id)
    .select()
    .single();
  if (error) {
    return { error: "Failed to delete product" };
  }
  revalidatePath("/");
  return {
    success: true,
    message: "Deleted product",
    product: product,
  };
};

export const updateProduct = async (productId, formData) => {
  const url = formData.get("url");
  if (!url) {
    return { error: "Please enter a valid URL" };
  }
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (!user) {
      return { error: "You must be logged in to update a product" };
    }
    const productData = await scrapeProduct(url);
    if (!productData.productName) {
      return { error: "Failed to scrape product data" };
    }
    const newPrice = parseFloat(productData.currentPrice);
    const currency = productData.currencyCode || "USD";
    const { data: existingProduct } = await supabase
      .from("products")
      .select("id", "current_price")
      .eq("user_id", user.id)
      .eq("url", url)
      .single();

    const isUpdate = !!existingProduct;

    //upsert product
    const { data: product, error } = await supabase
      .from("products")
      .upsert(
        {
          user_id: user.id,
          url: url,
          name: productData.productName,
          current_price: newPrice,
          currency: currency,
          image_url: productData.productImageUrl,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "url,user_id",
          ignoreDuplicates: false,
        }
      )
      .select()
      .single();

    if (error) {
      return { error: "Failed to update product" };
    }
    //add to price_history if it is a new product or price has changed
    if (isUpdate || newPrice !== existingProduct.current_price) {
      await supabase
        .from("price_history")
        .insert({
          user_id: user.id,
          product_id: product.id,
          price: newPrice,
          currency: currency,
          date: new Date().toISOString(),
        })
        .select()
        .single();
    }
    revalidatePath("/");
    return {
      success: true,
      message: isUpdate ? "Updated product" : "Added product",
      product: product,
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      success: false,
      message: "Failed to add product",
    };
  }
};

//get all products
export const getAllProducts = async () => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to get all products" };
  }
  const { data: products, error } = await supabase
    .from("products")
    .select()
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(100)
    .select();
  if (error) {
    return { error: "Failed to get all products" };
  }
  return {
    success: true,
    message: "Successfully fetched all products",
    products: products,
  };
};

export const getProduct = async (productId) => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to get a product" };
  }
  const { data: product, error } = await supabase
    .from("products")
    .select()
    .eq("user_id", user.id)
    .eq("id", productId)
    .single();
  if (error) {
    return { error: "Failed to get product" };
  }
  return {
    success: true,
    message: "Successfully fetched product",
    product: product,
  };
};

//get price history for a product
export const getPriceHistory = async (productId) => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be logged in to get price history" };
  }
  const { data: priceHistory, error } = await supabase
    .from("price_history")
    .select()
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .order("checked_at", { ascending: true })
    .limit(100)
    .select();
  if (error) {
    return { error: "Failed to get price history" };
  }
  return {
    success: true,
    message: "Successfully fetched price history",
    priceHistory: priceHistory,
  };
};
