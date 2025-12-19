"use server";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Coffee } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function PricingPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Track up to 5 products",
        "Basic price history",
        "Daily price updates",
        "Email notifications",
        "7-day price history",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$4.99",
      period: "/month",
      description: "For serious deal hunters",
      features: [
        "Track unlimited products",
        "Detailed price analysis",
        "Hourly price updates",
        "Custom alerts & notifications",
        "Full price history",
        "Price drop predictions",
        "Compare across stores",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$29.99",
      period: "/month",
      description: "For teams and power users",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "White-label option",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Header user={user} activePage="pricing" />

      {/* Pricing Header */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Support Dealdrop
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Dealdrop is free to use. If you find it helpful, consider supporting
          its development.
        </p>
      </section>

      {/* Buy Me a Coffee Section */}
      <section className="bg-white/60 py-5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-12">
            <Coffee className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Love Dealdrop?
            </h2>
            <p className="text-lg text-slate-600 mb-6 max-w-xl mx-auto">
              If you find Dealdrop helpful, consider supporting its development.
              Your support helps us improve features and keep the service
              running.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buymeacoffee.com/raghavdwd"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <Coffee className="w-5 h-5" />
                Buy Me a Coffee
              </a>
              <Button
                variant="outline"
                className="text-slate-700 font-semibold py-3 px-8 rounded-lg"
              >
                Share Feedback
              </Button>
            </div>

            <p className="text-sm text-slate-500 mt-6">
              Every contribution, no matter how small, helps us build a better
              product.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              question: "Is Dealdrop really free?",
              answer:
                "Yes! Dealdrop is completely free to use. We don't charge any subscription fees. If you love the service and want to support its development, you can buy us a coffee!",
            },
            {
              question: "How does Dealdrop make money?",
              answer:
                "We're supported by user donations and affiliate partnerships with retailers. We never sell your data or use invasive tracking.",
            },
            {
              question: "How often are prices updated?",
              answer:
                "Prices are checked daily for all tracked products. Updates happen automatically in the background.",
            },
            {
              question: "Do you send a lot of notifications?",
              answer:
                "Only when prices drop! You have full control over notifications. You can customize alerts or disable them entirely.",
            },
            {
              question: "Is my data safe?",
              answer:
                "Absolutely. We use industry-standard encryption and never share your data with third parties.",
            },
            {
              question: "Which stores do you support?",
              answer:
                "We support most major retailers including Amazon, eBay, Walmart, Target, and many more. Add any product URL!",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-6"
            >
              <h3 className="font-semibold text-slate-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-slate-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Ready to save on your next purchase?
        </h2>
        <p className="text-slate-600 mb-8 text-lg">
          Join thousands of deal hunters saving money with Dealdrop.
        </p>
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-12 rounded-lg text-lg inline-block text-center"
        >
          Start Free Today
        </Link>
      </section>

      <Footer />
    </main>
  );
}
