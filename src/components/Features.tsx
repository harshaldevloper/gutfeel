export default function Features() {
  const features = [
    { icon: "🍽️", title: "Personalized Meal Plans", desc: "Daily breakfast, lunch, and dinner that avoid your known triggers. Swap meals and get a grocery list.", live: true },
    { icon: "📊", title: "Symptom-Food Tracking", desc: "Log severity, symptoms, and foods in under a minute. See patterns emerge over time.", live: true },
    { icon: "🔬", title: "FODMAP Fingerprint", desc: "Rule-based analysis finds likely triggers from your logs. Gets smarter with more data.", live: true },
    { icon: "🔬", title: "Guided Reintroduction", desc: "Step-by-step protocol UI for testing FODMAP groups. Dose tracking coming soon.", live: "partial" },
    { icon: "🛒", title: "Grocery Lists", desc: "Auto-generated from your daily plan. Organized by ingredient.", live: true },
    { icon: "🇮🇳", title: "India Food Safety", desc: "FDA/FSSAI alerts and brand safety scores for common foods.", live: true },
    { icon: "🌍", title: "Multi-Country Foods", desc: "Food database for India, UK, US, and Australia with FODMAP ratings.", live: true },
    { icon: "☁️", title: "Cloud Sync", desc: "Optional account to sync logs across devices. Works fully offline without one.", live: true },
    { icon: "👩‍⚕️", title: "Dietitian Sharing", desc: "Share reports with your dietitian. Planned for a future update.", live: false },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            What&apos;s built today
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We ship honestly — green badges are live, grey ones are on the roadmap.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-6 bg-stone-50 rounded-xl border border-stone-100">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{feature.icon}</span>
                {feature.live === true && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Live</span>
                )}
                {feature.live === "partial" && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Beta</span>
                )}
                {feature.live === false && (
                  <span className="text-xs bg-stone-200 text-stone-500 px-2 py-0.5 rounded-full font-semibold">Soon</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
