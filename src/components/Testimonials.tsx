export default function Testimonials() {
  const testimonials = [
    { name: "Early tester", role: "IBS-D", quote: "The meal planner and symptom tracker in one app is exactly what I needed. Still early days but the fingerprint feature is already surfacing patterns.", avatar: "E" },
    { name: "Beta user", role: "India, IBS-C", quote: "Finally an app with Indian foods — roti, dal, paneer — not just Western meal plans. The FDA alerts are a nice touch.", avatar: "B" },
    { name: "Beta user", role: "Recently diagnosed", quote: "Onboarding took 2 minutes and the daily plan actually avoids my known triggers. Simple and useful.", avatar: "R" },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            Early feedback
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            From beta testers during development — we&apos;re pre-launch and growing our user base honestly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-700 font-semibold text-sm">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed italic">&quot;{t.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
