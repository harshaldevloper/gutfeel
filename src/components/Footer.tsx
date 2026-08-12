import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="py-14 px-4 sm:px-6 lg:px-8 bg-brand-navy text-stone-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4 brightness-110">
              <BrandLogo height={48} href="/" />
            </div>
            <p className="text-sm leading-relaxed">Low FODMAP meal planning and symptom tracking for IBS. Works offline. Not medical advice.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/onboarding" className="hover:text-white transition-colors">Try the App</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/account" className="hover:text-white transition-colors">Account</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">App</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/plan" className="hover:text-white transition-colors">Meal Plan</a></li>
              <li><a href="/tracker" className="hover:text-white transition-colors">Tracker</a></li>
              <li><a href="/foods" className="hover:text-white transition-colors">Food Database</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="mailto:hello@gutfeel.app" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 Gutfeel. All rights reserved.</p>
          <p className="text-xs text-stone-500">This app does not provide medical advice. Consult your healthcare provider.</p>
        </div>
      </div>
    </footer>
  );
}
