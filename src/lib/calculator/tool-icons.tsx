import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

/* ─── Math ───────────────────────────────────────────── */

export const PercentageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#EDE9FE" />
    <circle cx="17" cy="17" r="5" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
    <circle cx="31" cy="31" r="5" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
    <line x1="34" y1="14" x2="14" y2="34" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ScientificIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="6" width="36" height="36" rx="6" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
    <rect x="10" y="10" width="28" height="10" rx="2" fill="#7C3AED" opacity="0.15" />
    <text x="24" y="18" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7C3AED">123.45</text>
    <text x="24" y="34" textAnchor="middle" fontSize="14" fontWeight="800" fill="#7C3AED" opacity="0.7">{"\u03A3"}</text>
  </svg>
);

export const RatioIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="14" width="14" height="20" rx="3" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
    <rect x="28" y="10" width="14" height="28" rx="3" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
    <circle cx="24" cy="20" r="2" fill="#7C3AED" />
    <circle cx="24" cy="28" r="2" fill="#7C3AED" />
  </svg>
);

export const GcdLcmIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="19" cy="24" r="13" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
    <circle cx="29" cy="24" r="13" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" opacity="0.8" />
    <path d="M24 14.5a13 13 0 0 0-5 9.5 13 13 0 0 0 5 9.5 13 13 0 0 0 5-9.5 13 13 0 0 0-5-9.5z" fill="#7C3AED" opacity="0.2" />
    <text x="24" y="27" textAnchor="middle" fontSize="7" fontWeight="700" fill="#7C3AED">GCD</text>
  </svg>
);

export const FactorialIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#EDE9FE" />
    <text x="22" y="32" textAnchor="middle" fontSize="22" fontWeight="800" fill="#7C3AED">n</text>
    <text x="36" y="24" textAnchor="middle" fontSize="18" fontWeight="800" fill="#7C3AED">!</text>
  </svg>
);

export const PrimeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="6" y="6" width="36" height="36" rx="8" fill="#EDE9FE" />
    <text x="20" y="32" textAnchor="middle" fontSize="20" fontWeight="800" fill="#7C3AED">7</text>
    <path d="M30 16l3 3 6-6" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LogarithmIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#EDE9FE" />
    <path d="M10 38 C16 36 20 20 38 12" stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round" />
    <text x="24" y="42" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7C3AED" opacity="0.6">log</text>
  </svg>
);

export const QuadraticIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#EDE9FE" />
    <path d="M10 36 Q24 4 38 36" stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round" />
    <line x1="8" y1="36" x2="40" y2="36" stroke="#7C3AED" strokeWidth="1" opacity="0.3" />
    <circle cx="16" cy="36" r="2" fill="#7C3AED" opacity="0.5" />
    <circle cx="32" cy="36" r="2" fill="#7C3AED" opacity="0.5" />
  </svg>
);

export const MatrixIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M10 8 L8 8 L8 40 L10 40" stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M38 8 L40 8 L40 40 L38 40" stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round" />
    <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C3AED">1</text>
    <text x="24" y="20" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C3AED">2</text>
    <text x="32" y="20" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C3AED">3</text>
    <text x="16" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C3AED">4</text>
    <text x="24" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C3AED">5</text>
    <text x="32" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7C3AED">6</text>
  </svg>
);

/* ─── Statistics ──────────────────────────────────────── */

export const MeanMedianModeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F3E8FF" />
    <rect x="10" y="28" width="6" height="10" rx="1" fill="#9333EA" opacity="0.3" />
    <rect x="18" y="18" width="6" height="20" rx="1" fill="#9333EA" opacity="0.5" />
    <rect x="26" y="12" width="6" height="26" rx="1" fill="#9333EA" opacity="0.7" />
    <rect x="34" y="22" width="6" height="16" rx="1" fill="#9333EA" opacity="0.4" />
    <line x1="8" y1="22" x2="42" y2="22" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="3 2" />
  </svg>
);

