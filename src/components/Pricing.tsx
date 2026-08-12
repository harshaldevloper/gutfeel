import SectionHeading from "@/components/SectionHeading";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          subtitle="Core features are free. Premium unlocks cloud sync and priority support. Paid via Dodo Payments on web."
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          <div className="p-8 bg-cream rounded-3xl border border-stone-200 flex flex-col">
            <h3 className="text-lg font-semibold text-stone-900 mb-1">Free</h3>
            <p className="text-sm text-stone-500 mb-5">Everything you need to start</p>
            <p className="text-4xl font-serif font-semibold text-stone-900 mb-6">
              $0<span className="text-lg text-stone-500 font-sans">/mo</span>
            </p>
            <ul className="space-y-3 mb-8 text-sm text-stone-600 flex-1">
              <li>Daily meal planner</li>
              <li>Full food database</li>
              <li>Symptom tracking</li>
              <li>FODMAP fingerprint</li>
              <li>Works offline</li>
            </ul>
            <a href="/onboarding" className="btn-secondary w-full text-center text-sm py-3">
              Get Started
            </a>
          </div>

          <div className="p-8 rounded-3xl border border-brand-green bg-gradient-to-b from-brand-green to-brand-green-dark relative md:-translate-y-2 shadow-xl shadow-brand-green/25 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-navy text-white text-xs font-bold rounded-full tracking-wide">
              POPULAR
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Premium</h3>
            <p className="text-sm text-emerald-100 mb-5">Cloud sync + support</p>
            <p className="text-4xl font-serif font-semibold text-white mb-6">
              $7.99<span className="text-lg text-emerald-200 font-sans">/mo</span>
            </p>
            <ul className="space-y-3 mb-8 text-sm text-emerald-50 flex-1">
              <li>Everything in Free</li>
              <li>Cross-device cloud sync</li>
              <li>Reintroduction protocol (beta)</li>
              <li>Priority email support</li>
            </ul>
            <a href="/account" className="block w-full py-3.5 bg-white text-emerald-800 rounded-xl text-sm font-semibold text-center hover:bg-emerald-50 transition-colors">
              Upgrade via Dodo
            </a>
          </div>

          <div className="p-8 bg-cream rounded-3xl border border-stone-200 flex flex-col">
            <h3 className="text-lg font-semibold text-stone-900 mb-1">Annual</h3>
            <p className="text-sm text-stone-500 mb-5">Best value</p>
            <p className="text-4xl font-serif font-semibold text-stone-900 mb-6">
              $49<span className="text-lg text-stone-500 font-sans">/yr</span>
            </p>
            <ul className="space-y-3 mb-8 text-sm text-stone-600 flex-1">
              <li>Everything in Premium</li>
              <li>Save ~43% vs monthly</li>
              <li>Early access to new features</li>
            </ul>
            <a href="/account" className="btn-secondary w-full text-center text-sm py-3">
              Save 43%
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-10 max-w-lg mx-auto leading-relaxed">
          Payments processed by Dodo Payments. Not medical advice. Mobile app store billing coming separately — Apple and Google require their own in-app purchase systems.
        </p>
      </div>
    </section>
  );
}
