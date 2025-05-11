import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <style>
        {`
          .logo-text-baji { fill: hsl(var(--primary)); }
          .logo-text-buz { fill: hsl(var(--foreground)); }
          .logo-font { font-family: var(--font-geist-sans), Arial, sans-serif; font-size: 28px; font-weight: bold; letter-spacing: -0.5px; }
        `}
      </style>
      <text x="10" y="30" className="logo-font">
        <tspan className="logo-text-baji">Baji</tspan><tspan className="logo-text-buz">buz</tspan>
      </text>
    </svg>
  );
}