export const StandardDeviationIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F3E8FF" />
    <path d="M6 38 Q14 36 20 28 Q24 20 24 12 Q24 20 28 28 Q34 36 42 38" stroke="#9333EA" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M6 38 Q14 36 20 28 Q24 20 24 12 Q24 20 28 28 Q34 36 42 38" fill="#9333EA" opacity="0.1" />
    <line x1="24" y1="10" x2="24" y2="40" stroke="#9333EA" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
  </svg>
);

export const ProbabilityIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="8" width="32" height="32" rx="6" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="2.5" fill="#9333EA" />
    <circle cx="32" cy="16" r="2.5" fill="#9333EA" />
    <circle cx="24" cy="24" r="2.5" fill="#9333EA" />
    <circle cx="16" cy="32" r="2.5" fill="#9333EA" />
    <circle cx="32" cy="32" r="2.5" fill="#9333EA" />
  </svg>
);

export const PermutationCombinationIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F3E8FF" />
    <circle cx="14" cy="14" r="4" fill="#9333EA" opacity="0.4" />
    <circle cx="34" cy="14" r="4" fill="#9333EA" opacity="0.4" />
    <circle cx="14" cy="34" r="4" fill="#9333EA" opacity="0.4" />
    <circle cx="34" cy="34" r="4" fill="#9333EA" opacity="0.4" />
    <circle cx="24" cy="24" r="4" fill="#9333EA" opacity="0.6" />
    <line x1="14" y1="14" x2="34" y2="34" stroke="#9333EA" strokeWidth="1" opacity="0.3" />
    <line x1="34" y1="14" x2="14" y2="34" stroke="#9333EA" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="14" x2="24" y2="24" stroke="#9333EA" strokeWidth="1" opacity="0.3" />
    <line x1="34" y1="14" x2="24" y2="24" stroke="#9333EA" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const ZScoreIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F3E8FF" />
    <path d="M6 38 Q14 36 20 28 Q24 20 24 12 Q24 20 28 28 Q34 36 42 38" stroke="#9333EA" strokeWidth="2" fill="none" strokeLinecap="round" />
    <line x1="30" y1="10" x2="30" y2="40" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M30 14l3-3" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M30 14l-3-3" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
    <text x="34" y="14" fontSize="7" fontWeight="700" fill="#9333EA">z</text>
  </svg>
);

export const ConfidenceIntervalIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F3E8FF" />
    <line x1="12" y1="24" x2="36" y2="24" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="18" x2="12" y2="30" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
    <line x1="36" y1="18" x2="36" y2="30" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="24" r="3" fill="#9333EA" />
    <rect x="14" y="22" width="20" height="4" rx="2" fill="#9333EA" opacity="0.15" />
  </svg>
);

export const RegressionIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F3E8FF" />
    <circle cx="12" cy="32" r="2" fill="#9333EA" opacity="0.5" />
    <circle cx="18" cy="28" r="2" fill="#9333EA" opacity="0.5" />
    <circle cx="22" cy="22" r="2" fill="#9333EA" opacity="0.5" />
    <circle cx="30" cy="20" r="2" fill="#9333EA" opacity="0.5" />
    <circle cx="36" cy="14" r="2" fill="#9333EA" opacity="0.5" />
    <line x1="10" y1="34" x2="38" y2="12" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─── Trigonometry ───────────────────────────────────── */

export const TrigonometryIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FAE8FF" />
    <path d="M10 38L38 38L10 12Z" fill="#C026D3" opacity="0.1" stroke="#C026D3" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 32 Q14 32 14 38" stroke="#C026D3" strokeWidth="1.5" fill="none" />
    <text x="26" y="34" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C026D3" opacity="0.6">sin</text>
  </svg>
);

