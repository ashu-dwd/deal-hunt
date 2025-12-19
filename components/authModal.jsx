"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";

export function AuthModal({ isOpen, onClose }) {
  const supabase = createClient();
  const handleGoogleLogin = async () => {
    const { origin } = window.location;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    console.log("Google login");
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login to continue</DialogTitle>
            <DialogDescription>
              Track your deals and get notified on price drops.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {/* continue with google button */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full sm:w-auto bg-orange-500 text-white"
            >
              Continue with Google
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
