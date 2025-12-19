"use client";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ user, activePage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/image.png"
              alt="Dealdrop logo"
              className="h-10 w-auto"
              width={200}
              height={220}
            />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            <Link
              href="/#features"
              className="hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how"
              className="hover:text-slate-900 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className={`hover:text-slate-900 transition-colors ${
                activePage === "pricing" ? "font-semibold text-orange-600" : ""
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-3">
            <AuthButton user={user} />
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col items-center gap-4 py-6 text-sm text-slate-700">
              <Link
                href="/#features"
                className="hover:text-slate-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#how"
                className="hover:text-slate-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="/pricing"
                className={`hover:text-slate-900 transition-colors ${
                  activePage === "pricing"
                    ? "font-semibold text-orange-600"
                    : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
