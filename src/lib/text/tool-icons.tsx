import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

// ── Color palette ──────────────────────────────────────────────
const C = {
  // Category accent colors
  amber:   "#F59E0B",  // count
  blue:    "#3B82F6",  // transform
  emerald: "#10B981",  // clean
  purple:  "#8B5CF6",  // find
  cyan:    "#06B6D4",  // encode
  rose:    "#F43F5E",  // generate
  // Light fills
  amberLight:   "#FEF3C7",
  blueLight:    "#DBEAFE",
  emeraldLight: "#D1FAE5",
  purpleLight:  "#EDE9FE",
  cyanLight:    "#CFFAFE",
  roseLight:    "#FFE4E6",
} as const;

// ── Text document base component ─────────────────────────────
function TextDoc({
  x = 6, y = 4, w = 28, h = 36,
  color, lightColor,
  children,
}: {
  x?: number; y?: number; w?: number; h?: number;
  color: string;
  lightColor: string;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={lightColor} stroke={color} strokeWidth="1.5" />
      {/* Default text lines if no children */}
      {!children && (
        <>
          <line x1={x + 4} y1={y + 7} x2={x + w - 4} y2={y + 7} stroke={color} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
          <line x1={x + 4} y1={y + 12} x2={x + w - 8} y2={y + 12} stroke={color} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
          <line x1={x + 4} y1={y + 17} x2={x + w - 6} y2={y + 17} stroke={color} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
          <line x1={x + 4} y1={y + 22} x2={x + w - 10} y2={y + 22} stroke={color} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
        </>
      )}
      {children}
    </g>
  );
}

// ══════════════════════════════════════════════════════════════
//  COUNT TOOLS (amber accent)
// ══════════════════════════════════════════════════════════════

const WordCounterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.amber} lightColor={C.amberLight}>
      <line x1="10" y1="11" x2="30" y2="11" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="10" y1="16" x2="26" y2="16" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="10" y1="21" x2="28" y2="21" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
    {/* Counter badge */}
    <circle cx="36" cy="36" r="10" fill={C.amber} />
    <text x="36" y="40" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="system-ui,sans-serif" fill="white">42</text>
  </svg>
);

const CharacterCounterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.amber} lightColor={C.amberLight}>
      <line x1="10" y1="11" x2="30" y2="11" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="10" y1="16" x2="26" y2="16" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
    {/* "Abc" text */}
    <text x="30" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.amber}>Abc</text>
  </svg>
);

const TextStatisticsIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc x={4} y={4} w={24} h={32} color={C.amber} lightColor={C.amberLight} />
    {/* Bar chart */}
    <rect x="32" y="26" width="5" height="10" rx="1" fill={C.amber} opacity="0.4" />
    <rect x="38" y="20" width="5" height="16" rx="1" fill={C.amber} opacity="0.6" />
    <rect x="32" y="14" width="5" height="5" rx="1" fill={C.amber} opacity="0.3" />
    <rect x="38" y="10" width="5" height="10" rx="1" fill={C.amber} opacity="0.5" />
  </svg>
);

const KeywordDensityIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.amber} lightColor={C.amberLight}>
      <line x1="10" y1="11" x2="30" y2="11" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      {/* Highlighted keyword */}
      <rect x="10" y="14" width="12" height="5" rx="1" fill={C.amber} opacity="0.3" />
      <line x1="24" y1="16" x2="30" y2="16" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="10" y1="22" x2="18" y2="22" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <rect x="20" y="19.5" width="12" height="5" rx="1" fill={C.amber} opacity="0.3" />
    </TextDoc>
    {/* Target */}
    <circle cx="38" cy="38" r="7" fill="none" stroke={C.amber} strokeWidth="2" />
    <circle cx="38" cy="38" r="3" fill={C.amber} />
  </svg>
);

const FindDuplicatesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Two overlapping documents */}
    <rect x="8" y="6" width="24" height="30" rx="3" fill={C.amberLight} stroke={C.amber} strokeWidth="1.5" />
    <rect x="16" y="12" width="24" height="30" rx="3" fill={C.amberLight} stroke={C.amber} strokeWidth="1.5" />
    <line x1="20" y1="20" x2="36" y2="20" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <line x1="20" y1="25" x2="34" y2="25" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <line x1="20" y1="30" x2="36" y2="30" stroke={C.amber} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  TRANSFORM TOOLS (blue accent)
// ══════════════════════════════════════════════════════════════

const CaseConverterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.blueLight} stroke={C.blue} strokeWidth="1.5" />
    <text x="14" y="27" fontSize="16" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.blue} opacity="0.6">a</text>
    <text x="28" y="27" fontSize="16" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.blue}>A</text>
    {/* Arrow between */}
    <path d="M22,20 l4,0" stroke={C.blue} strokeWidth="2" strokeLinecap="round" />
    <path d="M24,17 l2,3 -2,3" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReverseTextIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.blue} lightColor={C.blueLight}>
      <line x1="10" y1="14" x2="30" y2="14" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="10" y1="20" x2="26" y2="20" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
    {/* Reverse arrow */}
    <path d="M14,32 l20,0" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18,28 l-4,4 4,4" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TextRepeaterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.blue} lightColor={C.blueLight}>
      <text x="20" y="18" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.blue} opacity="0.5">abc</text>
      <text x="20" y="26" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.blue} opacity="0.5">abc</text>
      <text x="20" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.blue} opacity="0.5">abc</text>
    </TextDoc>
    {/* x3 badge */}
    <circle cx="38" cy="10" r="8" fill={C.blue} />
    <text x="38" y="14" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="system-ui,sans-serif" fill="white">x3</text>
  </svg>
);

const TextSortIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.blue} lightColor={C.blueLight}>
      <line x1="14" y1="12" x2="30" y2="12" stroke={C.blue} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="14" y1="18" x2="27" y2="18" stroke={C.blue} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="14" y1="24" x2="24" y2="24" stroke={C.blue} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <line x1="14" y1="30" x2="20" y2="30" stroke={C.blue} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
    </TextDoc>
    {/* Sort arrow */}
    <path d="M38,10 v28" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M34,34 l4,4 4,-4" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RemoveDuplicatesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.blue} lightColor={C.blueLight}>
      <line x1="10" y1="12" x2="28" y2="12" stroke={C.blue} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <line x1="10" y1="18" x2="28" y2="18" stroke={C.blue} strokeWidth="1.2" opacity="0.15" strokeLinecap="round" strokeDasharray="2,2" />
      <line x1="10" y1="24" x2="26" y2="24" stroke={C.blue} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <line x1="10" y1="30" x2="26" y2="30" stroke={C.blue} strokeWidth="1.2" opacity="0.15" strokeLinecap="round" strokeDasharray="2,2" />
    </TextDoc>
    {/* X mark */}
    <circle cx="38" cy="36" r="8" fill={C.blue} />
    <path d="M34,32 l8,8 M42,32 l-8,8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const AddLineNumbersIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.blue} lightColor={C.blueLight}>
      <text x="12" y="15" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.blue} opacity="0.6">1</text>
      <line x1="18" y1="12" x2="30" y2="12" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <text x="12" y="22" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.blue} opacity="0.6">2</text>
      <line x1="18" y1="19" x2="28" y2="19" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <text x="12" y="29" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.blue} opacity="0.6">3</text>
      <line x1="18" y1="26" x2="30" y2="26" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
  </svg>
);

const AddPrefixSuffixIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.blue} lightColor={C.blueLight}>
      <rect x="9" y="10" width="4" height="5" rx="1" fill={C.blue} opacity="0.4" />
      <line x1="15" y1="12" x2="30" y2="12" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <rect x="9" y="18" width="4" height="5" rx="1" fill={C.blue} opacity="0.4" />
      <line x1="15" y1="20" x2="28" y2="20" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <rect x="9" y="26" width="4" height="5" rx="1" fill={C.blue} opacity="0.4" />
      <line x1="15" y1="28" x2="30" y2="28" stroke={C.blue} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
  </svg>
);

const JoinTextIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Multiple lines merging into one */}
    <line x1="8" y1="10" x2="22" y2="10" stroke={C.blue} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    <line x1="8" y1="18" x2="20" y2="18" stroke={C.blue} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    <line x1="8" y1="26" x2="24" y2="26" stroke={C.blue} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    {/* Merge arrows */}
    <path d="M24,10 L32,24" stroke={C.blue} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    <path d="M22,18 L32,24" stroke={C.blue} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    <path d="M26,26 L32,24" stroke={C.blue} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    {/* Result line */}
    <rect x="30" y="20" width="14" height="8" rx="2" fill={C.blueLight} stroke={C.blue} strokeWidth="1.5" />
    <line x1="33" y1="24" x2="41" y2="24" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SplitTextIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Single line splitting into many */}
    <rect x="4" y="18" width="14" height="8" rx="2" fill={C.blueLight} stroke={C.blue} strokeWidth="1.5" />
    <line x1="7" y1="22" x2="15" y2="22" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" />
    {/* Split arrows */}
    <path d="M18,22 L26,10" stroke={C.blue} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    <path d="M18,22 L26,22" stroke={C.blue} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    <path d="M18,22 L26,34" stroke={C.blue} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    {/* Result lines */}
    <line x1="28" y1="10" x2="42" y2="10" stroke={C.blue} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    <line x1="28" y1="22" x2="40" y2="22" stroke={C.blue} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    <line x1="28" y1="34" x2="42" y2="34" stroke={C.blue} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  CLEAN TOOLS (emerald accent)
// ══════════════════════════════════════════════════════════════

const RemoveLineBreaksIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.emerald} lightColor={C.emeraldLight}>
      <line x1="10" y1="12" x2="30" y2="12" stroke={C.emerald} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="10" y1="18" x2="26" y2="18" stroke={C.emerald} strokeWidth="1.2" opacity="0.15" strokeLinecap="round" strokeDasharray="2,2" />
      <line x1="10" y1="24" x2="28" y2="24" stroke={C.emerald} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
    {/* Wrap arrow removed */}
    <path d="M32,30 l8,0 0,-6" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <path d="M38,26 l2,-2" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" />
    <path d="M42,26 l-2,-2" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RemoveExtraSpacesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.emerald} lightColor={C.emeraldLight}>
      {/* Words with big gaps */}
      <line x1="10" y1="14" x2="16" y2="14" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="24" y1="14" x2="30" y2="14" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Arrow showing compression */}
      <path d="M18,20 h4 M22,18 l2,2 -2,2" stroke={C.emerald} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      {/* Result: words close */}
      <line x1="10" y1="28" x2="16" y2="28" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="18" y1="28" x2="24" y2="28" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    </TextDoc>
  </svg>
);

const RemoveEmptyLinesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.emerald} lightColor={C.emeraldLight}>
      <line x1="10" y1="11" x2="30" y2="11" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Empty line (dashed) */}
      <line x1="10" y1="17" x2="30" y2="17" stroke={C.emerald} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" strokeDasharray="2,2" />
      <line x1="10" y1="23" x2="28" y2="23" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="10" y1="29" x2="30" y2="29" stroke={C.emerald} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" strokeDasharray="2,2" />
      <line x1="10" y1="35" x2="26" y2="35" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    </TextDoc>
  </svg>
);

const RemoveSpecialCharsIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.emerald} lightColor={C.emeraldLight}>
      <text x="20" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.emerald} opacity="0.3">@#$</text>
    </TextDoc>
    {/* Eraser */}
    <path d="M30,32 l12,12 M42,32 l-12,12" stroke={C.emerald} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const RemoveEmojisIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.emerald} lightColor={C.emeraldLight}>
      <line x1="10" y1="12" x2="30" y2="12" stroke={C.emerald} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="10" y1="18" x2="26" y2="18" stroke={C.emerald} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
    {/* Emoji face with X */}
    <circle cx="36" cy="34" r="9" fill={C.emeraldLight} stroke={C.emerald} strokeWidth="1.5" />
    <circle cx="33" cy="32" r="1.5" fill={C.emerald} opacity="0.5" />
    <circle cx="39" cy="32" r="1.5" fill={C.emerald} opacity="0.5" />
    <path d="M33,37 q3,2 6,0" stroke={C.emerald} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
    {/* X over it */}
    <path d="M30,28 l12,12 M42,28 l-12,12" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const RemoveHtmlTagsIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.emerald} lightColor={C.emeraldLight}>
      <text x="20" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.emerald} opacity="0.4">&lt;/&gt;</text>
    </TextDoc>
    {/* X mark */}
    <circle cx="38" cy="36" r="8" fill={C.emerald} />
    <path d="M34,32 l8,8 M42,32 l-8,8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const RemoveAccentsIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.emeraldLight} stroke={C.emerald} strokeWidth="1.5" />
    <text x="14" y="28" fontSize="18" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.emerald} opacity="0.4">e</text>
    <text x="8" y="14" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif" fill={C.emerald} opacity="0.3">&apos;</text>
    <path d="M22,20 l4,0" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" />
    <path d="M24,17 l2,3 -2,3" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="32" y="28" fontSize="18" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.emerald}>e</text>
  </svg>
);

const TrimTextIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.emerald} lightColor={C.emeraldLight}>
      {/* Whitespace indicators */}
      <rect x="8" y="11" width="4" height="4" rx="0.5" fill={C.emerald} opacity="0.15" />
      <line x1="14" y1="13" x2="28" y2="13" stroke={C.emerald} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <rect x="30" y="11" width="4" height="4" rx="0.5" fill={C.emerald} opacity="0.15" />
      {/* Scissors */}
      <path d="M8,30 l6,4 -6,4" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M34,30 l-6,4 6,4" stroke={C.emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </TextDoc>
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  FIND TOOLS (purple accent)
// ══════════════════════════════════════════════════════════════

const FindAndReplaceIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.purple} lightColor={C.purpleLight}>
      <line x1="10" y1="12" x2="18" y2="12" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      {/* Highlighted match */}
      <rect x="19" y="9.5" width="10" height="5" rx="1" fill={C.purple} opacity="0.25" />
      <line x1="10" y1="20" x2="30" y2="20" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    </TextDoc>
    {/* Magnifying glass */}
    <circle cx="36" cy="34" r="7" fill="none" stroke={C.purple} strokeWidth="2.5" />
    <line x1="41" y1="39" x2="44" y2="42" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const TextDiffIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Left document */}
    <rect x="3" y="6" width="18" height="28" rx="2.5" fill={C.purpleLight} stroke={C.purple} strokeWidth="1.5" />
    <line x1="7" y1="12" x2="17" y2="12" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <rect x="6" y="15.5" width="12" height="4" rx="1" fill="#EF4444" opacity="0.25" />
    <line x1="7" y1="24" x2="15" y2="24" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    {/* Right document */}
    <rect x="27" y="6" width="18" height="28" rx="2.5" fill={C.purpleLight} stroke={C.purple} strokeWidth="1.5" />
    <line x1="31" y1="12" x2="41" y2="12" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <rect x="30" y="15.5" width="12" height="4" rx="1" fill="#22C55E" opacity="0.25" />
    <line x1="31" y1="24" x2="39" y2="24" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    {/* Diff arrows */}
    <path d="M22,18 l3,0" stroke={C.purple} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M23,16 l2,2 -2,2" stroke={C.purple} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

const RegexTesterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.purpleLight} stroke={C.purple} strokeWidth="1.5" />
    <text x="24" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="monospace" fill={C.purple} opacity="0.7">.*</text>
    {/* Slash delimiters */}
    <text x="8" y="28" fontSize="16" fontWeight="300" fontFamily="monospace" fill={C.purple} opacity="0.4">/</text>
    <text x="36" y="28" fontSize="16" fontWeight="300" fontFamily="monospace" fill={C.purple} opacity="0.4">/</text>
  </svg>
);

const EmailExtractorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc x={4} y={4} w={24} h={32} color={C.purple} lightColor={C.purpleLight} />
    {/* Email envelope */}
    <rect x="30" y="24" width="16" height="12" rx="2" fill={C.purpleLight} stroke={C.purple} strokeWidth="1.5" />
    <path d="M30,24 l8,6 8,-6" fill="none" stroke={C.purple} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Arrow from doc to envelope */}
    <path d="M26,20 l6,8" stroke={C.purple} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const UrlExtractorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc x={4} y={4} w={24} h={32} color={C.purple} lightColor={C.purpleLight} />
    {/* Link chain */}
    <rect x="30" y="26" width="12" height="6" rx="3" fill="none" stroke={C.purple} strokeWidth="2" />
    <rect x="36" y="32" width="12" height="6" rx="3" fill="none" stroke={C.purple} strokeWidth="2" />
    <line x1="38" y1="32" x2="38" y2="26" stroke={C.purple} strokeWidth="2" opacity="0.4" />
  </svg>
);

const NumberExtractorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc x={4} y={4} w={24} h={32} color={C.purple} lightColor={C.purpleLight} />
    {/* Numbers */}
    <text x="40" y="30" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.purple} opacity="0.6">123</text>
  </svg>
);

const FilterLinesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Funnel */}
    <path d="M6,8 h36 l-12,16 v10 l-12,6 v-16Z" fill={C.purpleLight} stroke={C.purple} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Lines going in */}
    <line x1="12" y1="14" x2="36" y2="14" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <line x1="16" y1="19" x2="32" y2="19" stroke={C.purple} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    {/* Filtered line out */}
    <line x1="20" y1="24" x2="28" y2="24" stroke={C.purple} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  ENCODE TOOLS (cyan accent)
// ══════════════════════════════════════════════════════════════

const Base64Icon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.7">ABC</text>
    <path d="M16,26 l16,0" stroke={C.cyan} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <text x="24" y="36" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.5">QUJD</text>
  </svg>
);

const UrlEncodeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.7">&amp;</text>
    <path d="M16,26 l16,0" stroke={C.cyan} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <text x="24" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.5">%26</text>
  </svg>
);

const HtmlEncodeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.7">&lt;&gt;</text>
    <path d="M16,26 l16,0" stroke={C.cyan} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <text x="24" y="36" textAnchor="middle" fontSize="6" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.5">&amp;lt;&amp;gt;</text>
  </svg>
);

const UnicodeEscapeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.7">U+</text>
  </svg>
);

const MorseCodeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    {/* Morse dots and dashes */}
    <circle cx="12" cy="20" r="2.5" fill={C.cyan} opacity="0.6" />
    <rect x="18" y="18" width="8" height="4" rx="2" fill={C.cyan} opacity="0.6" />
    <circle cx="32" cy="20" r="2.5" fill={C.cyan} opacity="0.6" />
    <rect x="10" y="28" width="8" height="4" rx="2" fill={C.cyan} opacity="0.6" />
    <circle cx="24" cy="30" r="2.5" fill={C.cyan} opacity="0.6" />
    <circle cx="32" cy="30" r="2.5" fill={C.cyan} opacity="0.6" />
  </svg>
);

const BinaryConverterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.7">01</text>
    <text x="24" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.5">10</text>
  </svg>
);

const HexConverterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.7">0x</text>
    <text x="24" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill={C.cyan} opacity="0.5">FF</text>
  </svg>
);

