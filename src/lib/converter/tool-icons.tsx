import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

/* ─── Unit ───────────────────────────────────────────── */

export const LengthIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="18" width="40" height="12" rx="3" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <line x1="10" y1="18" x2="10" y2="30" stroke="#10B981" strokeWidth="1" opacity="0.4" />
    <line x1="18" y1="18" x2="18" y2="30" stroke="#10B981" strokeWidth="1" opacity="0.4" />
    <line x1="26" y1="18" x2="26" y2="30" stroke="#10B981" strokeWidth="1" opacity="0.4" />
    <line x1="34" y1="18" x2="34" y2="30" stroke="#10B981" strokeWidth="1" opacity="0.4" />
    <path d="M6 24H42" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="42,24 38,21 38,27" fill="#10B981" />
    <polygon points="6,24 10,21 10,27" fill="#10B981" />
  </svg>
);

export const WeightIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M14 36h20L30 18H18L14 36z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <circle cx="24" cy="14" r="5" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <text x="24" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10B981">kg</text>
  </svg>
);

export const TemperatureIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="20" y="6" width="8" height="28" rx="4" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <circle cx="24" cy="38" r="6" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.5" />
    <rect x="22" y="16" width="4" height="18" rx="2" fill="#10B981" opacity="0.5" />
    <circle cx="24" cy="38" r="3" fill="#10B981" />
  </svg>
);

export const AreaIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="10" width="32" height="28" rx="3" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <path d="M8 24h32M24 10v28" stroke="#10B981" strokeWidth="1" opacity="0.3" />
    <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10B981">m²</text>
  </svg>
);

export const VolumeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M16 8h16v4l4 28H12l4-28V8z" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <path d="M14 28h20" stroke="#10B981" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
    <path d="M13 32c2 2 5 3 11 3s9-1 11-3v8H13v-8z" fill="#10B981" opacity="0.25" />
  </svg>
);

export const SpeedIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M8 36a20 20 0 0 1 32 0" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="36" r="3" fill="#10B981" />
    <line x1="24" y1="36" x2="32" y2="20" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 32l2-3M18 24l2-2M24 20v3M30 24l-2-2M36 32l-2-3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const TimeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="24" r="18" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="2" fill="#10B981" />
    <line x1="24" y1="24" x2="24" y2="14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="24" x2="32" y2="28" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PressureIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="24" r="16" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <path d="M14 30a14 14 0 0 1 20 0" stroke="#10B981" strokeWidth="1.5" fill="none" />
    <line x1="24" y1="26" x2="30" y2="18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    <text x="24" y="38" textAnchor="middle" fontSize="7" fontWeight="700" fill="#10B981">PSI</text>
  </svg>
);

export const EnergyIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <polygon points="26,4 14,26 22,26 20,44 36,20 28,20" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const PowerIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="24" r="14" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <path d="M24 12v6" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 16a12 12 0 1 0 16 0" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

export const FrequencyIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M4 24h8l4-12 4 24 4-18 4 14 4-8 4 6 4-4h8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="4" y="8" width="40" height="32" rx="4" stroke="#D1FAE5" strokeWidth="1" fill="none" />
  </svg>
);

export const AngleIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M10 38L38 38L24 12" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M18 38a10 10 0 0 1 3-7" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <text x="28" y="34" fontSize="8" fontWeight="700" fill="#10B981">°</text>
  </svg>
);

export const DataStorageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="10" y="8" width="28" height="10" rx="3" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <rect x="10" y="20" width="28" height="10" rx="3" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <rect x="10" y="32" width="28" height="10" rx="3" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <circle cx="32" cy="13" r="2" fill="#10B981" />
    <circle cx="32" cy="25" r="2" fill="#10B981" />
    <circle cx="32" cy="37" r="2" fill="#10B981" />
  </svg>
);

export const FuelEconomyIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="14" width="22" height="26" rx="3" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
    <rect x="12" y="18" width="14" height="8" rx="2" fill="#10B981" opacity="0.2" />
    <path d="M30 20h4l4 6v10a2 2 0 0 1-2 2h-2" stroke="#10B981" strokeWidth="1.5" fill="none" />
    <circle cx="14" cy="37" r="2" fill="#10B981" />
    <circle cx="24" cy="37" r="2" fill="#10B981" />
  </svg>
);

/* ─── Number ─────────────────────────────────────────── */

export const NumberBaseIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="8" width="36" height="32" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3B82F6">0x</text>
    <text x="24" y="35" textAnchor="middle" fontSize="8" fontWeight="600" fill="#3B82F6" opacity="0.6">1010</text>
  </svg>
);

export const RomanNumeralIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="8" width="36" height="32" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="24" y="30" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3B82F6" fontFamily="serif">IV</text>
  </svg>
);