export const RightTriangleIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FAE8FF" />
    <path d="M10 38L38 38L10 12Z" fill="#C026D3" opacity="0.1" stroke="#C026D3" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="10" y="33" width="5" height="5" fill="none" stroke="#C026D3" strokeWidth="1" />
    <text x="14" y="28" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C026D3">a</text>
    <text x="26" y="42" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C026D3">b</text>
    <text x="28" y="24" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C026D3">c</text>
  </svg>
);

export const CircleIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <circle cx="24" cy="24" r="18" fill="#FAE8FF" stroke="#C026D3" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="1.5" fill="#C026D3" />
    <line x1="24" y1="24" x2="38" y2="18" stroke="#C026D3" strokeWidth="1.5" strokeLinecap="round" />
    <text x="32" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="#C026D3">r</text>
  </svg>
);

/* ─── Financial ──────────────────────────────────────── */

export const CompoundInterestIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FEF9C3" />
    <rect x="10" y="30" width="6" height="8" rx="1" fill="#CA8A04" opacity="0.3" />
    <rect x="18" y="24" width="6" height="14" rx="1" fill="#CA8A04" opacity="0.5" />
    <rect x="26" y="16" width="6" height="22" rx="1" fill="#CA8A04" opacity="0.7" />
    <rect x="34" y="10" width="6" height="28" rx="1" fill="#CA8A04" />
    <text x="24" y="44" textAnchor="middle" fontSize="6" fontWeight="700" fill="#CA8A04" opacity="0.5">$</text>
  </svg>
);

export const LoanIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="6" width="28" height="36" rx="4" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
    <line x1="14" y1="16" x2="30" y2="16" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="22" x2="30" y2="22" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="28" x2="26" y2="28" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
    <circle cx="36" cy="34" r="9" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
    <text x="36" y="38" textAnchor="middle" fontSize="12" fontWeight="800" fill="#CA8A04">$</text>
  </svg>
);

export const MortgageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M24 6L6 22h6v18h24V22h6L24 6z" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="18" y="28" width="12" height="12" rx="1" fill="#CA8A04" opacity="0.15" stroke="#CA8A04" strokeWidth="1" />
    <text x="24" y="38" textAnchor="middle" fontSize="10" fontWeight="800" fill="#CA8A04">$</text>
  </svg>
);

export const SavingsGoalIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <ellipse cx="24" cy="30" rx="16" ry="12" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
    <rect x="20" y="8" width="8" height="6" rx="2" fill="#CA8A04" opacity="0.3" stroke="#CA8A04" strokeWidth="1" />
    <line x1="20" y1="11" x2="28" y2="11" stroke="#CA8A04" strokeWidth="1" />
    <circle cx="18" cy="28" r="2" fill="#CA8A04" opacity="0.3" />
    <ellipse cx="36" cy="26" rx="3" ry="4" fill="#CA8A04" opacity="0.15" stroke="#CA8A04" strokeWidth="1" />
    <text x="24" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill="#CA8A04">$</text>
  </svg>
);

export const RoiIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FEF9C3" />
    <path d="M10 34L20 24L28 28L38 14" stroke="#CA8A04" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="38,14 32,16 36,20" fill="#CA8A04" />
    <text x="24" y="42" textAnchor="middle" fontSize="7" fontWeight="700" fill="#CA8A04" opacity="0.5">ROI</text>
  </svg>
);

export const ProfitMarginIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="6" width="28" height="36" rx="4" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
    <line x1="14" y1="14" x2="30" y2="14" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="20" x2="30" y2="20" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="26" x2="30" y2="26" stroke="#CA8A04" strokeWidth="1.5" />
    <text x="22" y="36" textAnchor="middle" fontSize="10" fontWeight="800" fill="#CA8A04">%</text>
  </svg>
);

export const MarkupIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <path d="M28 6L20 6L16 42h8l2-18 2 18h8L32 6z" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="24" cy="18" r="3" fill="#CA8A04" opacity="0.3" />
    <text x="24" y="36" textAnchor="middle" fontSize="10" fontWeight="800" fill="#CA8A04">$</text>
  </svg>
);

