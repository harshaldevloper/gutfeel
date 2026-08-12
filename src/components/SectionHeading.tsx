type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
};

export default function SectionHeading({ eyebrow, title, subtitle, light }: Props) {
  return (
    <div className="text-center mb-14 lg:mb-16 max-w-3xl mx-auto">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${light ? "text-brand-green-light" : "text-brand-green"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-5 ${light ? "text-white" : "text-stone-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg leading-relaxed ${light ? "text-emerald-50/90" : "text-stone-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}
