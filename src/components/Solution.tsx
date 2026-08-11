export default function Solution() {
  const steps = [
    { step: "01", title: "Tell us about you", desc: "Your symptoms, preferences, cooking skill, allergies, and goals. Takes 3 minutes." },
    { step: "02", title: "Get your AI plan", desc: "A personalized weekly meal plan built for YOUR body — not a generic template." },
    { step: "03", title: "Track & adapt", desc: "Log symptoms in 10 seconds. The AI learns and adjusts your plan automatically." },
    { step: "04", title: "Reintroduce with confidence", desc: "Guided protocol tests FODMAPs one at a time. No more guessing." },
  ];

  return (
    <section id="solution" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            Meet gutfeel — your AI gut health coach.
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Not a food database. Not a static meal plan. An intelligent system that learns what works for YOUR body and gets smarter over time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-bold text-emerald-200 mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-emerald-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