export const BreakEvenIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FEF9C3" />
    <line x1="8" y1="38" x2="40" y2="10" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="10" x2="40" y2="38" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <circle cx="24" cy="24" r="4" fill="#CA8A04" opacity="0.3" stroke="#CA8A04" strokeWidth="1.5" />
  </svg>
);

export const DepreciationIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FEF9C3" />
    <path d="M10 12L20 18L28 22L38 36" stroke="#CA8A04" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="38,36 32,32 34,38" fill="#CA8A04" />
    <line x1="8" y1="40" x2="42" y2="40" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const SalesTaxIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="4" width="32" height="40" rx="4" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
    <rect x="12" y="8" width="24" height="10" rx="2" fill="#CA8A04" opacity="0.1" />
    <text x="24" y="16" textAnchor="middle" fontSize="7" fontWeight="700" fill="#CA8A04">TAX</text>
    <line x1="14" y1="24" x2="34" y2="24" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="30" x2="34" y2="30" stroke="#CA8A04" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="36" x2="26" y2="36" stroke="#CA8A04" strokeWidth="1.5" />
    <text x="34" y="38" textAnchor="middle" fontSize="8" fontWeight="700" fill="#CA8A04">%</text>
  </svg>
);

/* ─── Health ─────────────────────────────────────────── */

export const BmiIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <circle cx="24" cy="14" r="5" fill="#E11D48" opacity="0.3" />
    <path d="M16 22h16v4l-2 14h-12l-2-14v-4z" fill="#E11D48" opacity="0.15" stroke="#E11D48" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="12" y="38" width="24" height="4" rx="2" fill="#E11D48" opacity="0.2" stroke="#E11D48" strokeWidth="1" />
  </svg>
);

export const BmrIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <path d="M24 8c-2 4-8 10-8 18 0 8 6 14 8 14s8-6 8-14c0-8-6-14-8-18z" fill="#E11D48" opacity="0.15" stroke="#E11D48" strokeWidth="1.5" />
    <path d="M24 20c-1 2-3 4-3 8 0 3 2 6 3 6s3-3 3-6c0-4-2-6-3-8z" fill="#E11D48" opacity="0.3" />
  </svg>
);

export const TdeeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <circle cx="22" cy="14" r="5" fill="#E11D48" opacity="0.3" />
    <path d="M16 22c0 0 2 4 6 4s6-4 6-4l4 16H12l4-16z" fill="#E11D48" opacity="0.15" stroke="#E11D48" strokeWidth="1.5" />
    <path d="M30 22l4-6 4 2-3 5" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 38l-4-6 3-2" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M34 14c-1 2-2 4-2 6 0 2 1 3 2 3s2-1 2-3c0-2-1-4-2-6z" fill="#E11D48" opacity="0.4" />
  </svg>
);

export const CalorieIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <circle cx="24" cy="26" r="12" fill="#E11D48" opacity="0.1" stroke="#E11D48" strokeWidth="1.5" />
    <path d="M24 8c-1 3-2 5-2 5s3-1 2 2" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <text x="24" y="30" textAnchor="middle" fontSize="10" fontWeight="800" fill="#E11D48">cal</text>
  </svg>
);

export const BodyFatIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <circle cx="24" cy="12" r="5" fill="#E11D48" opacity="0.3" />
    <path d="M16 20h16l1 10-3 10h-12l-3-10 1-10z" fill="#E11D48" opacity="0.15" stroke="#E11D48" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="14" y1="26" x2="34" y2="26" stroke="#E11D48" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    <text x="24" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fill="#E11D48">%</text>
  </svg>
);

export const IdealWeightIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <path d="M24 14l-14 8v4l14 8 14-8v-4l-14-8z" fill="#E11D48" opacity="0.1" stroke="#E11D48" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="24" y1="22" x2="24" y2="34" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="24,14 20,18 28,18" fill="#E11D48" opacity="0.4" />
  </svg>
);

