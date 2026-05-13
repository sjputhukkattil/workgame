import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const DocsLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 47 65" width={36} height={36} {...props}>
    <path d="M29.375 0H4.583C2.062 0 0 2.063 0 4.583v55c0 2.521 2.063 4.584 4.583 4.584h36.667c2.521 0 4.584-2.063 4.584-4.584V16.5L29.375 0z" fill="#4285F4"/>
    <path d="M30.708 15.583L46.75 31.625V16.5L30.708 0v15.583z" fill="#A1C2FA"/>
    <path d="M11 24h25v3H11v-3zm0 6h25v3H11v-3zm0 6h25v3H11v-3zm0 6h17v3H11v-3z" fill="#fff"/>
  </svg>
);

export const SheetsLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 47 65" width={36} height={36} {...props}>
    <path d="M29.375 0H4.583C2.062 0 0 2.063 0 4.583v55c0 2.521 2.063 4.584 4.583 4.584h36.667c2.521 0 4.584-2.063 4.584-4.584V16.5L29.375 0z" fill="#0F9D58"/>
    <path d="M30.708 15.583L46.75 31.625V16.5L30.708 0v15.583z" fill="#87CEAC"/>
    <path d="M11 24h25v17H11V24zm0 0v17m6.25-17v17M23.5 24v17m6.25-17v17M36 24v17M11 30h25M11 36h25" stroke="#fff" strokeWidth="1.5" fill="none"/>
  </svg>
);

export const Grid9 = (p: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/>
    <circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>
    <circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/>
  </svg>
);

export const Sigma = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M18 4H6l6 8-6 8h12" />
  </svg>
);

export const FxIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 20V8a3 3 0 0 1 3-3h2" />
    <path d="M4 13h7" />
    <path d="M13 8l6 12M19 8l-6 12" />
  </svg>
);

export const Star = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <polygon points="12 2 15 9 22 9 17 14 19 22 12 17 5 22 7 14 2 9 9 9 12 2" />
  </svg>
);

export const Folder = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </svg>
);

export const Cloud = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M7 18a4 4 0 1 1 .8-7.93A6 6 0 0 1 19 11.5a3.5 3.5 0 0 1-1 6.5H7z" />
  </svg>
);

export const CheckCircle = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Comment = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
  </svg>
);

export const VideoCam = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
);

export const Undo = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 10h12a5 5 0 0 1 0 10h-3" />
    <polyline points="7 6 3 10 7 14" />
  </svg>
);

export const Redo = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M21 10H9a5 5 0 0 0 0 10h3" />
    <polyline points="17 6 21 10 17 14" />
  </svg>
);

export const Print = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

export const Spell = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m6 16 6-12 6 12" />
    <path d="M8 12h8" />
    <path d="m16 20 2 2 4-4" />
  </svg>
);

export const PaintFormat = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 3h14v6H3z" />
    <path d="M10 9v4h4v8h-4" />
  </svg>
);

export const Bold = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 4h7a4 4 0 0 1 0 8H6V4z" />
    <path d="M6 12h8a4 4 0 0 1 0 8H6v-8z" />
  </svg>
);

export const Italic = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);

export const Underline = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 3v8a6 6 0 0 0 12 0V3" />
    <line x1="4" y1="21" x2="20" y2="21" />
  </svg>
);

export const Link = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export const Image = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const Calendar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Lock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Trophy = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M17 5h2a2 2 0 0 1 0 4h-2" />
    <path d="M7 5H5a2 2 0 0 0 0 4h2" />
  </svg>
);
