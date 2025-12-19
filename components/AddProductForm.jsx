"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AuthModal } from "./authModal";
import { addProduct } from "@/app/actions";
import { toast } from "sonner";

const AddProductForm = ({ user }) => {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user in AddProductForm:", user);
    if (!url) return;
    if (!user) {
      console.log("User not logged in");
      setShowAuthModal(true);
      return;
    }
    //call addProduct action
    setLoading(true);
    const formData = new FormData();
    formData.append("url", url);
    const response = await addProduct(formData);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message || "Product added successfully");
      // setLoading(false);
      setUrl("");
    }
    setLoading(false);
  };
  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <Input
            type="url"
            placeholder="Paste product URL or search..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!url}
            className="w-full sm:w-auto bg-orange-500 text-white"
          >
            {loading ? "Loading..." : "Track"}
          </Button>
        </div>
      </form>
      {/* auth modal- continue with google */}
      <AuthModal isOpen={showAuthModal} onClose={handleCloseModal} />
    </>
  );
};

export default AddProductForm;