export const HeartRateZoneIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <path d="M24 38s-14-8-14-18c0-6 4-10 8-10 3 0 5 2 6 4 1-2 3-4 6-4 4 0 8 4 8 10 0 10-14 18-14 18z" fill="#E11D48" opacity="0.15" stroke="#E11D48" strokeWidth="1.5" />
    <path d="M14 24h5l2-4 3 8 3-6 2 2h5" stroke="#E11D48" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MacroIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFE4E6" />
    <circle cx="24" cy="24" r="14" fill="none" stroke="#E11D48" strokeWidth="1.5" />
    <path d="M24 10a14 14 0 0 1 12.1 7L24 24V10z" fill="#E11D48" opacity="0.5" />
    <path d="M36.1 17A14 14 0 0 1 24 38V24l12.1-7z" fill="#E11D48" opacity="0.3" />
    <path d="M24 38A14 14 0 0 1 24 10v14z" fill="#E11D48" opacity="0.15" />
  </svg>
);

/* ─── Everyday ───────────────────────────────────────── */

export const TipIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="4" width="28" height="36" rx="4" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" />
    <line x1="14" y1="12" x2="30" y2="12" stroke="#EA580C" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="18" x2="30" y2="18" stroke="#EA580C" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="24" x2="30" y2="24" stroke="#EA580C" strokeWidth="1.5" />
    <circle cx="36" cy="36" r="8" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" />
    <text x="36" y="40" textAnchor="middle" fontSize="10" fontWeight="800" fill="#EA580C">$</text>
  </svg>
);

export const ElectricityCostIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFF7ED" />
    <path d="M20 6l-4 18h8l-4 18 12-22h-8l4-14z" fill="#EA580C" opacity="0.15" stroke="#EA580C" strokeWidth="1.5" strokeLinejoin="round" />
    <text x="36" y="40" textAnchor="middle" fontSize="9" fontWeight="800" fill="#EA580C">$</text>
  </svg>
);

export const FuelCostIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFF7ED" />
    <rect x="10" y="12" width="20" height="26" rx="3" fill="#EA580C" opacity="0.1" stroke="#EA580C" strokeWidth="1.5" />
    <rect x="14" y="16" width="12" height="8" rx="1" fill="#EA580C" opacity="0.2" />
    <path d="M30 18l4-4 4 2v16c0 2-2 4-4 4s-2-2-2-4v-6" stroke="#EA580C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <text x="20" y="36" textAnchor="middle" fontSize="8" fontWeight="700" fill="#EA580C">$</text>
  </svg>
);

export const PaintIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFF7ED" />
    <rect x="18" y="8" width="12" height="22" rx="2" fill="#EA580C" opacity="0.15" stroke="#EA580C" strokeWidth="1.5" />
    <rect x="22" y="30" width="4" height="12" rx="1" fill="#EA580C" opacity="0.3" stroke="#EA580C" strokeWidth="1" />
    <rect x="16" y="14" width="16" height="6" rx="1" fill="#EA580C" opacity="0.25" />
  </svg>
);

export const ConcreteIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFF7ED" />
    <rect x="8" y="20" width="32" height="20" rx="2" fill="#EA580C" opacity="0.15" stroke="#EA580C" strokeWidth="1.5" />
    <line x1="8" y1="30" x2="40" y2="30" stroke="#EA580C" strokeWidth="1" opacity="0.3" />
    <line x1="20" y1="20" x2="20" y2="40" stroke="#EA580C" strokeWidth="1" opacity="0.3" />
    <line x1="32" y1="20" x2="32" y2="40" stroke="#EA580C" strokeWidth="1" opacity="0.3" />
    <text x="24" y="18" textAnchor="middle" fontSize="7" fontWeight="700" fill="#EA580C" opacity="0.6">m{"\u00B3"}</text>
  </svg>
);

