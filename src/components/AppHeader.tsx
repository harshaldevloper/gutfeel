import BrandLogo from "@/components/BrandLogo";

type Props = {
  title?: string;
  right?: React.ReactNode;
};

/** Shared header for in-app pages with real brand logo */
export default function AppHeader({ title, right }: Props) {
  return (
    <header className="bg-cream/90 backdrop-blur-lg border-b border-stone-200/70 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <BrandLogo height={36} href="/dashboard" />
          {title && (
            <span className="text-sm font-semibold text-stone-500 truncate hidden sm:inline">
              {title}
            </span>
          )}
        </div>
        {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
      </div>
    </header>
  );
}
