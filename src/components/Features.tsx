export default function Features() {
  const features = [
    { icon: "🧠", title: "AI-Personalized Plans", desc: "Not a static template. Your plan adapts weekly based on your symptoms, preferences, and progress." },
    { icon: "📊", title: "Symptom-Food Correlations", desc: "Discover YOUR specific triggers — not generic lists. The AI finds patterns you'd never notice." },
    { icon: "🔬", title: "Guided Reintroduction", desc: "The hardest phase, made simple. Step-by-step protocol with dose tracking and confidence scores." },
    { icon: "🛒", title: "Smart Grocery Lists", desc: "Auto-generated lists organized by store aisle. Export to Instacart, Amazon, or your local store." },
    { icon: "👩‍⚕️", title: "Dietitian Dashboard", desc: "Share your data with your dietitian. They see your patterns and can adjust your plan remotely." },
    { icon: "🌍", title: "Multi-Restriction Support", desc: "FODMAP + gluten-free + dairy-free + vegan — handle all your dietary needs simultaneously." },
    { icon: "📱", title: "10-Second Logging", desc: "Not a tedious food diary. Quick tap logging that actually fits your life." },
    { icon: "🔮", title: "Predictive Insights", desc: "Get warned before you eat something likely to cause symptoms based on your history." },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Built for real people with busy lives — not just researchers with time to spare.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-emerald-200 hover:shadow-md transition-all">
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
