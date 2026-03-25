import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

/** PDF app icon — document with folded corner and "PDF" text lines */
export const PdfAppIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Main document */}
    <path
      d="M10,3 H30 L38,11 V43 Q38,45 36,45 H12 Q10,45 10,43 V3Z"
      fill="#FEE2E2"
      stroke="#EF4444"
      strokeWidth="1.8"
    />
    {/* Fold */}
    <path d="M30,3 V11 H38" fill="#EF4444" opacity="0.25" />
    <path d="M30,3 V11 H38" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinejoin="round" />
    {/* Text lines */}
    <line x1="15" y1="18" x2="33" y2="18" stroke="#EF4444" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <line x1="15" y1="22.5" x2="29" y2="22.5" stroke="#EF4444" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <line x1="15" y1="27" x2="31" y2="27" stroke="#EF4444" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    {/* PDF badge */}
    <rect x="17" y="32" width="22" height="12" rx="3" fill="#EF4444" />
    <text x="28" y="41" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily="system-ui,sans-serif" fill="white">PDF</text>
  </svg>
);

/** Image app icon — image frame with mountain scene and sun */
export const ImageAppIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Frame */}
    <rect x="5" y="7" width="38" height="34" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.8" />
    {/* Inner frame border */}
    <rect x="8" y="10" width="32" height="28" rx="2" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="0.8" opacity="0.3" />
    {/* Sun */}
    <circle cx="16" cy="18" r="4" fill="#3B82F6" opacity="0.35" />
    {/* Mountains */}
    <path d="M8,38 L18,22 L25,30 L30,24 L40,38Z" fill="#3B82F6" opacity="0.2" />
    <path d="M8,38 L20,26 L28,34 L32,29 L40,38Z" fill="#3B82F6" opacity="0.35" />
    {/* IMG badge */}
    <rect x="19" y="33" width="22" height="12" rx="3" fill="#3B82F6" />
    <text x="30" y="42" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="system-ui,sans-serif" fill="white">IMG</text>
  </svg>
);

/** Text app icon — document with text cursor and "TXT" badge */
export const TextAppIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Main document */}
    <path
      d="M10,3 H30 L38,11 V43 Q38,45 36,45 H12 Q10,45 10,43 V3Z"
      fill="#FEF3C7"
      stroke="#F59E0B"
      strokeWidth="1.8"
    />
    {/* Fold */}
    <path d="M30,3 V11 H38" fill="#F59E0B" opacity="0.25" />
    <path d="M30,3 V11 H38" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinejoin="round" />
    {/* Text lines */}
    <line x1="15" y1="18" x2="33" y2="18" stroke="#F59E0B" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <line x1="15" y1="22.5" x2="29" y2="22.5" stroke="#F59E0B" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    {/* Text cursor */}
    <line x1="26" y1="25" x2="26" y2="32" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    {/* TXT badge */}
    <rect x="17" y="32" width="22" height="12" rx="3" fill="#F59E0B" />
    <text x="28" y="41" textAnchor="middle" fontSize="7.5" fontWeight="800" fontFamily="system-ui,sans-serif" fill="white">TXT</text>
  </svg>
);

/** Converter app icon — exchange arrows with "CVT" badge */
export const ConverterAppIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Circle background */}
    <circle cx="24" cy="24" r="20" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.8" />
    {/* Arrow right */}
    <path d="M12 18h18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 14l4 4-4 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arrow left */}
    <path d="M36 30H18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 26l-4 4 4 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* CVT badge */}
    <rect x="17" y="36" width="22" height="10" rx="3" fill="#10B981" />
    <text x="28" y="43.5" textAnchor="middle" fontSize="6.5" fontWeight="800" fontFamily="system-ui,sans-serif" fill="white">CVT</text>
  </svg>
);

/** Map app slugs to icons */
export const appIconMap: Record<string, FC<IconProps>> = {
  pdf: PdfAppIcon,
  image: ImageAppIcon,
  text: TextAppIcon,
  converter: ConverterAppIcon,
};

export function getAppIcon(slug: string): FC<IconProps> | undefined {
  return appIconMap[slug];
}
