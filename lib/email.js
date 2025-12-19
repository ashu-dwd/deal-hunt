import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const generatePriceDropEmailHTML = (
  product,
  oldPrice,
  newPrice,
  priceDrop,
  percentage
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Price Drop Alert - ${product.name}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background-color: #f9fafb;
          color: #1f2937;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }
        .header {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          padding: 32px 24px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .header p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
        }
        .content {
          padding: 32px 24px;
        }
        .product-section {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .product-header {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
        .product-image {
          width: 80px;
          height: 80px;
          background-color: #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-info {
          flex: 1;
        }
        .product-name {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .product-url {
          font-size: 12px;
          color: #6b7280;
          word-break: break-all;
        }
        .price-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        .price-box {
          padding: 16px;
          border-radius: 8px;
          text-align: center;
        }
        .price-box.old {
          background-color: #fee2e2;
          border: 1px solid #fca5a5;
        }
        .price-box.new {
          background-color: #dcfce7;
          border: 1px solid #86efac;
        }
        .price-label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .price-amount {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .price-box.old .price-amount {
          color: #991b1b;
          text-decoration: line-through;
        }
        .price-box.new .price-amount {
          color: #166534;
        }
        .savings-badge {
          font-size: 12px;
          font-weight: 600;
        }
        .price-box.old .savings-badge {
          color: #991b1b;
        }
        .price-box.new .savings-badge {
          color: #166534;
        }
        .savings-amount {
          background-color: #fef08a;
          border: 1px solid #fcd34d;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
          text-align: center;
        }
        .savings-label {
          font-size: 12px;
          color: #92400e;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .savings-value {
          font-size: 28px;
          font-weight: 700;
          color: #ca8a04;
          margin-bottom: 4px;
        }
        .savings-percent {
          font-size: 14px;
          color: #b45309;
          font-weight: 500;
        }
        .cta-section {
          margin-bottom: 20px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #ffffff;
          padding: 12px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 6px rgba(249, 115, 22, 0.3);
          width: 100%;
          text-align: center;
          border: none;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(249, 115, 22, 0.4);
        }
        .footer-text {
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          margin-top: 24px;
        }
        .footer-link {
          color: #f97316;
          text-decoration: none;
          font-weight: 600;
        }
        .alert-icon {
          font-size: 48px;
          margin-bottom: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="alert-icon">🎉</div>
          <h1>Price Drop Alert!</h1>
          <p>Great news! A product you're tracking has dropped in price.</p>
        </div>

        <!-- Main Content -->
        <div class="content">
          <!-- Product Section -->
          <div class="product-section">
            <div class="product-header">
              <div class="product-image">
                ${
                  product.image_url
                    ? `<img src="${product.image_url}" alt="${product.name}">`
                    : '<div style="background: linear-gradient(135deg, #f0f0f0, #e0e0e0); width: 100%; height: 100%;"></div>'
                }
              </div>
              <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-url">${product.url}</div>
              </div>
            </div>

            <!-- Price Comparison -->
            <div class="price-comparison">
              <div class="price-box old">
                <div class="price-label">Old Price</div>
                <div class="price-amount">$${oldPrice.toFixed(2)}</div>
                <div class="savings-badge">Before</div>
              </div>
              <div class="price-box new">
                <div class="price-label">New Price</div>
                <div class="price-amount">$${newPrice.toFixed(2)}</div>
                <div class="savings-badge">Now</div>
              </div>
            </div>

            <!-- Savings Highlight -->
            <div class="savings-amount">
              <div class="savings-label">You Save</div>
              <div class="savings-value">$${Math.abs(priceDrop).toFixed(
                2
              )}</div>
              <div class="savings-percent">${Math.abs(percentage).toFixed(
                1
              )}% off</div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="cta-section">
            <a href="${product.url}" class="cta-button">View Product</a>
          </div>

          <!-- Footer -->
          <div class="footer-text">
            <p>This is an automated alert from DealDrop. You're receiving this because you're tracking this product.</p>
            <p style="margin-top: 12px;">
              <a href="#" class="footer-link">Manage preferences</a> • 
              <a href="#" class="footer-link">Unsubscribe</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendPriceDropAlert = async (
  email,
  product,
  oldPrice,
  newPrice
) => {
  try {
    const priceDrop = newPrice - oldPrice;
    const percentage = (priceDrop / oldPrice) * 100;

    const htmlContent = generatePriceDropEmailHTML(
      product,
      oldPrice,
      newPrice,
      priceDrop,
      percentage
    );

    const response = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: email,
      subject: `Price Drop! ${product.name} is now $${newPrice.toFixed(
        2
      )} (was $${oldPrice.toFixed(2)})`,
      html: htmlContent,
    });

    return response;
  } catch (error) {
    console.error("Error sending price drop alert:", error);
    throw error;
  }
};
