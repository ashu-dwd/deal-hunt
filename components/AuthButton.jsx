"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { AuthModal } from "./authModal";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/actions";

const AuthButton = ({ user }) => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const handleOpenModal = () => {
    setShowAuthModal(true);
  };
  // console.log(user);

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };
  const handleUserSignout = () => {
    console.log("User signed out");
    handleCloseModal();
  };
  if (user) {
    return (
      <div>
        <Button
          onClick={signOut}
          className="bg-orange-500 text-white cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </span>
        </Button>
      </div>
    );
  }
  return (
    <>
      <Button
        className="bg-orange-500 text-white cursor-pointer"
        onClick={handleOpenModal}
      >
        <span className="flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          Login
        </span>
      </Button>
      <AuthModal isOpen={showAuthModal} onClose={handleCloseModal} />
    </>
  );
};

export default AuthButton;
