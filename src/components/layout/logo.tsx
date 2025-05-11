import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="160" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <style>
        {`
          .logo-text-deshi { fill: hsl(var(--foreground)); }
          .logo-text-spin { fill: hsl(var(--primary)); }
          @media (prefers-color-scheme: dark) {
            .logo-text-deshi { fill: hsl(var(--foreground)); }
          }
        `}
      </style>
      <text x="10" y="30" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="28" fontWeight="bold" className="logo-text-deshi">
        Deshi
      </text>
      <text x="100" y="30" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="28" fontWeight="bold" className="logo-text-spin">
        Spin
      </text>
    </svg>
  );
}
