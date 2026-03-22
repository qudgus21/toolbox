import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

// ── Color palette ──────────────────────────────────────────────
const C = {
  pdf:   { fill: "#EF4444", light: "#FEE2E2" },
  word:  { fill: "#3B82F6", light: "#DBEAFE" },
  excel: { fill: "#22C55E", light: "#DCFCE7" },
  ppt:   { fill: "#F97316", light: "#FFEDD5" },
  image: { fill: "#06B6D4", light: "#CFFAFE" },
  png:   { fill: "#8B5CF6", light: "#EDE9FE" },
  html:  { fill: "#A855F7", light: "#F3E8FF" },
  text:  { fill: "#6B7280", light: "#F3F4F6" },
  pdfa:  { fill: "#DC2626", light: "#FEE2E2" },
  webp:  { fill: "#4CAF50", light: "#E8F5E9" },
  tiff:  { fill: "#795548", light: "#EFEBE9" },
  heic:  { fill: "#007AFF", light: "#E3F2FD" },
  // Category accent colors
  amber:  "#F59E0B",
  purple: "#8B5CF6",
  green:  "#22C55E",
  zinc:   "#6B7280",
} as const;

// ── Base document shape ─────────────────────────────────────────
function Doc({
  x = 0, y = 0, w = 20, h = 26,
  color, foldSize = 5, letter,
}: {
  x?: number; y?: number; w?: number; h?: number;
  color: { fill: string; light: string };
  foldSize?: number;
  letter?: string;
}) {
  const fs = foldSize;
  return (
    <g>
      <path
        d={`M${x + 2},${y} H${x + w - fs} L${x + w},${y + fs} V${y + h - 2} Q${x + w},${y + h} ${x + w - 2},${y + h} H${x + 2} Q${x},${y + h} ${x},${y + h - 2} V${y + 2} Q${x},${y} ${x + 2},${y}Z`}
        fill={color.light}
        stroke={color.fill}
        strokeWidth="1.5"
      />
      <path
        d={`M${x + w - fs},${y} V${y + fs} H${x + w}`}
        fill={color.fill}
        opacity="0.3"
      />
      <path
        d={`M${x + w - fs},${y} V${y + fs} H${x + w}`}
        fill="none"
        stroke={color.fill}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {letter ? (
        <text
          x={x + w / 2}
          y={y + h * 0.62}
          textAnchor="middle"
          fontSize={h * 0.38}
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          fill={color.fill}
          opacity="0.55"
        >
          {letter}
        </text>
      ) : (
        <>
          <line x1={x + 4} y1={y + fs + 4} x2={x + w - 4} y2={y + fs + 4} stroke={color.fill} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
          <line x1={x + 4} y1={y + fs + 7.5} x2={x + w - 7} y2={y + fs + 7.5} stroke={color.fill} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
          <line x1={x + 4} y1={y + fs + 11} x2={x + w - 5} y2={y + fs + 11} stroke={color.fill} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

// ── Image frame (for image formats) ───────────────────────────
function ImageFrame({
  x = 0, y = 0, w = 20, h = 26,
  color, letter,
}: {
  x?: number; y?: number; w?: number; h?: number;
  color: { fill: string; light: string };
  letter?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={color.light} stroke={color.fill} strokeWidth="1.5" />
      {letter ? (
        <text
          x={x + w / 2}
          y={y + h * 0.62}
          textAnchor="middle"
          fontSize={h * 0.38}
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          fill={color.fill}
          opacity="0.55"
        >
          {letter}
        </text>
      ) : (
        <>
          <circle cx={x + 6} cy={y + 8} r="2.5" fill={color.fill} opacity="0.45" />
          <path d={`M${x + 2},${y + h - 4} l${w * 0.3},-${h * 0.25} ${w * 0.2},${h * 0.15} ${w * 0.15},-${h * 0.1} ${w * 0.2},${h * 0.2} H${x + 2}Z`} fill={color.fill} opacity="0.3" />
        </>
      )}
    </g>
  );
}

// ── Conversion arrow ───────────────────────────────────────────
function ConvertArrow({ x = 22, y = 17 }: { x?: number; y?: number }) {
  return (
    <path
      d={`M${x},${y} h8 l-3,-3 M${x + 8},${y} l-3,3`}
      fill="none"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

// ══════════════════════════════════════════════════════════════
//  ORGANIZE TOOLS — standalone action icons (no PDF base)
// ══════════════════════════════════════════════════════════════

const MergeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Two pages converging into one */}
    <rect x="3" y="4" width="16" height="20" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <line x1="7" y1="9" x2="15" y2="9" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="7" y1="12" x2="13" y2="12" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="7" y1="15" x2="15" y2="15" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />

    <rect x="3" y="26" width="16" height="20" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <line x1="7" y1="31" x2="15" y2="31" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="7" y1="34" x2="13" y2="34" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="7" y1="37" x2="15" y2="37" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />

    {/* Converging arrows */}
    <path d="M21,14 L28,24" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M21,36 L28,26" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M26,22 l3,2.5 -3,2.5" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Result page */}
    <rect x="30" y="7" width="16" height="34" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.8" />
    <line x1="34" y1="13" x2="42" y2="13" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="34" y1="16.5" x2="40" y2="16.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="34" y1="20" x2="42" y2="20" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="34" y1="26" x2="42" y2="26" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="34" y1="29.5" x2="40" y2="29.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="34" y1="33" x2="42" y2="33" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
  </svg>
);

const SplitIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Source page */}
    <rect x="2" y="7" width="16" height="34" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.8" />
    <line x1="6" y1="13" x2="14" y2="13" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="6" y1="16.5" x2="12" y2="16.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="6" y1="20" x2="14" y2="20" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    {/* Dashed cut line */}
    <line x1="4" y1="25" x2="16" y2="25" stroke={C.amber} strokeWidth="1.5" strokeDasharray="2,2" opacity="0.6" />
    <line x1="6" y1="29" x2="14" y2="29" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="6" y1="32.5" x2="12" y2="32.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />

    {/* Diverging arrows */}
    <path d="M20,24 L27,14" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M20,26 L27,36" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M25,12 l3,1.5 -1,3" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25,38 l3,-1.5 -1,-3" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Result: two pages */}
    <rect x="29" y="2" width="16" height="20" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <line x1="33" y1="8" x2="41" y2="8" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="33" y1="11.5" x2="39" y2="11.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="33" y1="15" x2="41" y2="15" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />

    <rect x="29" y="26" width="16" height="20" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <line x1="33" y1="32" x2="41" y2="32" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="33" y1="35.5" x2="39" y2="35.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="33" y1="39" x2="41" y2="39" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
  </svg>
);

const CompressIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Large page shrinking to small */}
    <rect x="4" y="4" width="22" height="30" rx="3" fill="#DCFCE7" stroke={C.green} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
    {/* Inward arrows */}
    <path d="M8,8 l5,5 M8,8 h4 M8,8 v4" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22,30 l-5,-5 M22,30 h-4 M22,30 v-4" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Compressed result */}
    <rect x="28" y="10" width="16" height="22" rx="3" fill="#DCFCE7" stroke={C.green} strokeWidth="1.8" />
    <line x1="32" y1="16" x2="40" y2="16" stroke={C.green} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="32" y1="19.5" x2="38" y2="19.5" stroke={C.green} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="32" y1="23" x2="40" y2="23" stroke={C.green} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    {/* Arrow between */}
    <path d="M25,20 l4,0" stroke={C.green} strokeWidth="2" strokeLinecap="round" />
    <path d="M27.5,17.5 l2.5,2.5 -2.5,2.5" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeletePagesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Page stack */}
    <rect x="8" y="2" width="20" height="28" rx="2.5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" opacity="0.4" />
    <rect x="11" y="5" width="20" height="28" rx="2.5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" opacity="0.7" />
    <rect x="14" y="8" width="20" height="28" rx="2.5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
    <line x1="18" y1="15" x2="30" y2="15" stroke="#EF4444" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="18" y1="19" x2="28" y2="19" stroke="#EF4444" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="18" y1="23" x2="30" y2="23" stroke="#EF4444" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    {/* X mark */}
    <circle cx="36" cy="38" r="9" fill="#EF4444" />
    <path d="M32,34 l8,8 M40,34 l-8,8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ExtractPagesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Source stack */}
    <rect x="4" y="6" width="20" height="28" rx="2.5" fill="#FEF9C3" stroke={C.amber} strokeWidth="1.5" opacity="0.4" />
    <rect x="7" y="9" width="20" height="28" rx="2.5" fill="#FEF9C3" stroke={C.amber} strokeWidth="1.5" />
    <line x1="11" y1="16" x2="23" y2="16" stroke={C.amber} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="11" y1="20" x2="21" y2="20" stroke={C.amber} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="11" y1="24" x2="23" y2="24" stroke={C.amber} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    {/* Extracted page flying out */}
    <g transform="translate(30, 4) rotate(5)">
      <rect x="0" y="0" width="16" height="22" rx="2" fill="#FEF9C3" stroke={C.amber} strokeWidth="1.5" />
      <line x1="4" y1="6" x2="12" y2="6" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="4" y1="9.5" x2="10" y2="9.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="4" y1="13" x2="12" y2="13" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </g>
    {/* Arrow */}
    <path d="M28,30 l6,-4" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M32.5,24 l2,1.5 -1,2.5" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OrganizePagesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* 3 reorderable cards */}
    <rect x="6" y="3" width="28" height="11" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <line x1="10" y1="8.5" x2="22" y2="8.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <circle cx="39" cy="6.5" r="1.2" fill="#94A3B8" />
    <circle cx="39" cy="9.5" r="1.2" fill="#94A3B8" />
    <circle cx="43" cy="6.5" r="1.2" fill="#94A3B8" />
    <circle cx="43" cy="9.5" r="1.2" fill="#94A3B8" />

    <rect x="6" y="18" width="28" height="11" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <line x1="10" y1="23.5" x2="22" y2="23.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <circle cx="39" cy="21.5" r="1.2" fill="#94A3B8" />
    <circle cx="39" cy="24.5" r="1.2" fill="#94A3B8" />
    <circle cx="43" cy="21.5" r="1.2" fill="#94A3B8" />
    <circle cx="43" cy="24.5" r="1.2" fill="#94A3B8" />

    <rect x="6" y="33" width="28" height="11" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <line x1="10" y1="38.5" x2="22" y2="38.5" stroke={C.amber} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <circle cx="39" cy="36.5" r="1.2" fill="#94A3B8" />
    <circle cx="39" cy="39.5" r="1.2" fill="#94A3B8" />
    <circle cx="43" cy="36.5" r="1.2" fill="#94A3B8" />
    <circle cx="43" cy="39.5" r="1.2" fill="#94A3B8" />
  </svg>
);

const ScanToPdfIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Camera/scanner body */}
    <rect x="4" y="10" width="24" height="28" rx="3" fill="#FEF9C3" stroke={C.amber} strokeWidth="1.5" />
    {/* Scan line sweeping */}
    <line x1="8" y1="24" x2="24" y2="24" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    {/* Corner brackets (scan target) */}
    <path d="M8,14 h4 M8,14 v4" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M24,14 h-4 M24,14 v4" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M8,34 h4 M8,34 v-4" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M24,34 h-4 M24,34 v-4" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    {/* Arrow to result */}
    <path d="M30,24 h6" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M34,21 l3,3 -3,3" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Small result doc */}
    <Doc x={38} y={14} w={8} h={12} color={C.pdf} foldSize={2} />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  CONVERT TOOLS — two docs with arrow (no text labels)
// ══════════════════════════════════════════════════════════════

function ConvertDocIcon({
  srcColor, destColor, srcType, destType, srcLetter, destLetter, ...props
}: Omit<IconProps, "from" | "to"> & {
  srcColor: { fill: string; light: string };
  destColor: { fill: string; light: string };
  srcType?: "doc" | "image";
  destType?: "doc" | "image";
  srcLetter?: string;
  destLetter?: string;
}) {
  const SrcShape = srcType === "image" ? ImageFrame : Doc;
  const DestShape = destType === "image" ? ImageFrame : Doc;
  return (
    <svg viewBox="0 0 52 36" fill="none" {...props}>
      <SrcShape x={1} y={3} w={19} h={24} color={srcColor} foldSize={4} letter={srcLetter} />
      <ConvertArrow x={21} y={15} />
      <DestShape x={32} y={3} w={19} h={24} color={destColor} foldSize={4} letter={destLetter} />
    </svg>
  );
}

const PdfToWordIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.pdf} srcLetter="P" destColor={C.word} destLetter="W" {...props} />
);
const PdfToJpgIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.pdf} srcLetter="P" destColor={C.image} destLetter="J" destType="image" {...props} />
);
const PdfToExcelIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.pdf} srcLetter="P" destColor={C.excel} destLetter="X" {...props} />
);
const PdfToPptIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.pdf} srcLetter="P" destColor={C.ppt} destLetter="S" {...props} />
);
const ExtractImagesIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* PDF source document */}
    <Doc x={2} y={6} w={20} h={28} color={C.pdf} foldSize={5} letter="P" />
    {/* Extraction arrow */}
    <path d="M24,20 l4,0" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M26.5,17.5 l2.5,2.5 -2.5,2.5" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Extracted image 1 (top) — landscape photo */}
    <rect x="30" y="4" width="15" height="11" rx="2" fill={C.image.light} stroke={C.image.fill} strokeWidth="1.5" />
    <circle cx="34" cy="8" r="2" fill={C.image.fill} opacity="0.45" />
    <path d="M31,13 l4,-4 3,2 2,-1.5 3,3.5 H31Z" fill={C.image.fill} opacity="0.3" />
    {/* Extracted image 2 (bottom) — portrait photo */}
    <rect x="30" y="18" width="15" height="11" rx="2" fill={C.image.light} stroke={C.image.fill} strokeWidth="1.5" />
    <circle cx="34.5" cy="22" r="1.8" fill={C.image.fill} opacity="0.45" />
    <path d="M31,27 l3,-3 2.5,1.5 2,-1 3.5,2.5 H31Z" fill={C.image.fill} opacity="0.3" />
    {/* Small floating image 3 (hint of more) */}
    <rect x="33" y="32" width="10" height="8" rx="1.5" fill={C.image.light} stroke={C.image.fill} strokeWidth="1" opacity="0.6" />
    <path d="M34,38 l2.5,-3 2,1.5 2.5,-1.5" stroke={C.image.fill} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
  </svg>
);

const PdfToPngIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.pdf} srcLetter="P" destColor={C.png} destLetter="G" destType="image" {...props} />
);
const PdfToTextIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.pdf} srcLetter="P" destColor={C.text} destLetter="T" {...props} />
);
const PdfToPdfaIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 52 36" fill="none" {...props}>
    <Doc x={1} y={3} w={19} h={24} color={C.pdf} foldSize={4} letter="P" />
    <ConvertArrow x={21} y={15} />
    <Doc x={32} y={3} w={19} h={24} color={C.pdfa} foldSize={4} letter="A" />
    {/* Checkmark overlay on destination */}
    <path d="M44,6 l2.5,2.5 4,-4" stroke={C.pdfa.fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WordToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.word} srcLetter="W" destColor={C.pdf} destLetter="P" {...props} />
);
const JpgToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.image} srcLetter="J" destColor={C.pdf} destLetter="P" srcType="image" {...props} />
);
const ExcelToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.excel} srcLetter="X" destColor={C.pdf} destLetter="P" {...props} />
);
const PptToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.ppt} srcLetter="S" destColor={C.pdf} destLetter="P" {...props} />
);
const HtmlToPdfIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 52 36" fill="none" {...props}>
    {/* HTML source — code brackets */}
    <rect x="1" y="3" width="19" height="24" rx="3" fill={C.html.light} stroke={C.html.fill} strokeWidth="1.5" />
    <text x="10.5" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="system-ui" fill={C.html.fill} opacity="0.55">&lt;/&gt;</text>
    <ConvertArrow x={21} y={15} />
    <Doc x={32} y={3} w={19} h={24} color={C.pdf} foldSize={4} letter="P" />
  </svg>
);
const PngToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.png} srcLetter="G" destColor={C.pdf} destLetter="P" srcType="image" {...props} />
);
const ImageToPdfIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 52 36" fill="none" {...props}>
    {/* Stacked images */}
    <ImageFrame x={4} y={1} w={15} h={11} color={C.image} />
    <ImageFrame x={1} y={5} w={19} h={22} color={C.image} letter="I" />
    <ConvertArrow x={21} y={15} />
    <Doc x={32} y={3} w={19} h={24} color={C.pdf} foldSize={4} letter="P" />
  </svg>
);
const WebpToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.webp} srcLetter="W" destColor={C.pdf} destLetter="P" srcType="image" {...props} />
);
const TiffToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.tiff} srcLetter="T" destColor={C.pdf} destLetter="P" srcType="image" {...props} />
);
const HeicToPdfIcon: FC<IconProps> = (props) => (
  <ConvertDocIcon srcColor={C.heic} srcLetter="H" destColor={C.pdf} destLetter="P" srcType="image" {...props} />
);

// ══════════════════════════════════════════════════════════════
//  EDIT TOOLS — standalone action icons
// ══════════════════════════════════════════════════════════════

const EditPdfIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Pencil writing */}
    <path d="M32,6 l8,8 -22,22 H10 v-8Z" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.8" strokeLinejoin="round" />
    <line x1="28" y1="10" x2="36" y2="18" stroke={C.purple} strokeWidth="1.5" />
    <path d="M10,36 l2,-6" stroke={C.purple} strokeWidth="1.5" strokeLinecap="round" />
    {/* Text lines being edited */}
    <line x1="14" y1="42" x2="38" y2="42" stroke={C.purple} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    <line x1="14" y1="46" x2="30" y2="46" stroke={C.purple} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const RotateIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Rotating square/page */}
    <rect x="12" y="12" width="24" height="24" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" transform="rotate(15, 24, 24)" opacity="0.4" />
    <rect x="12" y="12" width="24" height="24" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.8" />
    <line x1="16" y1="19" x2="28" y2="19" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="16" y1="23" x2="32" y2="23" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="16" y1="27" x2="26" y2="27" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    {/* Rotation arrow */}
    <path d="M40,10 a16,16 0 0,1 2,14" fill="none" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M38,8 l3,2 -1,3.5" fill="none" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PageNumbersIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Three mini pages with numbers */}
    <rect x="2" y="8" width="12" height="16" rx="2" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <text x="8" y="20" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="system-ui" fill={C.purple}>1</text>

    <rect x="18" y="8" width="12" height="16" rx="2" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <text x="24" y="20" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="system-ui" fill={C.purple}>2</text>

    <rect x="34" y="8" width="12" height="16" rx="2" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <text x="40" y="20" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="system-ui" fill={C.purple}>3</text>

    {/* Bottom numbers indicator bar */}
    <rect x="6" y="30" width="36" height="8" rx="4" fill="#EDE9FE" stroke={C.purple} strokeWidth="1" opacity="0.5" />
    <text x="24" y="36.5" textAnchor="middle" fontSize="6" fontWeight="600" fontFamily="system-ui" fill={C.purple} opacity="0.7">1 / 3</text>
  </svg>
);

const WatermarkIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Page background */}
    <rect x="6" y="4" width="36" height="40" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    {/* Content lines */}
    <line x1="12" y1="12" x2="36" y2="12" stroke={C.purple} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="32" y2="17" stroke={C.purple} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
    <line x1="12" y1="22" x2="36" y2="22" stroke={C.purple} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
    <line x1="12" y1="27" x2="30" y2="27" stroke={C.purple} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
    <line x1="12" y1="32" x2="36" y2="32" stroke={C.purple} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
    {/* Watermark text overlay */}
    <text x="24" y="28" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="system-ui" fill={C.purple} opacity="0.15" transform="rotate(-30, 24, 24)">DRAFT</text>
  </svg>
);

const CropIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Crop frame */}
    <rect x="12" y="12" width="24" height="24" rx="1" fill="#EDE9FE" opacity="0.3" />
    {/* Crop handles */}
    <path d="M8,16 h4 v28" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16,8 v4 h28" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40,16 v20 h-4" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    <path d="M16,40 h20 v-4" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    {/* Content hint inside crop area */}
    <line x1="16" y1="20" x2="32" y2="20" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="16" y1="24" x2="28" y2="24" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="16" y1="28" x2="32" y2="28" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const SignIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Signature area */}
    <rect x="4" y="10" width="40" height="28" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    {/* Signature line */}
    <line x1="10" y1="32" x2="38" y2="32" stroke={C.purple} strokeWidth="1.5" opacity="0.3" />
    <text x="10" y="31" fontSize="5" fontFamily="system-ui" fill={C.purple} opacity="0.3">✕</text>
    {/* Handwritten signature curve */}
    <path d="M14,28 q2,-8 6,-4 t4,-2 q2,-4 6,0 t5,-2 q1,-2 3,0" stroke={C.purple} strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Pen */}
    <g transform="translate(36, 8) rotate(30)">
      <rect x="-1.5" y="0" width="3" height="14" rx="1" fill={C.purple} />
      <path d="M-1.5,14 l1.5,4 1.5,-4" fill={C.purple} />
    </g>
  </svg>
);

const AnnotateIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Page with highlights */}
    <rect x="8" y="4" width="32" height="40" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <line x1="14" y1="12" x2="34" y2="12" stroke={C.purple} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
    {/* Highlighted line */}
    <rect x="14" y="16" width="20" height="4" rx="1" fill="#FBBF24" opacity="0.5" />
    <line x1="14" y1="18" x2="34" y2="18" stroke={C.purple} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
    <line x1="14" y1="24" x2="30" y2="24" stroke={C.purple} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
    {/* Another highlight */}
    <rect x="14" y="27" width="14" height="4" rx="1" fill="#FBBF24" opacity="0.35" />
    <line x1="14" y1="29" x2="28" y2="29" stroke={C.purple} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
    <line x1="14" y1="35" x2="34" y2="35" stroke={C.purple} strokeWidth="1" opacity="0.25" strokeLinecap="round" />
    {/* Comment bubble */}
    <path d="M36,6 h8 v6 l-2,-1.5 h-6Z" fill={C.purple} rx="1.5" />
    <line x1="38" y1="9" x2="42" y2="9" stroke="white" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const FlattenIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Stacked layers */}
    <path d="M8,18 l16,-10 16,10 -16,10Z" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
    <path d="M8,24 l16,-10 16,10 -16,10Z" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
    <path d="M8,30 l16,-10 16,10 -16,10Z" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.8" strokeLinejoin="round" />
    {/* Down press arrow */}
    <path d="M24,2 v8 M20,7 l4,4 4,-4" stroke={C.purple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ResizeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Small page → Large page */}
    <rect x="4" y="14" width="16" height="22" rx="2.5" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
    <rect x="22" y="4" width="24" height="34" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.8" />
    <line x1="27" y1="12" x2="41" y2="12" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="27" y1="17" x2="38" y2="17" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="27" y1="22" x2="41" y2="22" stroke={C.purple} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    {/* Resize arrows */}
    <path d="M6,40 l4,4 M10,44 h-6 v-6" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42,42 l4,4 M46,46 v-6 M46,46 h-6" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditMetadataIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Tags/labels */}
    <g transform="translate(4, 6)">
      <path d="M2,4 v16 l16,16 12,-12 -16,-16 H2 Z" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="10" cy="12" r="3" fill={C.purple} opacity="0.4" />
    </g>
    {/* Mini info lines */}
    <line x1="30" y1="10" x2="44" y2="10" stroke={C.purple} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <line x1="30" y1="15" x2="40" y2="15" stroke={C.purple} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    <line x1="30" y1="20" x2="42" y2="20" stroke={C.purple} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const PagesPerSheetIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Large sheet outline */}
    <rect x="4" y="4" width="40" height="40" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    {/* 4 mini pages inside (2x2 grid) */}
    <rect x="8" y="8" width="14" height="16" rx="1.5" fill="white" stroke={C.purple} strokeWidth="1.2" />
    <line x1="11" y1="12" x2="19" y2="12" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="11" y1="15" x2="17" y2="15" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="11" y1="18" x2="19" y2="18" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />

    <rect x="26" y="8" width="14" height="16" rx="1.5" fill="white" stroke={C.purple} strokeWidth="1.2" />
    <line x1="29" y1="12" x2="37" y2="12" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="29" y1="15" x2="35" y2="15" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="29" y1="18" x2="37" y2="18" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />

    <rect x="8" y="28" width="14" height="16" rx="1.5" fill="white" stroke={C.purple} strokeWidth="1.2" />
    <line x1="11" y1="32" x2="19" y2="32" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="11" y1="35" x2="17" y2="35" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="11" y1="38" x2="19" y2="38" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />

    <rect x="26" y="28" width="14" height="16" rx="1.5" fill="white" stroke={C.purple} strokeWidth="1.2" />
    <line x1="29" y1="32" x2="37" y2="32" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="29" y1="35" x2="35" y2="35" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="29" y1="38" x2="37" y2="38" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const HeaderFooterIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Page */}
    <rect x="8" y="4" width="32" height="40" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    {/* Header band */}
    <rect x="8" y="4" width="32" height="9" rx="3" fill="#DDD6FE" stroke={C.purple} strokeWidth="1.2" />
    <line x1="14" y1="8.5" x2="34" y2="8.5" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round" />
    {/* Body lines */}
    <line x1="14" y1="18" x2="34" y2="18" stroke={C.purple} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
    <line x1="14" y1="22" x2="30" y2="22" stroke={C.purple} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
    <line x1="14" y1="26" x2="32" y2="26" stroke={C.purple} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
    <line x1="14" y1="30" x2="28" y2="30" stroke={C.purple} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
    {/* Footer band */}
    <rect x="8" y="35" width="32" height="9" rx="3" fill="#DDD6FE" stroke={C.purple} strokeWidth="1.2" />
    <line x1="18" y1="39.5" x2="30" y2="39.5" stroke={C.purple} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const BookletIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Open book shape */}
    <path d="M24,8 C20,8 12,6 6,6 V38 C12,38 20,36 24,36" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M24,8 C28,8 36,6 42,6 V38 C36,38 28,36 24,36" fill="#F3E8FF" stroke={C.purple} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Spine */}
    <line x1="24" y1="8" x2="24" y2="36" stroke={C.purple} strokeWidth="1.5" />
    {/* Left page lines */}
    <line x1="10" y1="14" x2="20" y2="13" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="10" y1="18" x2="20" y2="17" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="10" y1="22" x2="18" y2="21" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    {/* Right page lines */}
    <line x1="28" y1="13" x2="38" y2="14" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="28" y1="17" x2="38" y2="18" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="28" y1="21" x2="36" y2="22" stroke={C.purple} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    {/* Fold arrow */}
    <path d="M18,42 Q24,39 30,42" stroke={C.purple} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M28,40.5 L30,42 L27.5,43" stroke={C.purple} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OverlayIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Back page (overlay) */}
    <rect x="10" y="6" width="28" height="36" rx="3" fill={C.word.light} stroke={C.word.fill} strokeWidth="1.2" opacity="0.6" />
    <line x1="16" y1="14" x2="32" y2="14" stroke={C.word.fill} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="16" y1="18" x2="28" y2="18" stroke={C.word.fill} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    {/* Front page (content) */}
    <rect x="6" y="8" width="28" height="36" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <line x1="12" y1="16" x2="28" y2="16" stroke={C.purple} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
    <line x1="12" y1="20" x2="26" y2="20" stroke={C.purple} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
    <line x1="12" y1="24" x2="24" y2="24" stroke={C.purple} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
    <line x1="12" y1="28" x2="27" y2="28" stroke={C.purple} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
    {/* Merge arrow */}
    <circle cx="36" cy="36" r="9" fill={C.purple} opacity="0.15" />
    <path d="M32,36 L40,36 M37,32 L40,36 L37,40" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GrayscaleIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Half-circle: color side vs gray side */}
    <circle cx="24" cy="24" r="18" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.8" />
    <path d="M24,6 A18,18 0 0,0 24,42Z" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.8" />
    {/* Palette dots on color side */}
    <circle cx="17" cy="16" r="3" fill="#EF4444" opacity="0.7" />
    <circle cx="14" cy="24" r="3" fill="#3B82F6" opacity="0.7" />
    <circle cx="17" cy="32" r="3" fill="#22C55E" opacity="0.7" />
    {/* Gray dots on gray side */}
    <circle cx="31" cy="16" r="3" fill="#9CA3AF" />
    <circle cx="34" cy="24" r="3" fill="#6B7280" />
    <circle cx="31" cy="32" r="3" fill="#D1D5DB" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  OPTIMIZE TOOLS
// ══════════════════════════════════════════════════════════════

const RepairIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Wrench */}
    <g transform="translate(24, 24) rotate(-45)">
      <rect x="-3" y="-16" width="6" height="20" rx="2" fill="#DCFCE7" stroke={C.green} strokeWidth="1.8" />
      <path d="M-5,-16 l5,-5 5,5" fill="#DCFCE7" stroke={C.green} strokeWidth="1.8" strokeLinejoin="round" />
    </g>
    {/* Damaged doc hint */}
    <rect x="4" y="4" width="14" height="18" rx="2" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" opacity="0.4" />
    <path d="M6,12 l4,3 -2,4 4,-1" stroke="#EF4444" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    {/* Fixed doc */}
    <circle cx="38" cy="38" r="8" fill="#DCFCE7" stroke={C.green} strokeWidth="1.5" />
    <path d="M34,38 l3,3 5,-5" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OcrIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Scanning frame */}
    <path d="M6,14 v-6 h6" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42,14 v-6 h-6" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6,34 v6 h6" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42,34 v6 h-6" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Scan line */}
    <line x1="8" y1="24" x2="40" y2="24" stroke={C.green} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    {/* Text being recognized — blurry to clear */}
    <line x1="12" y1="16" x2="24" y2="16" stroke={C.green} strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
    <line x1="12" y1="20" x2="28" y2="20" stroke={C.green} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
    {/* Recognized text — clear */}
    <line x1="12" y1="28" x2="30" y2="28" stroke={C.green} strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
    <line x1="12" y1="32" x2="26" y2="32" stroke={C.green} strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
    <line x1="12" y1="36" x2="22" y2="36" stroke={C.green} strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
  </svg>
);

const WebOptimizeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Speed/lightning */}
    <path d="M26,4 L16,24 h10 l-4,20 16,-24 h-10Z" fill="#DCFCE7" stroke={C.green} strokeWidth="1.8" strokeLinejoin="round" />
    {/* Speed lines */}
    <line x1="4" y1="18" x2="12" y2="18" stroke={C.green} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <line x1="6" y1="24" x2="14" y2="24" stroke={C.green} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    <line x1="4" y1="30" x2="12" y2="30" stroke={C.green} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  SECURITY TOOLS
// ══════════════════════════════════════════════════════════════

const ProtectIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Shield */}
    <path d="M24,4 L8,12 v10 c0,12 7,22 16,24 9,-2 16,-12 16,-24 V12Z" fill="#F3F4F6" stroke={C.zinc} strokeWidth="1.8" strokeLinejoin="round" />
    {/* Lock inside */}
    <rect x="18" y="24" width="12" height="9" rx="2" fill={C.zinc} />
    <path d="M21,24 v-4 a3,3 0 0,1 6,0 v4" fill="none" stroke={C.zinc} strokeWidth="2" />
    <circle cx="24" cy="28.5" r="1.5" fill="white" />
  </svg>
);

const UnlockIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Shield outline with open feel */}
    <path d="M24,4 L8,12 v10 c0,12 7,22 16,24 9,-2 16,-12 16,-24 V12Z" fill="#F3F4F6" stroke={C.zinc} strokeWidth="1.8" strokeLinejoin="round" />
    {/* Open lock */}
    <rect x="18" y="24" width="12" height="9" rx="2" fill={C.zinc} />
    <path d="M21,24 v-4 a3,3 0 0,1 6,0" fill="none" stroke={C.zinc} strokeWidth="2" />
    <circle cx="24" cy="28.5" r="1.5" fill="white" />
  </svg>
);

const RedactIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Page with redaction bars */}
    <rect x="8" y="4" width="32" height="40" rx="3" fill="#F3F4F6" stroke={C.zinc} strokeWidth="1.5" />
    <line x1="14" y1="12" x2="34" y2="12" stroke={C.zinc} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    {/* Black redaction bars */}
    <rect x="14" y="16" width="20" height="4" rx="1" fill="#1F2937" />
    <line x1="14" y1="24" x2="30" y2="24" stroke={C.zinc} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <rect x="14" y="27" width="14" height="4" rx="1" fill="#1F2937" />
    <line x1="14" y1="35" x2="34" y2="35" stroke={C.zinc} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <rect x="22" y="38" width="12" height="3" rx="1" fill="#1F2937" />
  </svg>
);

const CompareIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 40" fill="none" {...props}>
    {/* Left page */}
    <rect x="2" y="4" width="18" height="26" rx="2.5" fill="#DCFCE7" stroke={C.green} strokeWidth="1.5" />
    <line x1="6" y1="10" x2="16" y2="10" stroke={C.green} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <rect x="6" y="13" width="10" height="2.5" rx="0.5" fill={C.green} opacity="0.3" />
    <line x1="6" y1="19" x2="16" y2="19" stroke={C.green} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="6" y1="23" x2="14" y2="23" stroke={C.green} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    {/* Right page */}
    <rect x="28" y="4" width="18" height="26" rx="2.5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
    <line x1="32" y1="10" x2="42" y2="10" stroke="#EF4444" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <rect x="32" y="13" width="10" height="2.5" rx="0.5" fill="#EF4444" opacity="0.3" />
    <line x1="32" y1="19" x2="42" y2="19" stroke="#EF4444" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    <line x1="32" y1="23" x2="40" y2="23" stroke="#EF4444" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    {/* Comparison arrows/connector */}
    <path d="M21,14 h6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M21,17 h6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M21,20 h6" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    {/* Magnifier */}
    <circle cx="38" cy="36" r="6" fill="white" stroke={C.zinc} strokeWidth="2" />
    <line x1="42.5" y1="40.5" x2="46" y2="44" stroke={C.zinc} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const TranslateIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Globe */}
    <circle cx="24" cy="24" r="18" fill="#F3F4F6" stroke={C.zinc} strokeWidth="1.8" />
    <ellipse cx="24" cy="24" rx="8" ry="18" fill="none" stroke={C.zinc} strokeWidth="1" opacity="0.4" />
    <line x1="6" y1="24" x2="42" y2="24" stroke={C.zinc} strokeWidth="1" opacity="0.4" />
    <line x1="8" y1="16" x2="40" y2="16" stroke={C.zinc} strokeWidth="1" opacity="0.3" />
    <line x1="8" y1="32" x2="40" y2="32" stroke={C.zinc} strokeWidth="1" opacity="0.3" />
    {/* Language badge */}
    <circle cx="38" cy="38" r="9" fill={C.zinc} />
    <text x="38" y="36" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="white">A</text>
    <text x="38" y="44" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui" fill="white">文</text>
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  ICON MAP
// ══════════════════════════════════════════════════════════════

export const toolIconMap: Record<string, FC<IconProps>> = {
  // Organize
  "merge": MergeIcon,
  "split": SplitIcon,
  "compress": CompressIcon,
  "delete-pages": DeletePagesIcon,
  "extract-pages": ExtractPagesIcon,
  "organize-pages": OrganizePagesIcon,
  "scan-to-pdf": ScanToPdfIcon,
  // Convert — PDF to X
  "pdf-to-word": PdfToWordIcon,
  "pdf-to-jpg": PdfToJpgIcon,
  "extract-images": ExtractImagesIcon,
  "pdf-to-excel": PdfToExcelIcon,
  "pdf-to-ppt": PdfToPptIcon,
  "pdf-to-png": PdfToPngIcon,
  "pdf-to-text": PdfToTextIcon,
  "pdf-to-pdfa": PdfToPdfaIcon,
  // Convert — X to PDF
  "word-to-pdf": WordToPdfIcon,
  "jpg-to-pdf": JpgToPdfIcon,
  "excel-to-pdf": ExcelToPdfIcon,
  "ppt-to-pdf": PptToPdfIcon,
  "html-to-pdf": HtmlToPdfIcon,
  "png-to-pdf": PngToPdfIcon,
  "image-to-pdf": ImageToPdfIcon,
  "webp-to-pdf": WebpToPdfIcon,
  "tiff-to-pdf": TiffToPdfIcon,
  "heic-to-pdf": HeicToPdfIcon,
  // Edit
  "edit-pdf": EditPdfIcon,
  "rotate": RotateIcon,
  "page-numbers": PageNumbersIcon,
  "watermark": WatermarkIcon,
  "crop": CropIcon,
  "sign": SignIcon,
  "annotate": AnnotateIcon,
  "flatten": FlattenIcon,
  "resize": ResizeIcon,
  "edit-metadata": EditMetadataIcon,
  "grayscale": GrayscaleIcon,
  "pages-per-sheet": PagesPerSheetIcon,
  "header-footer": HeaderFooterIcon,
  "overlay": OverlayIcon,
  "booklet": BookletIcon,
  // Optimize
  "repair": RepairIcon,
  "ocr": OcrIcon,
  "web-optimize": WebOptimizeIcon,
  // Security
  "protect": ProtectIcon,
  "unlock": UnlockIcon,
  "redact": RedactIcon,
  "compare": CompareIcon,
  "translate": TranslateIcon,
};

// ── Category icons ─────────────────────────────────────────────
export const categoryIconMap: Record<string, FC<IconProps>> = {
  organize: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="2" width="18" height="6" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="10" width="18" height="6" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="18" width="18" height="4" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  convert: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4,8 h7 l-3,-3 M11,8 l-3,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20,16 h-7 l3,-3 M13,16 l3,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  edit: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15,3 l6,6 -12,12 H3 v-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="13" y1="5" x2="19" y2="11" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  optimize: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M13,2 l-2,8 h6 l-4,12 1,-8 h-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  security: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12,2 L4,6 v5 c0,5.55 3.84,10.74 8,12 4.16,-1.26 8,-6.45 8,-12 V6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
};

export function getToolIcon(slug: string): FC<IconProps> | undefined {
  return toolIconMap[slug];
}

export function getCategoryIcon(category: string): FC<IconProps> | undefined {
  return categoryIconMap[category];
}
