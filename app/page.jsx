"use server";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  TrendingUp,
  Bell,
  Clock,
  Search,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  console.log(user);
  // const [user, setUser] = React.useState(null);
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 text-slate-900">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/image.png"
              alt="Dealdrop logo"
              className="h-10 w-auto"
              width={200}
              height={220}
            />
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
              <a href="#features" className="hover:text-slate-900">
                Features
              </a>
              <a href="#how" className="hover:text-slate-900">
                How it works
              </a>
              <a href="#pricing" className="hover:text-slate-900">
                Pricing
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline-flex">
              Explore
            </Button>
            <AuthButton user={user} />
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Track prices. Save money. Never miss a deal.
            </h1>
            <p className="mt-4 text-slate-700 max-w-xl">
              Dealdrop monitors product prices across stores and notifies you
              when prices drop. View historical price charts, set custom alerts,
              and get the best deals automatically.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="bg-orange-500 text-white">
                Get started — it's free
              </Button>
              <Button variant="outline" className="text-slate-700">
                Learn more
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-orange-200 to-orange-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-20 h-20 text-orange-500 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Start tracking</h2>
            <p className="mt-2 text-slate-600">
              Paste any product URL and we'll handle the rest.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <AddProductForm user={user} />
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            All the tools you need to track and buy at the right time.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                <div>
                  <h4 className="font-medium">Price History</h4>
                  <p className="text-sm text-slate-600">
                    See historical price charts to pick the best time to buy.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-orange-500" />
                <div>
                  <h4 className="font-medium">Custom Alerts</h4>
                  <p className="text-sm text-slate-600">
                    Get notifications when a product hits your target price.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500" />
                <div>
                  <h4 className="font-medium">Automated Monitoring</h4>
                  <p className="text-sm text-slate-600">
                    We check prices periodically so you don't have to.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="bg-white/60 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Three simple steps to start saving.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white font-bold mx-auto">
                1
              </div>
              <h4 className="mt-4 font-medium">Paste a URL</h4>
              <p className="text-sm text-slate-600 mt-2">
                Share the product link from any store.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white font-bold mx-auto">
                2
              </div>
              <h4 className="mt-4 font-medium">We track the price</h4>
              <p className="text-sm text-slate-600 mt-2">
                Our system monitors prices automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white font-bold mx-auto">
                3
              </div>
              <h4 className="mt-4 font-medium">Get notified</h4>
              <p className="text-sm text-slate-600 mt-2">
                Receive alerts when the price drops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 mt-12 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} Dealdrop — Price tracking made simple.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
