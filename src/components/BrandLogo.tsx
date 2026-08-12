import Link from "next/link";

type Props = {
  /** Display height in pixels */
  height?: number;
  className?: string;
  href?: string;
  /** full = horizontal logo, mark = circular badge for small slots */
  variant?: "full" | "mark";
};

export default function BrandLogo({ height = 44, className = "", href = "/", variant = "full" }: Props) {
  const src = variant === "mark" ? "/logo-mark.png" : "/logo.png";
  const aspect = variant === "mark" ? 1 : 1359 / 1158;

  const img = (
    <img
      src={src}
      alt="Gutfeel — Eat Confidently"
      height={height}
      width={Math.round(height * aspect)}
      className={`object-contain object-left ${className}`}
      style={{ height, width: "auto", maxHeight: height, maxWidth: variant === "full" ? height * 1.4 : height }}
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