export const ScientificNotationIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="18" y="29" fontSize="12" fontWeight="700" fill="#3B82F6">10</text>
    <text x="33" y="22" fontSize="9" fontWeight="700" fill="#3B82F6">6</text>
  </svg>
);

export const FractionDecimalIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="8" width="36" height="32" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="16" y="21" fontSize="10" fontWeight="700" fill="#3B82F6">1</text>
    <line x1="12" y1="25" x2="22" y2="25" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="16" y="36" fontSize="10" fontWeight="700" fill="#3B82F6">3</text>
    <text x="36" y="30" fontSize="14" fontWeight="700" fill="#3B82F6" opacity="0.5">=</text>
  </svg>
);

export const PercentageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="8" width="36" height="32" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="24" y="30" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3B82F6">%</text>
  </svg>
);

/* ─── Color ───────────────────────────────────────────── */

export const ColorConverterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="20" cy="18" r="10" fill="#EF4444" opacity="0.5" />
    <circle cx="28" cy="18" r="10" fill="#3B82F6" opacity="0.5" />
    <circle cx="24" cy="26" r="10" fill="#10B981" opacity="0.5" />
  </svg>
);

export const ColorPaletteIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="12" width="8" height="24" rx="2" fill="#EF4444" />
    <rect x="14" y="12" width="8" height="24" rx="2" fill="#F59E0B" />
    <rect x="24" y="12" width="8" height="24" rx="2" fill="#10B981" />
    <rect x="34" y="12" width="8" height="24" rx="2" fill="#6366F1" />
  </svg>
);

export const GradientIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <defs>
      <linearGradient id="grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <rect x="6" y="10" width="36" height="28" rx="6" fill="url(#grad-icon)" />
    <text x="24" y="28" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">CSS</text>
  </svg>
);

export const ContrastCheckerIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#1F2937" />
    <rect x="6" y="10" width="18" height="28" rx="4" fill="#F9FAFB" />
    <text x="14" y="28" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1F2937">A</text>
    <text x="34" y="28" textAnchor="middle" fontSize="10" fontWeight="800" fill="#F9FAFB">A</text>
  </svg>
);

export const ColorBlindnessIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="24" r="16" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="8" fill="#8B5CF6" opacity="0.3" />
    <circle cx="24" cy="24" r="3" fill="#8B5CF6" />
    <line x1="6" y1="42" x2="42" y2="6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

/* ─── DateTime ───────────────────────────────────────── */

export const TimezoneIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="24" r="18" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
    <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke="#F97316" strokeWidth="1" opacity="0.3" />
    <line x1="6" y1="24" x2="42" y2="24" stroke="#F97316" strokeWidth="1" opacity="0.3" />
    <line x1="6" y1="16" x2="42" y2="16" stroke="#F97316" strokeWidth="0.8" opacity="0.2" />
    <line x1="6" y1="32" x2="42" y2="32" stroke="#F97316" strokeWidth="0.8" opacity="0.2" />
    <circle cx="24" cy="24" r="2" fill="#F97316" />
    <line x1="24" y1="24" x2="24" y2="14" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const UnixTimestampIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="10" width="32" height="28" rx="4" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
    <text x="24" y="28" textAnchor="middle" fontSize="8" fontWeight="700" fill="#F97316" fontFamily="monospace">17118</text>
    <text x="24" y="18" textAnchor="middle" fontSize="6" fontWeight="600" fill="#F97316" opacity="0.5">UNIX</text>
  </svg>
);

export const DateFormatIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="10" width="32" height="28" rx="4" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
    <line x1="8" y1="18" x2="40" y2="18" stroke="#F97316" strokeWidth="1.5" />
    <text x="24" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fill="#F97316">25</text>
    <text x="24" y="15" textAnchor="middle" fontSize="6" fontWeight="600" fill="#F97316">MAR</text>
  </svg>
);

export const DateCalculatorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="16" height="14" rx="3" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
    <rect x="26" y="10" width="16" height="14" rx="3" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
    <path d="M22 18h4" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
    <rect x="14" y="30" width="20" height="12" rx="3" fill="#F97316" opacity="0.2" stroke="#F97316" strokeWidth="1.5" />
    <text x="24" y="39" textAnchor="middle" fontSize="7" fontWeight="700" fill="#F97316">=</text>
  </svg>
);

export const AgeCalculatorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="20" r="12" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
    <path d="M20 18c0-2 1.5-4 4-4s4 2 4 4" stroke="#F97316" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="19" r="1.5" fill="#F97316" />
    <circle cx="28" cy="19" r="1.5" fill="#F97316" />
    <path d="M20 23c1 2 3 3 4 3s3-1 4-3" stroke="#F97316" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <rect x="14" y="34" width="20" height="8" rx="3" fill="#F97316" opacity="0.2" />
    <text x="24" y="40" textAnchor="middle" fontSize="6" fontWeight="700" fill="#F97316">AGE</text>
  </svg>
);

