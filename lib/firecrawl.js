import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export const scrapeProduct = async (url) => {
  // console.log(process.env.FIRECRAWL_API_KEY);
  try {
    console.log("url in scrapeProduct:", url);
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          prompt:
            "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
          schema: {
            type: "object",
            properties: {
              productName: { type: "string" },
              currentPrice: { type: "number" },
              currencyCode: { type: "string" },
              productImageUrl: { type: "string" },
            },
            required: ["productName", "currentPrice"],
          },
        },
      ],
    });

    // Firecrawl returns data in result.extract
    console.log("result:", result);
    const extractedData = result.json;
    console.log("extractedData:", extractedData);

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
};