const Rot13Icon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.cyanLight} stroke={C.cyan} strokeWidth="1.5" />
    <text x="14" y="27" fontSize="14" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.cyan} opacity="0.5">A</text>
    {/* Rotation arrow */}
    <path d="M22,18 a6,6 0 1,1 0,10" fill="none" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M21,26 l1,3 2.5,-1.5" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <text x="32" y="27" fontSize="14" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.cyan}>N</text>
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  GENERATE TOOLS (rose accent)
// ══════════════════════════════════════════════════════════════

const LoremIpsumIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <TextDoc color={C.rose} lightColor={C.roseLight}>
      <line x1="10" y1="11" x2="30" y2="11" stroke={C.rose} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
      <line x1="10" y1="16" x2="28" y2="16" stroke={C.rose} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
      <line x1="10" y1="21" x2="30" y2="21" stroke={C.rose} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
      <line x1="10" y1="26" x2="24" y2="26" stroke={C.rose} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
      <line x1="10" y1="31" x2="28" y2="31" stroke={C.rose} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
    </TextDoc>
    {/* Quill pen */}
    <path d="M36,8 l6,20 -3,-2 -3,2Z" fill={C.rose} opacity="0.5" />
  </svg>
);

const SlugGeneratorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="14" width="40" height="20" rx="4" fill={C.roseLight} stroke={C.rose} strokeWidth="1.5" />
    <text x="24" y="28" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="monospace" fill={C.rose} opacity="0.7">my-slug</text>
  </svg>
);

const PasswordGeneratorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="10" width="40" height="28" rx="4" fill={C.roseLight} stroke={C.rose} strokeWidth="1.5" />
    {/* Key */}
    <circle cx="16" cy="24" r="6" fill="none" stroke={C.rose} strokeWidth="2" opacity="0.6" />
    <line x1="22" y1="24" x2="38" y2="24" stroke={C.rose} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="34" y1="24" x2="34" y2="20" stroke={C.rose} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="38" y1="24" x2="38" y2="20" stroke={C.rose} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const RandomStringIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="10" width="40" height="28" rx="4" fill={C.roseLight} stroke={C.rose} strokeWidth="1.5" />
    <text x="24" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill={C.rose} opacity="0.6">x7Kp</text>
    {/* Dice dot pattern */}
    <circle cx="10" cy="38" r="1.5" fill={C.rose} opacity="0.3" />
    <circle cx="38" cy="38" r="1.5" fill={C.rose} opacity="0.3" />
    <circle cx="24" cy="38" r="1.5" fill={C.rose} opacity="0.3" />
  </svg>
);

const UuidGeneratorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="12" width="40" height="24" rx="4" fill={C.roseLight} stroke={C.rose} strokeWidth="1.5" />
    {/* UUID-like format with dashes */}
    <text x="24" y="27" textAnchor="middle" fontSize="6" fontWeight="700" fontFamily="monospace" fill={C.rose} opacity="0.6">xxxx-xx-xxxx</text>
    {/* Fingerprint circle */}
    <circle cx="24" cy="8" r="5" fill={C.rose} opacity="0.3" />
    <circle cx="24" cy="8" r="2.5" fill="none" stroke={C.rose} strokeWidth="1" opacity="0.5" />
  </svg>
);

const HashGeneratorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.roseLight} stroke={C.rose} strokeWidth="1.5" />
    {/* Hash # symbol */}
    <text x="24" y="28" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="system-ui,sans-serif" fill={C.rose} opacity="0.5">#</text>
    {/* Lock indicator */}
    <circle cx="38" cy="12" r="5" fill={C.rose} opacity="0.3" />
    <rect x="35.5" y="11" width="5" height="4" rx="1" fill={C.rose} opacity="0.5" />
  </svg>
);

const JsonFormatterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <rect x="4" y="6" width="40" height="36" rx="4" fill={C.roseLight} stroke={C.rose} strokeWidth="1.5" />
    {/* JSON braces */}
    <text x="12" y="30" fontSize="22" fontWeight="300" fontFamily="monospace" fill={C.rose} opacity="0.5">{"{"}</text>
    <text x="32" y="30" fontSize="22" fontWeight="300" fontFamily="monospace" fill={C.rose} opacity="0.5">{"}"}</text>
    {/* Indented content */}
    <line x1="20" y1="20" x2="30" y2="20" stroke={C.rose} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    <line x1="20" y1="26" x2="28" y2="26" stroke={C.rose} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  EXPORTS
// ══════════════════════════════════════════════════════════════

export const toolIconMap: Record<string, FC<IconProps>> = {
  // Count
  "word-counter": WordCounterIcon,
  "character-counter": CharacterCounterIcon,
  "text-statistics": TextStatisticsIcon,
  "keyword-density": KeywordDensityIcon,
  "find-duplicates": FindDuplicatesIcon,
  // Transform
  "case-converter": CaseConverterIcon,
  "reverse-text": ReverseTextIcon,
  "text-repeater": TextRepeaterIcon,
  "text-sort": TextSortIcon,
  "remove-duplicates": RemoveDuplicatesIcon,
  "add-line-numbers": AddLineNumbersIcon,
  "add-prefix-suffix": AddPrefixSuffixIcon,
  "join-text": JoinTextIcon,
  "split-text": SplitTextIcon,
  // Clean
  "remove-line-breaks": RemoveLineBreaksIcon,
  "remove-extra-spaces": RemoveExtraSpacesIcon,
  "remove-empty-lines": RemoveEmptyLinesIcon,
  "remove-special-characters": RemoveSpecialCharsIcon,
  "remove-emojis": RemoveEmojisIcon,
  "remove-html-tags": RemoveHtmlTagsIcon,
  "remove-accents": RemoveAccentsIcon,
  "trim-text": TrimTextIcon,
  // Find
  "find-and-replace": FindAndReplaceIcon,
  "text-diff": TextDiffIcon,
  "regex-tester": RegexTesterIcon,
  "email-extractor": EmailExtractorIcon,
  "url-extractor": UrlExtractorIcon,
  "number-extractor": NumberExtractorIcon,
  "filter-lines": FilterLinesIcon,
  // Encode
  "base64": Base64Icon,
  "url-encode": UrlEncodeIcon,
  "html-encode": HtmlEncodeIcon,
  "unicode-escape": UnicodeEscapeIcon,
  "morse-code": MorseCodeIcon,
  "binary-converter": BinaryConverterIcon,
  "hex-converter": HexConverterIcon,
  "rot13": Rot13Icon,
  // Generate
  "lorem-ipsum": LoremIpsumIcon,
  "slug-generator": SlugGeneratorIcon,
  "password-generator": PasswordGeneratorIcon,
  "random-string": RandomStringIcon,
  "uuid-generator": UuidGeneratorIcon,
  "hash-generator": HashGeneratorIcon,
  "json-formatter": JsonFormatterIcon,
};

export const categoryIconMap: Record<string, FC<IconProps>> = {
  count: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="system-ui,sans-serif" fill="currentColor">42</text>
    </svg>
  ),
  transform: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4,8 h7 l-3,-3 M11,8 l-3,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20,16 h-7 l3,-3 M13,16 l3,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clean: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4,4 l16,16 M20,4 l-16,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M12,2 l1.5,4.5 L18,8 l-4.5,1.5 L12,14 l-1.5,-4.5 L6,8 l4.5,-1.5Z" fill="currentColor" />
    </svg>
  ),
  find: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="16" y1="16" x2="22" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  encode: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily="monospace" fill="currentColor">01</text>
    </svg>
  ),
  generate: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M13,2 l-2,8 h6 l-4,12 1,-8 h-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
};

export function getToolIcon(slug: string): FC<IconProps> | undefined {
  return toolIconMap[slug];
}

export function getCategoryIcon(category: string): FC<IconProps> | undefined {
  return categoryIconMap[category];
}
