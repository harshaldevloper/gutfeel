export default function Testimonials() {
  const testimonials = [
    { name: "Sarah M.", role: "IBS-D, 3 years", quote: "I spent 2 years afraid to eat. Gutfeel gave me a plan that actually worked for MY body. I'm down to 1-2 flare-ups a month from daily pain.", avatar: "S" },
    { name: "James K.", role: "IBS-C, dietitian", quote: "I recommend Gutfeel to all my patients. The reintroduction protocol is better than anything I could create manually. It's like having a coach in your pocket.", avatar: "J" },
    { name: "Priya R.", role: "IBS + vegan, 5 years", quote: "Finally an app that handles multiple restrictions. I'm vegan AND low FODMAP — every other app made me choose. Gutfeel just works.", avatar: "P" },
    { name: "Michael T.", role: "Recently diagnosed", quote: "I was overwhelmed by the FODMAP diet. Gutfeel made it simple. The AI meal plans mean I don't have to think — just cook and eat.", avatar: "M" },
    { name: "Lisa W.", role: "IBS-M, 8 years", quote: "The symptom tracking actually found my trigger foods that I never suspected. Turns out it wasn't what I thought at all. Game changer.", avatar: "L" },
    { name: "David C.", role: "Post-infectious IBS", quote: "The guided reintroduction gave me confidence I haven't had in years. I tested 12 foods in 8 weeks — something I could never do alone.", avatar: "D" },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
            Real people. Real relief.
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Join thousands who've stopped guessing and started living.
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
              <p className="text-stone-600 text-sm leading-relaxed italic">"{t.quote}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