/* ─── Data ────────────────────────────────────────────── */

export const JsonYamlIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <rect x="26" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <text x="13" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">{ }</text>
    <text x="35" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">yml</text>
    <path d="M22 24l4 0" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="26,24 24,22 24,26" fill="#06B6D4" />
  </svg>
);

export const JsonCsvIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <rect x="26" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <text x="13" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">{ }</text>
    <text x="35" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">CSV</text>
    <path d="M22 24l4 0" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="26,24 24,22 24,26" fill="#06B6D4" />
  </svg>
);

export const JsonXmlIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <rect x="26" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <text x="13" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">{ }</text>
    <text x="35" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">&lt;/&gt;</text>
    <path d="M22 24l4 0" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="26,24 24,22 24,26" fill="#06B6D4" />
  </svg>
);

export const JsonTomlIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <rect x="26" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <text x="13" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">{ }</text>
    <text x="35" y="26" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#06B6D4">toml</text>
    <path d="M22 24l4 0" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="26,24 24,22 24,26" fill="#06B6D4" />
  </svg>
);

export const MarkdownHtmlIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <rect x="26" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <text x="13" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">MD</text>
    <text x="35" y="26" textAnchor="middle" fontSize="4" fontWeight="700" fill="#06B6D4">&lt;h&gt;</text>
    <path d="M22 24l4 0" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="26,24 24,22 24,26" fill="#06B6D4" />
  </svg>
);

export const CsvTableIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="8" width="36" height="32" rx="4" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <line x1="6" y1="16" x2="42" y2="16" stroke="#06B6D4" strokeWidth="1" />
    <line x1="6" y1="24" x2="42" y2="24" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
    <line x1="6" y1="32" x2="42" y2="32" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
    <line x1="20" y1="8" x2="20" y2="40" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
    <line x1="34" y1="8" x2="34" y2="40" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
  </svg>
);

export const JsonTypescriptIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <rect x="26" y="8" width="18" height="32" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="13" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">{ }</text>
    <text x="35" y="28" textAnchor="middle" fontSize="10" fontWeight="800" fill="#3B82F6">TS</text>
    <path d="M22 24l4 0" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="26,24 24,22 24,26" fill="#06B6D4" />
  </svg>
);

export const SqlJsonIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <rect x="26" y="8" width="18" height="32" rx="3" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.5" />
    <text x="13" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">SQL</text>
    <text x="35" y="26" textAnchor="middle" fontSize="5" fontWeight="700" fill="#06B6D4">{ }</text>
    <path d="M22 24l4 0" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="26,24 24,22 24,26" fill="#06B6D4" />
  </svg>
);

/* ─── CSS ─────────────────────────────────────────────── */

export const PxRemIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
    <text x="16" y="26" fontSize="8" fontWeight="700" fill="#EC4899">px</text>
    <text x="32" y="26" fontSize="7" fontWeight="700" fill="#EC4899">rem</text>
    <path d="M24 16v16" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const PxEmIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
    <text x="16" y="26" fontSize="8" fontWeight="700" fill="#EC4899">px</text>
    <text x="34" y="26" fontSize="8" fontWeight="700" fill="#EC4899">em</text>
    <path d="M24 16v16" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const PxPercentIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
    <text x="16" y="26" fontSize="8" fontWeight="700" fill="#EC4899">px</text>
    <text x="34" y="28" fontSize="12" fontWeight="700" fill="#EC4899">%</text>
    <path d="M24 16v16" stroke="#EC4899" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const CssUnitIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fontSize="6" fontWeight="600" fill="#EC4899" opacity="0.6">px rem em</text>
    <text x="24" y="32" textAnchor="middle" fontSize="6" fontWeight="600" fill="#EC4899" opacity="0.6">vw vh %</text>
  </svg>
);

export const CssMinifierIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="8" width="36" height="32" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
    <line x1="12" y1="16" x2="28" y2="16" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="12" y1="22" x2="24" y2="22" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="12" y1="28" x2="32" y2="28" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="12" y1="34" x2="20" y2="34" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const TailwindCssIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
    <path d="M16 20c2-4 5-4 8-2s6 2 8-2c-2 4-5 4-8 2s-6-2-8 2z" fill="#EC4899" opacity="0.5" />
    <path d="M16 28c2-4 5-4 8-2s6 2 8-2c-2 4-5 4-8 2s-6-2-8 2z" fill="#EC4899" opacity="0.5" />
  </svg>
);

/* ─── Cooking ─────────────────────────────────────────── */

