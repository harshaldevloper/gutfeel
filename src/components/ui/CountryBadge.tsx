const COUNTRIES: Record<string, { label: string; code: string }> = {
  IN: { label: "India", code: "IN" },
  UK: { label: "United Kingdom", code: "UK" },
  US: { label: "United States", code: "US" },
  AU: { label: "Australia", code: "AU" },
};

export default function CountryBadge({ country }: { country: string }) {
  const info = COUNTRIES[country] ?? COUNTRIES.IN;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs bg-brand-green-light text-brand-green-dark px-2.5 py-1 rounded-full font-semibold border border-brand-green/20">
      <span className="w-5 h-5 rounded-md bg-brand-navy text-white text-[9px] font-bold flex items-center justify-center">
        {info.code}
      </span>
      {info.label}
    </span>
  );
}
