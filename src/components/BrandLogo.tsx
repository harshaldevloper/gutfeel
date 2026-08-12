import Link from "next/link";

type Props = {
  /** Display height in pixels */
  height?: number;
  className?: string;
  href?: string;
};

/** Real Gutfeel brand logo — use instead of the placeholder G icon or tiny squashed PNG */
export default function BrandLogo({ height = 44, className = "", href = "/" }: Props) {
  const img = (
    <img
      src="/logo.png"
      alt="Gutfeel — Eat Confidently"
      height={height}
      width={Math.round(height * 1.17)}
      className={`object-contain ${className}`}
      style={{ height, width: "auto", maxHeight: height }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center shrink-0">
        {img}
      </Link>
    );
  }

  return img;
}
