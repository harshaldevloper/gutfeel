"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const rows: { label: string; gv: string; other: string }[] = [
  {
    label: "AI plate scanner (photo → FODMAP + calories)",
    gv: "Yes — one tap",
    other: "No — manual barcode search only",
  },
  { label: "Indian cuisine depth (roti, dal, paneer, regional snacks)", gv: "70+ foods, portion-aware", other: "Western foods dominate the database" },
  { label: "Multi-country databases (IN, UK, US, AU)", gv: "Built in, offline", other: "Region data limited or web-only" },
  { label: "FODMAP fingerprint from your own logs", gv: "Yes — learns your triggers", other: "Static thresholds only" },
  { label: "Guided reintroduction protocol", gv: "Yes", other: "Yes (limited portion guidance)" },
  { label: "Clinician report export", gv: "Yes — share with your dietitian", other: "Limited reporting" },
  { label: "Offline-first tracking", gv: "100% — no account needed", other: "Requires login" },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to start the low-FODMAP journey.",
    features: ["Full symptom & food tracker", "Personalized meal plans", "FODMAP fingerprint insights", "Multi-country food database", "Grocery lists", "Works offline"],
    cta: "Download free",
    ctaHref: "/download/",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$7.99",
    period: "/month",
    alt: "or $49/year (save 49%)",
    desc: "Everything in Free, plus the tools that make the diet effortless.",
    features: [
      "AI plate scanner — photo any meal for FODMAP + macros",
      "Advanced insights with 7-day trends & sparklines",
      "Clinician report export for your dietitian",
      "Priority new food additions",
    ],
    cta: "Start free trial in app",
    ctaHref: "/download/",
    highlight: true,
  },
];

function Check() {
  return (
    <svg className="w-4 h-4 text-brand-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function CompareAndPricing() {
  return (
    <>
      <section id="compare" className="section-alt py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <SectionHeading
              eyebrow="Why GutVista"
              title="Built for the gap the gold standard leaves open"
              subtitle="Monash set the standard — we learned from it. GutVista keeps the scientific rigor and adds what was missing: AI scanning, deeper Indian and regional food coverage, and a design that respects your time."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-elevated rounded-3xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-navy text-white">
                    <th className="text-left px-6 py-4 font-semibold w-1/2"></th>
                    <th className="text-left px-6 py-4 font-serif text-lg">GutVista</th>
                    <th className="text-left px-6 py-4 font-medium text-stone-300">Typical FODMAP apps</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.label} className={i % 2 === 0 ? "bg-white" : "bg-cream/60"}>
                      <td className="px-6 py-4 font-medium text-stone-800 border-t border-stone-100">{r.label}</td>
                      <td className="px-6 py-4 text-brand-green-dark font-semibold border-t border-stone-100">{r.gv}</td>
                      <td className="px-6 py-4 text-stone-500 border-t border-stone-100">{r.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-4 text-xs text-stone-500 bg-cream/40 border-t border-stone-100">
              FODMAP ratings are based on published Monash University thresholds and local food authority data. GutVista is not affiliated with Monash University.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <SectionHeading
              eyebrow="Pricing"
              title="Free to start. Premium when you want it effortless."
              subtitle="The core tracker, meal plans, and fingerprint insights are free forever. Premium unlocks the AI scanner and advanced reporting."
            />
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className={`rounded-3xl p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-gradient-to-br from-brand-navy to-brand-navy-light text-white shadow-2xl shadow-brand-navy/25 ring-2 ring-brand-green"
                    : "bg-cream border border-stone-100"
                }`}
              >
                {plan.highlight && (
                  <span className="self-start text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 px-3 py-1.5 rounded-full mb-5">
                    Most popular
                  </span>
                )}
                <h3 className={`text-xl font-semibold mb-2 ${plan.highlight ? "text-white" : "text-stone-900"}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className={`font-serif text-4xl font-bold ${plan.highlight ? "text-white" : "text-brand-navy"}`}>{plan.price}</span>
                  <span className={plan.highlight ? "text-emerald-100" : "text-stone-500"}>{plan.period}</span>
                </div>
                {plan.alt && <p className={`text-sm mb-5 ${plan.highlight ? "text-emerald-100/90" : "text-stone-500"}`}>{plan.alt}</p>}
                <p className={`text-sm mb-6 leading-relaxed ${plan.highlight ? "text-emerald-100/90" : "text-stone-600"}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed">
                      {plan.highlight ? (
                        <svg className="w-4 h-4 text-brand-green-light shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <Check />
                      )}
                      <span className={plan.highlight ? "text-white/90" : "text-stone-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.ctaHref}
                  className={`block text-center rounded-2xl px-6 py-3.5 font-semibold transition-colors ${
                    plan.highlight ? "bg-brand-green text-white hover:bg-brand-green-dark" : "btn-accent"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-stone-500 mt-8 max-w-2xl mx-auto">
            Premium is billed through Google Play / App Store subscriptions. Cancel anytime — no hidden renewals. Prices may vary by region.
          </p>
        </div>
      </section>
    </>
  );
}
