export default function Problem() {
  const stats = [
    { value: "10-15%", label: "of global population has IBS" },
    { value: "70%", label: "report food as primary trigger" },
    { value: "2 years", label: "average time to diagnosis" },
    { value: "67%", label: "say diet advice is confusing" },
  ];

  const pains = [
    { icon: "😰", title: "Fear of eating", desc: "Every meal is a gamble. Will this cause pain, bloating, or an urgent bathroom trip?" },
    { icon: "📱", title: "Confusing information", desc: "Google gives you 10 conflicting answers. Monash has data but no plan." },
    { icon: "🍽️", title: "Generic meal plans", desc: "One-size-fits-all diets that don't account for YOUR triggers or preferences." },
    { icon: "🔄", title: "Reintroduction is impossible", desc: "The hardest phase of FODMAP — and nobody guides you through it." },
  ];

  return (
    <section id="problem" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            Living with IBS is exhausting.
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            You've tried elimination diets. You've downloaded food lists. You've spent hours researching. And you're still guessing.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 bg-stone-50 rounded-xl">
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">{stat.value}</p>
              <p className="text-sm text-stone-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((pain, i) => (
            <div key={i} className="p-6 bg-stone-50 rounded-xl border border-stone-100">
              <span className="text-3xl mb-4 block">{pain.icon}</span>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{pain.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
