import BrandLogo from "@/components/BrandLogo";

type Props = {
  title?: string;
  right?: React.ReactNode;
};

export default function AppHeader({ title, right }: Props) {
  return (
    <header className="bg-cream/95 backdrop-blur-xl border-b border-brand-navy/8 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <BrandLogo height={32} variant="mark" href="/dashboard" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-brand-navy leading-none">Gutfeel</p>
            {title && <p className="text-[11px] text-stone-500 truncate mt-0.5">{title}</p>}
          </div>
        </div>
        {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
      </div>
    </header>
  );
}
