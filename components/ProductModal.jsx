"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { DollarSign, Clock, ExternalLink } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";

export default function ProductModal({ isOpen, onClose, product }) {
  const [priceHistory, setPriceHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  // Fetch price history when product changes
  useEffect(() => {
    if (!product?.id) return;

    const fetchPriceHistory = async () => {
      setIsLoadingHistory(true);
      setHistoryError(null);

      try {
        const result = await getPriceHistory(product.id);

        if (result.success && result.priceHistory) {
          // Transform backend data to chart format
          const transformedData = result.priceHistory.map((entry) => ({
            date: new Date(entry.checked_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            price: parseFloat(entry.price),
          }));

          // If no history, use current price as single data point
          if (transformedData.length === 0) {
            transformedData.push({
              date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              price: product.current_price,
            });
          }

          setPriceHistory(transformedData);
        } else {
          // Fallback to current price if fetch fails
          setPriceHistory([
            {
              date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              price: product.current_price,
            },
          ]);
          setHistoryError(result.error || "Failed to load price history");
        }
      } catch (error) {
        console.error("Error fetching price history:", error);
        // Fallback to current price
        setPriceHistory([
          {
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            price: product.current_price,
          },
        ]);
        setHistoryError("Failed to load price history");
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchPriceHistory();
  }, [product?.id, product?.current_price]);

  if (!product) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="6xl">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-slate-900 pr-8">
          {product.name}
        </h2>
        <p className="mt-1 text-slate-600">Product Details & Price History</p>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto max-h-[calc(95vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* LEFT COLUMN - Product Image & Details */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
              <img
                src={product.image_url || "/placeholder-image.png"}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKAniBGYWlsZWQgdG8gbG9hZCBpbWFnZTwvdGV4dD48L3N2Zz4=";
                }}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              {/* Current Price - Highlighted */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-sm text-green-600 font-semibold uppercase tracking-wide mb-2">
                  Current Price
                </p>
                <div className="flex items-baseline gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="text-4xl font-bold text-green-700">
                    {formatCurrency(product.current_price).replace("$", "")}
                  </span>
                </div>
              </div>

              {/* Details Grid - 2 columns on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Currency */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Currency
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {product.currency || "USD"}
                  </p>
                </div>

                {/* Last Updated */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Last Updated
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <p className="text-sm text-slate-700">
                      {new Date(product.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(product.updated_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Product Link - Full Width */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                  Product Link
                </p>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline text-sm break-all group"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <span className="line-clamp-2">View on Store</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Price History Chart */}
          <div className="h-full min-h-[400px] md:min-h-[600px]">
            <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-xl p-5 flex flex-col">
              <div className="mb-4 flex-shrink-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Price Trend
                </h3>
                <p className="text-sm text-slate-600">
                  {isLoadingHistory ? "Loading..." : `${priceHistory.length} data points`}
                </p>
                {historyError && (
                  <p className="text-xs text-amber-600 mt-1">
                    ⚠️ {historyError}
                  </p>
                )}
              </div>

              <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-[300px] relative">
                {isLoadingHistory ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-3 border-slate-300 border-t-orange-500 rounded-full animate-spin"></div>
                      <p className="text-sm text-slate-600">Loading price history...</p>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        stroke="#cbd5e1"
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        stroke="#cbd5e1"
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #64748b",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#f1f5f9" }}
                        formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
                        cursor={{
                          strokeDasharray: "3 3",
                          stroke: "#f97316",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#f97316"
                        strokeWidth={2.5}
                        dot={{
                          fill: "#f97316",
                          r: 4,
                        }}
                        activeDot={{
                          r: 6,
                          fill: "#ea580c",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white px-6 py-4 flex gap-3 flex-shrink-0">
        <button
          onClick={() => {
            window.open(product.url, "_blank");
          }}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Product Page
        </button>
        <button
          onClick={onClose}
          className="flex-1 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