export const TileIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFF7ED" />
    <rect x="8" y="8" width="14" height="14" rx="1" fill="#EA580C" opacity="0.15" stroke="#EA580C" strokeWidth="1" />
    <rect x="26" y="8" width="14" height="14" rx="1" fill="#EA580C" opacity="0.25" stroke="#EA580C" strokeWidth="1" />
    <rect x="8" y="26" width="14" height="14" rx="1" fill="#EA580C" opacity="0.25" stroke="#EA580C" strokeWidth="1" />
    <rect x="26" y="26" width="14" height="14" rx="1" fill="#EA580C" opacity="0.15" stroke="#EA580C" strokeWidth="1" />
  </svg>
);

export const RandomNumberIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="8" width="32" height="32" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="3" fill="#EA580C" />
    <circle cx="32" cy="16" r="3" fill="#EA580C" />
    <circle cx="24" cy="24" r="3" fill="#EA580C" />
    <circle cx="16" cy="32" r="3" fill="#EA580C" />
    <circle cx="32" cy="32" r="3" fill="#EA580C" />
  </svg>
);

/* ─── Education ──────────────────────────────────────── */

export const GpaIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#E0E7FF" />
    <path d="M24 6l-16 10v4l16 10 16-10v-4L24 6z" fill="#4F46E5" opacity="0.15" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="40" y1="16" x2="40" y2="32" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
    <text x="24" y="38" textAnchor="middle" fontSize="9" fontWeight="800" fill="#4F46E5">4.0</text>
  </svg>
);

export const GradeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="4" width="32" height="40" rx="4" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" />
    <line x1="14" y1="14" x2="34" y2="14" stroke="#4F46E5" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="20" x2="34" y2="20" stroke="#4F46E5" strokeWidth="1" opacity="0.3" />
    <line x1="14" y1="26" x2="34" y2="26" stroke="#4F46E5" strokeWidth="1" opacity="0.3" />
    <text x="24" y="40" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4F46E5">A+</text>
  </svg>
);

export const FinalExamIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="8" y="4" width="32" height="40" rx="4" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" />
    <line x1="14" y1="12" x2="34" y2="12" stroke="#4F46E5" strokeWidth="1.5" />
    <circle cx="16" cy="20" r="2" fill="none" stroke="#4F46E5" strokeWidth="1" />
    <circle cx="16" cy="26" r="2" fill="#4F46E5" opacity="0.5" />
    <circle cx="16" cy="32" r="2" fill="none" stroke="#4F46E5" strokeWidth="1" />
    <line x1="22" y1="20" x2="34" y2="20" stroke="#4F46E5" strokeWidth="1" opacity="0.3" />
    <line x1="22" y1="26" x2="34" y2="26" stroke="#4F46E5" strokeWidth="1" opacity="0.3" />
    <line x1="22" y1="32" x2="34" y2="32" stroke="#4F46E5" strokeWidth="1" opacity="0.3" />
    <text x="34" y="42" textAnchor="middle" fontSize="8" fontWeight="700" fill="#4F46E5">?</text>
  </svg>
);

export const WeightedAverageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#E0E7FF" />
    <path d="M24 12l-14 8v4l14 8 14-8v-4l-14-8z" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="24" cy="20" r="6" fill="#4F46E5" opacity="0.2" stroke="#4F46E5" strokeWidth="1.5" />
    <text x="24" y="23" textAnchor="middle" fontSize="7" fontWeight="700" fill="#4F46E5">w</text>
    <text x="24" y="38" textAnchor="middle" fontSize="8" fontWeight="700" fill="#4F46E5" opacity="0.5">avg</text>
  </svg>
);

/* ─── Developer ──────────────────────────────────────── */

export const BitwiseIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F1F5F9" />
    <text x="12" y="20" fontSize="10" fontWeight="700" fill="#475569" opacity="0.5">0</text>
    <text x="22" y="20" fontSize="10" fontWeight="700" fill="#475569">1</text>
    <text x="32" y="20" fontSize="10" fontWeight="700" fill="#475569" opacity="0.5">0</text>
    <text x="12" y="34" fontSize="10" fontWeight="700" fill="#475569">1</text>
    <text x="22" y="34" fontSize="10" fontWeight="700" fill="#475569" opacity="0.5">0</text>
    <text x="32" y="34" fontSize="10" fontWeight="700" fill="#475569">1</text>
  </svg>
);

