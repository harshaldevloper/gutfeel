import SectionHeading from "@/components/SectionHeading";
import FeatureIcon from "@/components/ui/FeatureIcon";

const features = [
  { icon: "meals" as const, title: "Personalized Meal Plans", desc: "Daily breakfast, lunch, and dinner that avoid your known triggers. Swap meals and get a grocery list.", live: true },
  { icon: "tracker" as const, title: "Symptom-Food Tracking", desc: "Log severity, symptoms, and foods in under a minute. See patterns emerge over time.", live: true },
  { icon: "fingerprint" as const, title: "FODMAP Fingerprint", desc: "Rule-based analysis finds likely triggers from your logs. Gets smarter with more data.", live: true },
  { icon: "reintro" as const, title: "Guided Reintroduction", desc: "Step-by-step protocol UI for testing FODMAP groups. Dose tracking coming soon.", live: "partial" as const },
  { icon: "grocery" as const, title: "Grocery Lists", desc: "Auto-generated from your daily plan. Organized by ingredient.", live: true },
  { icon: "safety" as const, title: "India Food Safety", desc: "FDA/FSSAI alerts and brand safety scores for common foods.", live: true },
  { icon: "globe" as const, title: "Multi-Country Foods", desc: "Food database for India, UK, US, and Australia with FODMAP ratings.", live: true },
  { icon: "sync" as const, title: "Cloud Sync", desc: "Optional account to sync logs across devices. Works fully offline without one.", live: true },
  { icon: "share" as const, title: "Dietitian Sharing", desc: "Share reports with your dietitian. Planned for a future update.", live: false },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Product"
          title="What's built today"
          subtitle="We ship honestly — green badges are live, grey ones are on the roadmap."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(feature => (
            <div
              key={feature.title}
              className="group p-6 bg-cream rounded-2xl border border-stone-100 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/5 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <FeatureIcon name={feature.icon} />
                {feature.live === true && (
                  <span className="text-xs bg-brand-green-light text-brand-green-dark px-2.5 py-1 rounded-full font-semibold">Live</span>
                )}
                {feature.live === "partial" && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-semibold">Beta</span>
                )}
                {feature.live === false && (
                  <span className="text-xs bg-stone-200 text-stone-600 px-2.5 py-1 rounded-full font-semibold">Soon</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2 group-hover:text-brand-navy transition-colors">{feature.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