export const CookingMeasurementIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M16 10h16v6l2 22H14l2-22V10z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
    <line x1="18" y1="22" x2="30" y2="22" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
    <line x1="18" y1="28" x2="30" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
    <line x1="18" y1="34" x2="30" y2="34" stroke="#F59E0B" strokeWidth="1" opacity="0.4" />
    <text x="32" y="23" fontSize="5" fill="#F59E0B" opacity="0.6">1c</text>
    <text x="32" y="29" fontSize="5" fill="#F59E0B" opacity="0.6">½</text>
  </svg>
);

export const RecipeScalerIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="8" width="32" height="32" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
    <line x1="12" y1="16" x2="36" y2="16" stroke="#F59E0B" strokeWidth="1" opacity="0.3" />
    <line x1="12" y1="22" x2="30" y2="22" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="28" x2="26" y2="28" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="34" x2="34" y2="34" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <text x="36" y="13" fontSize="10" fontWeight="700" fill="#F59E0B">×2</text>
  </svg>
);

export const OvenTemperatureIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="8" width="32" height="32" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
    <rect x="14" y="20" width="20" height="16" rx="2" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="1" />
    <circle cx="18" cy="14" r="2" fill="#F59E0B" opacity="0.4" />
    <circle cx="24" cy="14" r="2" fill="#F59E0B" opacity="0.4" />
    <circle cx="30" cy="14" r="2" fill="#F59E0B" opacity="0.4" />
    <text x="24" y="31" textAnchor="middle" fontSize="7" fontWeight="700" fill="#F59E0B">°F</text>
  </svg>
);

/* ─── Geography ───────────────────────────────────────── */

export const CoordinateIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="24" r="16" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="1.5" />
    <line x1="24" y1="8" x2="24" y2="40" stroke="#14B8A6" strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="24" x2="40" y2="24" stroke="#14B8A6" strokeWidth="1" opacity="0.3" />
    <circle cx="30" cy="18" r="3" fill="#14B8A6" opacity="0.5" />
    <path d="M30 15l0-3m0 6v0" stroke="#14B8A6" strokeWidth="1.5" />
  </svg>
);

export const DistanceCalculatorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="14" cy="18" r="4" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="1.5" />
    <circle cx="34" cy="32" r="4" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="1.5" />
    <line x1="14" y1="18" x2="34" y2="32" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="3 3" />
    <text x="26" y="22" fontSize="7" fontWeight="700" fill="#14B8A6">km</text>
  </svg>
);

/* ─── Icon Map ────────────────────────────────────────── */

export const converterToolIconMap: Record<string, FC<IconProps>> = {
  // Unit
  length: LengthIcon,
  weight: WeightIcon,
  temperature: TemperatureIcon,
  area: AreaIcon,
  volume: VolumeIcon,
  speed: SpeedIcon,
  time: TimeIcon,
  pressure: PressureIcon,
  energy: EnergyIcon,
  power: PowerIcon,
  frequency: FrequencyIcon,
  angle: AngleIcon,
  "data-storage": DataStorageIcon,
  "fuel-economy": FuelEconomyIcon,
  // Number
  "number-base": NumberBaseIcon,
  "roman-numeral": RomanNumeralIcon,
  "scientific-notation": ScientificNotationIcon,
  "fraction-decimal": FractionDecimalIcon,
  percentage: PercentageIcon,
  // Color
  "color-converter": ColorConverterIcon,
  "color-palette-generator": ColorPaletteIcon,
  "gradient-generator": GradientIcon,
  "color-contrast-checker": ContrastCheckerIcon,
  "color-blindness-simulator": ColorBlindnessIcon,
  // DateTime
  timezone: TimezoneIcon,
  "unix-timestamp": UnixTimestampIcon,
  "date-format": DateFormatIcon,
  "date-calculator": DateCalculatorIcon,
  "age-calculator": AgeCalculatorIcon,
  // Data
  "json-yaml": JsonYamlIcon,
  "json-csv": JsonCsvIcon,
  "json-xml": JsonXmlIcon,
  "json-toml": JsonTomlIcon,
  "markdown-html": MarkdownHtmlIcon,
  "csv-table": CsvTableIcon,
  "json-typescript": JsonTypescriptIcon,
  "sql-json": SqlJsonIcon,
  // CSS
  "px-rem": PxRemIcon,
  "px-em": PxEmIcon,
  "px-percent": PxPercentIcon,
  "css-unit": CssUnitIcon,
  "css-minifier": CssMinifierIcon,
  "tailwind-css": TailwindCssIcon,
  // Cooking
  "cooking-measurement": CookingMeasurementIcon,
  "recipe-scaler": RecipeScalerIcon,
  "oven-temperature": OvenTemperatureIcon,
  // Geography
  coordinate: CoordinateIcon,
  "distance-calculator": DistanceCalculatorIcon,
};
