export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#10b981"/>
      <path d="M16 6C12 6 9 9 9 13c0 3 2 5 4 6.5C14 21 15 22 16 22s2-1 3-2.5c2-1.5 4-3.5 4-6.5 0-4-3-7-7-7z" fill="white" opacity="0.9"/>
      <path d="M13 13c0-1.5 1-3 3-3s3 1.5 3 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="14" cy="10" r="1" fill="#10b981"/>
      <path d="M16 22v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 25h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
