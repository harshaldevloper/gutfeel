import SectionHeading from "@/components/SectionHeading";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Early tester",
      role: "IBS-D",
      quote: "The meal planner and symptom tracker in one app is exactly what I needed. The fingerprint feature is already surfacing patterns.",
      avatar: "E",
    },
    {
      name: "Beta user",
      role: "India · IBS-C",
      quote: "Finally an app with Indian foods — roti, dal, paneer — not just Western meal plans. The FDA alerts are a nice touch.",
      avatar: "B",
    },
    {
      name: "Beta user",
      role: "Recently diagnosed",
      quote: "Onboarding took 2 minutes and the daily plan actually avoids my known triggers. Simple and useful.",
      avatar: "R",
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Feedback"
          title="Early feedback from beta testers"
          subtitle="We're pre-launch and growing honestly — these are real notes from people trying the app during development."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name + t.role} className="card-elevated rounded-2xl p-6 relative">
              <span className="absolute top-4 right-5 text-5xl font-serif text-emerald-100 leading-none select-none">&ldquo;</span>
              <div className="flex items-center gap-3 mb-4 relative">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center ring-2 ring-white">
                  <span className="text-emerald-800 font-semibold text-sm">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed relative">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
