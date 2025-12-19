import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function PrivacyPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 text-slate-900">
      <Header user={user} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Introduction
            </h2>
            <p className="text-slate-600 mb-4">
              At Dealdrop ("we," "us," or "our"), we are committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our price
              tracking service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Information We Collect
            </h2>
            <h3 className="text-xl font-medium text-slate-800 mb-2">
              Personal Information
            </h3>
            <p className="text-slate-600 mb-4">
              We may collect personal information such as your email address
              when you create an account or sign up for notifications.
            </p>

            <h3 className="text-xl font-medium text-slate-800 mb-2">
              Usage Information
            </h3>
            <p className="text-slate-600 mb-4">
              We collect information about how you use our service, including
              the products you track and your interaction patterns.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>To provide and maintain our price tracking service</li>
              <li>To send you price alerts and notifications</li>
              <li>To improve our service and develop new features</li>
              <li>To communicate with you about our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Data Security
            </h2>
            <p className="text-slate-600 mb-4">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Data Sharing
            </h2>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy or as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Your Rights
            </h2>
            <p className="text-slate-600 mb-4">
              You have the right to access, update, or delete your personal
              information. You can manage your account settings or contact us to
              exercise these rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-slate-600 mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Contact Us
            </h2>
            <p className="text-slate-600">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@dealdrop.com.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
