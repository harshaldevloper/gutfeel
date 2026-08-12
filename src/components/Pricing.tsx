export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">Simple pricing</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Core features are free. Premium unlocks cloud sync and priority support. Paid via Dodo Payments on web.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Free</h3>
            <p className="text-sm text-stone-500 mb-4">Everything you need to start</p>
            <p className="text-4xl font-bold text-stone-900 mb-6">$0<span className="text-lg text-stone-500">/mo</span></p>
            <ul className="space-y-3 mb-8 text-sm text-stone-600">
              <li>Daily meal planner</li>
              <li>Full food database</li>
              <li>Symptom tracking</li>
              <li>FODMAP fingerprint</li>
              <li>Works offline</li>
            </ul>
            <a href="/onboarding" className="block w-full py-3 border border-stone-300 text-stone-700 rounded-xl text-sm font-semibold text-center hover:bg-stone-100">Get Started</a>
          </div>
          <div className="p-8 bg-emerald-600 rounded-2xl border border-emerald-500 relative md:-translate-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">PREMIUM</div>
            <h3 className="text-lg font-semibold text-white mb-2">Premium</h3>
            <p className="text-sm text-emerald-100 mb-4">Cloud sync + support</p>
            <p className="text-4xl font-bold text-white mb-6">$7.99<span className="text-lg text-emerald-200">/mo</span></p>
            <ul className="space-y-3 mb-8 text-sm text-white">
              <li>Everything in Free</li>
              <li>Cross-device cloud sync</li>
              <li>Reintroduction protocol (beta)</li>
              <li>Priority email support</li>
            </ul>
            <a href="/account" className="block w-full py-3 bg-white text-emerald-700 rounded-xl text-sm font-semibold text-center hover:bg-emerald-50">Upgrade via Dodo</a>
          </div>
          <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Annual</h3>
            <p className="text-sm text-stone-500 mb-4">Best value</p>
            <p className="text-4xl font-bold text-stone-900 mb-6">$49<span className="text-lg text-stone-500">/yr</span></p>
            <ul className="space-y-3 mb-8 text-sm text-stone-600">
              <li>Everything in Premium</li>
              <li>Save ~43% vs monthly</li>
              <li>Early access to new features</li>
            </ul>
            <a href="/account" className="block w-full py-3 border border-stone-300 text-stone-700 rounded-xl text-sm font-semibold text-center hover:bg-stone-100">Save 43%</a>
          </div>
        </div>
        <p className="text-center text-xs text-stone-400 mt-8 max-w-lg mx-auto">
          Payments processed by Dodo Payments. Not medical advice. Mobile app store billing coming separately — Apple and Google require their own in-app purchase systems.
        </p>
      </div>
    </section>
  );
}
