"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { DollarSign, Clock, ExternalLink } from "lucide-react";
import { getAllProducts, getAllProductsByUserId } from "@/app/actions";
import ProductModal from "./ProductModal";

const dummyProducts = [];

const ITEMS_PER_PAGE = 6;

export default function ProductsList({ user }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        try {
          const result = await getAllProductsByUserId(user.id);
          if (result.success) {
            setProducts(result.products || []);
          } else {
            console.error("Failed to fetch products:", result.error);
            setProducts([]);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        }
      } else {
        setProducts(dummyProducts);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [user]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const truncateName = (name, maxLength = 25) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">Featured Products</h2>
        <p className="mt-3 text-slate-600 text-lg">
          Browse our selection of tracked products with current prices and
          savings
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Loading products...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 flex flex-col group cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="w-full aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 relative">
                    <img
                      src={product.image_url || "/placeholder-image.png"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKAniBGYWlsZWQgdG8gbG9hZCBpbWFnZTwvdGV4dD48L3N2Zz4=";
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <CardContent className="flex-1 flex flex-col justify-between p-4">
                    {/* Product Info */}
                    <div className="space-y-3 mb-4">
                      {/* Product Name and Currency */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 flex-1">
                          {truncateName(product.name)}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="text-xs flex-shrink-0"
                        >
                          {product.currency || "USD"}
                        </Badge>
                      </div>

                      {/* Product URL - Clickable */}
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline text-xs truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Link</span>
                      </a>

                      {/* Price */}
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                        <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-lg font-bold text-green-700">
                          {formatCurrency(product.current_price)}{" "}
                          {product.currency}
                        </span>
                      </div>
                    </div>

                    {/* Updated At */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-4 border-t border-slate-200 pt-4">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>
                        {new Date(product.updated_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Button
                      onClick={() => handleViewDetails(product)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-8">
                  <div className="text-slate-400 text-6xl mb-4">🛍️</div>
                  <p className="text-slate-600 text-lg font-medium">
                    No products found. Add some products to get started!
                  </p>
                </div>
              </div>
            )}
          </div>

          {currentProducts.length > 0 && (
            <div className="mt-10 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-slate-100 cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        isActive={currentPage === index + 1}
                        className="hover:bg-slate-100 cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "hover:bg-slate-100 cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Product Details Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