export const SubnetIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="4" width="40" height="40" rx="8" fill="#F1F5F9" />
    <circle cx="24" cy="12" r="5" fill="#475569" opacity="0.2" stroke="#475569" strokeWidth="1.5" />
    <circle cx="12" cy="32" r="5" fill="#475569" opacity="0.2" stroke="#475569" strokeWidth="1.5" />
    <circle cx="36" cy="32" r="5" fill="#475569" opacity="0.2" stroke="#475569" strokeWidth="1.5" />
    <circle cx="24" cy="36" r="5" fill="#475569" opacity="0.2" stroke="#475569" strokeWidth="1.5" />
    <line x1="24" y1="17" x2="12" y2="27" stroke="#475569" strokeWidth="1.5" />
    <line x1="24" y1="17" x2="36" y2="27" stroke="#475569" strokeWidth="1.5" />
    <line x1="24" y1="17" x2="24" y2="31" stroke="#475569" strokeWidth="1.5" />
  </svg>
);

/* ─── Icon Map ───────────────────────────────────────── */

export const calculatorToolIconMap: Record<string, FC<IconProps>> = {
  // Math
  "percentage-calculator": PercentageIcon,
  "scientific-calculator": ScientificIcon,
  "ratio-calculator": RatioIcon,
  "gcd-lcm": GcdLcmIcon,
  factorial: FactorialIcon,
  "prime-checker": PrimeIcon,
  logarithm: LogarithmIcon,
  "quadratic-solver": QuadraticIcon,
  "matrix-calculator": MatrixIcon,
  // Statistics
  "mean-median-mode": MeanMedianModeIcon,
  "standard-deviation": StandardDeviationIcon,
  probability: ProbabilityIcon,
  "permutation-combination": PermutationCombinationIcon,
  "z-score": ZScoreIcon,
  "confidence-interval": ConfidenceIntervalIcon,
  regression: RegressionIcon,
  // Trigonometry
  trigonometry: TrigonometryIcon,
  "right-triangle": RightTriangleIcon,
  "circle-calculator": CircleIcon,
  // Financial
  "compound-interest": CompoundInterestIcon,
  "loan-calculator": LoanIcon,
  "mortgage-calculator": MortgageIcon,
  "savings-goal": SavingsGoalIcon,
  "roi-calculator": RoiIcon,
  "profit-margin": ProfitMarginIcon,
  "markup-calculator": MarkupIcon,
  "break-even": BreakEvenIcon,
  depreciation: DepreciationIcon,
  "sales-tax": SalesTaxIcon,
  // Health
  "bmi-calculator": BmiIcon,
  "bmr-calculator": BmrIcon,
  "tdee-calculator": TdeeIcon,
  "calorie-calculator": CalorieIcon,
  "body-fat": BodyFatIcon,
  "ideal-weight": IdealWeightIcon,
  "heart-rate-zone": HeartRateZoneIcon,
  "macro-calculator": MacroIcon,
  // Everyday
  "tip-calculator": TipIcon,
  "electricity-cost": ElectricityCostIcon,
  "fuel-cost": FuelCostIcon,
  "paint-calculator": PaintIcon,
  "concrete-calculator": ConcreteIcon,
  "tile-calculator": TileIcon,
  "random-number": RandomNumberIcon,
  // Education
  "gpa-calculator": GpaIcon,
  "grade-calculator": GradeIcon,
  "final-exam": FinalExamIcon,
  "weighted-average": WeightedAverageIcon,
  // Developer
  "bitwise-calculator": BitwiseIcon,
  "subnet-calculator": SubnetIcon,
};
