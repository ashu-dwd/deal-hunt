import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-12 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600">
          © {new Date().getFullYear()} Dealdrop — Price tracking made simple.
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
