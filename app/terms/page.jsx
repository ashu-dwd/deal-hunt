import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function TermsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user || null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 text-slate-900">
      <Header user={user} />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">
          Terms of Service
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-slate-600 mb-4">
              By accessing and using Dealdrop ("the Service"), you accept and
              agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Description of Service
            </h2>
            <p className="text-slate-600 mb-4">
              Dealdrop is a price tracking service that monitors product prices
              across various retailers and notifies users of price changes. The
              service is provided "as is" and "as available."
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              User Accounts
            </h2>
            <p className="text-slate-600 mb-4">
              To use certain features of the service, you may need to create an
              account. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities that occur
              under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Acceptable Use
            </h2>
            <p className="text-slate-600 mb-4">
              You agree not to use the service for any unlawful purpose or to
              conduct any unlawful activity, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on the rights of others</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Distributing malware or harmful code</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-slate-600 mb-4">
              The service and its original content, features, and functionality
              are and will remain the exclusive property of Dealdrop and its
              licensors. The service is protected by copyright, trademark, and
              other laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-slate-600 mb-4">
              The service is provided on an "as is" and "as available" basis. We
              make no representations or warranties of any kind, express or
              implied, as to the operation of the service or the information,
              content, or materials included therein.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-slate-600 mb-4">
              In no event shall Dealdrop, its directors, employees, or agents be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Termination
            </h2>
            <p className="text-slate-600 mb-4">
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, for any
              reason whatsoever, including without limitation if you breach the
              Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-slate-600 mb-4">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will try to
              provide at least 30 days notice prior to any new terms taking
              effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Contact Information
            </h2>
            <p className="text-slate-600">
              If you have any questions about these Terms of Service, please
              contact us at legal@dealdrop.com.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
