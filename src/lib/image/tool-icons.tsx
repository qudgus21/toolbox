import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

// ── Color palette ──────────────────────────────────────────────
const C = {
  // Format colors for conversion icons
  jpg:  { fill: "#F59E0B", light: "#FEF3C7" },  // amber
  png:  { fill: "#8B5CF6", light: "#EDE9FE" },  // purple
  webp: { fill: "#22C55E", light: "#DCFCE7" },  // green
  svg:  { fill: "#06B6D4", light: "#CFFAFE" },  // cyan
  gif:  { fill: "#EC4899", light: "#FCE7F3" },  // pink
  bmp:  { fill: "#6B7280", light: "#F3F4F6" },  // gray
  heic: { fill: "#007AFF", light: "#E3F2FD" },  // apple blue
  tiff: { fill: "#795548", light: "#EFEBE9" },  // brown
  psd:  { fill: "#31A8FF", light: "#E0F2FE" },  // photoshop blue
  eps:  { fill: "#FF6F00", light: "#FFF3E0" },  // eps orange
  mp4:  { fill: "#E91E63", light: "#FCE4EC" },  // video pink
  // Category accent colors
  amber:  "#F59E0B",
  blue:   "#3B82F6",
  purple: "#8B5CF6",
  teal:   "#0891B2",  // cyan-600, distinctly blue vs green
  green:  "#22C55E",
  rose:   "#F43F5E",
} as const;

// ── Image frame base component ────────────────────────────────
function ImageFrame({
  x = 0, y = 0, w = 20, h = 16,
  color, letter,
}: {
  x?: number; y?: number; w?: number; h?: number;
  color: { fill: string; light: string };
  letter?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2.5" fill={color.light} stroke={color.fill} strokeWidth="1.5" />
      {letter ? (
        <text
          x={x + w / 2}
          y={y + h * 0.65}
          textAnchor="middle"
          fontSize={h * 0.4}
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          fill={color.fill}
          opacity="0.55"
        >
          {letter}
        </text>
      ) : (
        <>
          <circle cx={x + 5} cy={y + 5} r="2" fill={color.fill} opacity="0.4" />
          <path
            d={`M${x + 2},${y + h - 3} l${w * 0.25},-${h * 0.3} ${w * 0.15},${h * 0.15} ${w * 0.15},-${h * 0.1} ${w * 0.2},${h * 0.25} H${x + 2}Z`}
            fill={color.fill}
            opacity="0.25"
          />
        </>
      )}
    </g>
  );
}

// ── Vector shape (for SVG source) ─────────────────────────────
function VectorShape({
  x = 0, y = 0, w = 20, h = 16,
  color, letter,
}: {
  x?: number; y?: number; w?: number; h?: number;
  color: { fill: string; light: string };
  letter?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2.5" fill={color.light} stroke={color.fill} strokeWidth="1.5" strokeDasharray="3,2" />
      {/* Vector anchor points */}
      <circle cx={x + 4} cy={y + 4} r="1.5" fill={color.fill} opacity="0.6" />
      <circle cx={x + w - 4} cy={y + 4} r="1.5" fill={color.fill} opacity="0.6" />
      <circle cx={x + w / 2} cy={y + h - 4} r="1.5" fill={color.fill} opacity="0.6" />
      {/* Vector path connecting them */}
      <path
        d={`M${x + 4},${y + 4} L${x + w - 4},${y + 4} L${x + w / 2},${y + h - 4} Z`}
        fill={color.fill}
        opacity="0.2"
        stroke={color.fill}
        strokeWidth="1"
      />
      {letter && (
        <text
          x={x + w / 2}
          y={y + h * 0.65}
          textAnchor="middle"
          fontSize={h * 0.35}
          fontWeight="800"
          fontFamily="system-ui, sans-serif"
          fill={color.fill}
          opacity="0.55"
        >
          {letter}
        </text>
      )}
    </g>
  );
}

// ── Conversion arrow ──────────────────────────────────────────
function ConvertArrow({ x = 22, y = 14 }: { x?: number; y?: number }) {
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

// ── Conversion helper ─────────────────────────────────────────
function ConvertImageIcon({
  srcColor, destColor, srcLetter, destLetter,
  srcType, destType,
  ...props
}: Omit<IconProps, "from" | "to"> & {
  srcColor: { fill: string; light: string };
  destColor: { fill: string; light: string };
  srcLetter?: string;
  destLetter?: string;
  srcType?: "image" | "vector";
  destType?: "image" | "vector";
}) {
  const SrcShape = srcType === "vector" ? VectorShape : ImageFrame;
  const DestShape = destType === "vector" ? VectorShape : ImageFrame;
  return (
    <svg viewBox="0 0 52 28" fill="none" {...props}>
      <SrcShape x={1} y={2} w={19} h={16} color={srcColor} letter={srcLetter} />
      <ConvertArrow x={21} y={10} />
      <DestShape x={32} y={2} w={19} h={16} color={destColor} letter={destLetter} />
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════
//  EDIT TOOLS (amber accent)
// ══════════════════════════════════════════════════════════════

const ResizeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="6" y="10" width="24" height="18" rx="3" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <circle cx="12" cy="16" r="2.5" fill={C.amber} opacity="0.4" />
    <path d="M8,25 l6,-5 4,3 3,-2 5,4 H8Z" fill={C.amber} opacity="0.25" />
    {/* Resize corner arrows (bottom-right) */}
    <path d="M34,22 l8,8 M42,24 v6 h-6" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30,18 l-4,-4 M26,18 v-4 h4" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Dashed expansion hint */}
    <rect x="6" y="10" width="36" height="24" rx="3" fill="none" stroke={C.amber} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.35" />
  </svg>
);

const CropIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Crop handles — L-shaped corners */}
    <path d="M12,6 v6 h-6" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M36,6 v6 h6" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12,42 v-6 h-6" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M36,42 v-6 h6" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Crop area */}
    <rect x="12" y="12" width="24" height="24" rx="2" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    {/* Image content inside crop */}
    <circle cx="19" cy="19" r="3" fill={C.amber} opacity="0.4" />
    <path d="M14,33 l6,-7 5,4 4,-3 5,6 H14Z" fill={C.amber} opacity="0.25" />
    {/* Outer area (dimmed) */}
    <rect x="4" y="4" width="40" height="40" rx="3" fill="none" stroke={C.amber} strokeWidth="1" strokeDasharray="3,3" opacity="0.25" />
  </svg>
);

const RotateIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="10" y="12" width="22" height="18" rx="3" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <circle cx="16" cy="18" r="2.5" fill={C.amber} opacity="0.4" />
    <path d="M12,27 l5,-5 4,3 3,-2 6,4 H12Z" fill={C.amber} opacity="0.25" />
    {/* Circular rotation arrow */}
    <path d="M38,10 A16,16 0 0,1 42,28" fill="none" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M35,7.5 l3,2.5 3.5,-1.5" stroke={C.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6,38 A16,16 0 0,1 4,20" fill="none" stroke={C.amber} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <path d="M9,40 l-3,-2 -3.5,1.5" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
  </svg>
);

const FlipIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Left image (normal) */}
    <rect x="3" y="10" width="18" height="14" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <circle cx="8" cy="15" r="2" fill={C.amber} opacity="0.4" />
    <path d="M5,22 l4,-4 3,2 3,-2 4,4 H5Z" fill={C.amber} opacity="0.3" />
    {/* Center mirror line */}
    <line x1="24" y1="6" x2="24" y2="42" stroke={C.amber} strokeWidth="1.5" strokeDasharray="3,3" opacity="0.5" />
    {/* Right image (flipped — landscape mirrored) */}
    <rect x="27" y="10" width="18" height="14" rx="2.5" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <circle cx="40" cy="15" r="2" fill={C.amber} opacity="0.4" />
    <path d="M43,22 l-4,-4 -3,2 -3,-2 -4,4 H43Z" fill={C.amber} opacity="0.3" />
    {/* Flip arrows */}
    <path d="M18,32 l-6,0" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M14.5,29.5 l-2.5,2.5 2.5,2.5" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30,32 l6,0" stroke={C.amber} strokeWidth="2" strokeLinecap="round" />
    <path d="M33.5,29.5 l2.5,2.5 -2.5,2.5" stroke={C.amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhotoEditorIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Canvas/image */}
    <rect x="4" y="8" width="26" height="20" rx="3" fill="#FEF3C7" stroke={C.amber} strokeWidth="1.5" />
    <circle cx="12" cy="15" r="3" fill={C.amber} opacity="0.4" />
    <path d="M6,25 l6,-6 5,4 4,-3 7,5 H6Z" fill={C.amber} opacity="0.25" />
    {/* Brush */}
    <g transform="translate(30, 6) rotate(35)">
      <rect x="0" y="0" width="5" height="18" rx="2.5" fill={C.amber} opacity="0.8" />
      <rect x="0.5" y="15" width="4" height="8" rx="1" fill={C.amber} />
      <path d="M1,23 l1.5,4 1.5,-4" fill={C.amber} opacity="0.7" />
    </g>
    {/* Color dots */}
    <circle cx="10" cy="40" r="3" fill="#EF4444" opacity="0.7" />
    <circle cx="18" cy="40" r="3" fill="#3B82F6" opacity="0.7" />
    <circle cx="26" cy="40" r="3" fill="#22C55E" opacity="0.7" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  CONVERT TOOLS (blue accent) — format conversions
// ══════════════════════════════════════════════════════════════

const JpgToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.jpg} srcLetter="J" destColor={C.png} destLetter="P" {...props} />
);
const PngToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.png} srcLetter="P" destColor={C.jpg} destLetter="J" {...props} />
);
const WebpToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.webp} srcLetter="W" destColor={C.jpg} destLetter="J" {...props} />
);
const WebpToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.webp} srcLetter="W" destColor={C.png} destLetter="P" {...props} />
);
const JpgToWebpIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.jpg} srcLetter="J" destColor={C.webp} destLetter="W" {...props} />
);
const PngToWebpIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.png} srcLetter="P" destColor={C.webp} destLetter="W" {...props} />
);
const SvgToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.svg} srcLetter="S" srcType="vector" destColor={C.png} destLetter="P" {...props} />
);
const SvgToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.svg} srcLetter="S" srcType="vector" destColor={C.jpg} destLetter="J" {...props} />
);
const GifToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.gif} srcLetter="G" destColor={C.jpg} destLetter="J" {...props} />
);
const BmpToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.bmp} srcLetter="B" destColor={C.jpg} destLetter="J" {...props} />
);
const BmpToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.bmp} srcLetter="B" destColor={C.png} destLetter="P" {...props} />
);
const HeicToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.heic} srcLetter="H" destColor={C.jpg} destLetter="J" {...props} />
);
const HeicToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.heic} srcLetter="H" destColor={C.png} destLetter="P" {...props} />
);
const TiffToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.tiff} srcLetter="T" destColor={C.jpg} destLetter="J" {...props} />
);
const TiffToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.tiff} srcLetter="T" destColor={C.png} destLetter="P" {...props} />
);
const PsdToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.psd} srcLetter="Ps" destColor={C.jpg} destLetter="J" {...props} />
);
const PsdToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.psd} srcLetter="Ps" destColor={C.png} destLetter="P" {...props} />
);
const EpsToJpgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.eps} srcLetter="E" destColor={C.jpg} destLetter="J" {...props} />
);
const EpsToPngIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.eps} srcLetter="E" destColor={C.png} destLetter="P" {...props} />
);
const EpsToSvgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.eps} srcLetter="E" destColor={C.svg} destLetter="S" destType="vector" {...props} />
);
const PngToSvgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.png} srcLetter="P" destColor={C.svg} destLetter="S" destType="vector" {...props} />
);
const JpgToSvgIcon: FC<IconProps> = (props) => (
  <ConvertImageIcon srcColor={C.jpg} srcLetter="J" destColor={C.svg} destLetter="S" destType="vector" {...props} />
);

const GifToMp4Icon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 52 28" fill="none" {...props}>
    <ImageFrame x={1} y={2} w={19} h={16} color={C.gif} letter="G" />
    <ConvertArrow x={21} y={10} />
    {/* Video frame with play button */}
    <rect x={32} y={2} width={19} height={16} rx="2.5" fill={C.mp4.light} stroke={C.mp4.fill} strokeWidth="1.5" />
    <path d="M39,7 l6,3.5 -6,3.5Z" fill={C.mp4.fill} opacity="0.6" />
  </svg>
);

const ImageToTextIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 52 28" fill="none" {...props}>
    {/* Source image */}
    <ImageFrame x={1} y={2} w={19} h={16} color={C.jpg} />
    <ConvertArrow x={21} y={10} />
    {/* Text output */}
    <rect x={32} y={2} width={19} height={16} rx="2.5" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5" />
    <line x1="35" y1="6" x2="48" y2="6" stroke="#6B7280" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
    <line x1="35" y1="9" x2="46" y2="9" stroke="#6B7280" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
    <line x1="35" y1="12" x2="48" y2="12" stroke="#6B7280" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
    <line x1="35" y1="15" x2="44" y2="15" stroke="#6B7280" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  EFFECTS TOOLS (purple accent)
// ══════════════════════════════════════════════════════════════

const GrayscaleIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Half-color half-gray circle */}
    <circle cx="24" cy="24" r="16" fill="#D1D5DB" stroke={C.purple} strokeWidth="1.5" />
    <path d="M24,8 A16,16 0 0,1 24,40Z" fill={C.purple} opacity="0.7" />
    {/* Dividing line */}
    <line x1="24" y1="8" x2="24" y2="40" stroke={C.purple} strokeWidth="1.5" />
    {/* Color dots on left */}
    <circle cx="18" cy="20" r="2" fill="#EF4444" opacity="0.6" />
    <circle cx="16" cy="26" r="2" fill="#3B82F6" opacity="0.6" />
    <circle cx="18" cy="32" r="1.5" fill="#22C55E" opacity="0.6" />
    {/* Gray dots on right */}
    <circle cx="30" cy="20" r="2" fill="white" opacity="0.4" />
    <circle cx="32" cy="26" r="2" fill="white" opacity="0.3" />
    <circle cx="30" cy="32" r="1.5" fill="white" opacity="0.25" />
  </svg>
);

const AddTextIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="4" y="6" width="30" height="22" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <circle cx="11" cy="13" r="2.5" fill={C.purple} opacity="0.3" />
    <path d="M6,25 l7,-6 5,4 4,-3 6,5 H6Z" fill={C.purple} opacity="0.15" />
    {/* "Aa" text overlay */}
    <rect x="24" y="24" width="20" height="18" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <text x="34" y="37" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" fill={C.purple} opacity="0.7">Aa</text>
  </svg>
);

const AddBorderIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Outer decorative frame */}
    <rect x="4" y="4" width="40" height="40" rx="4" fill="none" stroke={C.purple} strokeWidth="2.5" />
    <rect x="7" y="7" width="34" height="34" rx="2" fill="none" stroke={C.purple} strokeWidth="1" opacity="0.4" />
    {/* Inner image */}
    <rect x="10" y="10" width="28" height="28" rx="2" fill="#EDE9FE" stroke={C.purple} strokeWidth="1" />
    <circle cx="18" cy="18" r="3" fill={C.purple} opacity="0.35" />
    <path d="M12,34 l7,-7 5,4 5,-4 7,7 H12Z" fill={C.purple} opacity="0.2" />
    {/* Corner ornaments */}
    <circle cx="4" cy="4" r="2" fill={C.purple} opacity="0.5" />
    <circle cx="44" cy="4" r="2" fill={C.purple} opacity="0.5" />
    <circle cx="4" cy="44" r="2" fill={C.purple} opacity="0.5" />
    <circle cx="44" cy="44" r="2" fill={C.purple} opacity="0.5" />
  </svg>
);

const PixelateIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Grid of colored mosaic squares */}
    <rect x="4" y="4" width="10" height="10" rx="1" fill={C.purple} opacity="0.7" />
    <rect x="15" y="4" width="10" height="10" rx="1" fill="#EC4899" opacity="0.5" />
    <rect x="26" y="4" width="10" height="10" rx="1" fill={C.purple} opacity="0.4" />
    <rect x="37" y="4" width="7" height="10" rx="1" fill="#3B82F6" opacity="0.5" />

    <rect x="4" y="15" width="10" height="10" rx="1" fill="#22C55E" opacity="0.4" />
    <rect x="15" y="15" width="10" height="10" rx="1" fill={C.purple} opacity="0.6" />
    <rect x="26" y="15" width="10" height="10" rx="1" fill="#F59E0B" opacity="0.5" />
    <rect x="37" y="15" width="7" height="10" rx="1" fill={C.purple} opacity="0.35" />

    <rect x="4" y="26" width="10" height="10" rx="1" fill={C.purple} opacity="0.5" />
    <rect x="15" y="26" width="10" height="10" rx="1" fill="#EF4444" opacity="0.4" />
    <rect x="26" y="26" width="10" height="10" rx="1" fill={C.purple} opacity="0.65" />
    <rect x="37" y="26" width="7" height="10" rx="1" fill="#06B6D4" opacity="0.4" />

    <rect x="4" y="37" width="10" height="7" rx="1" fill="#3B82F6" opacity="0.35" />
    <rect x="15" y="37" width="10" height="7" rx="1" fill={C.purple} opacity="0.5" />
    <rect x="26" y="37" width="10" height="7" rx="1" fill="#EC4899" opacity="0.35" />
    <rect x="37" y="37" width="7" height="7" rx="1" fill={C.purple} opacity="0.45" />
  </svg>
);

const BlurIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="6" y="6" width="36" height="28" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    {/* Blurred horizontal lines — gradient of opacity */}
    <line x1="10" y1="12" x2="38" y2="12" stroke={C.purple} strokeWidth="3" opacity="0.35" strokeLinecap="round" />
    <line x1="10" y1="17" x2="38" y2="17" stroke={C.purple} strokeWidth="3.5" opacity="0.25" strokeLinecap="round" />
    <line x1="10" y1="22" x2="38" y2="22" stroke={C.purple} strokeWidth="4" opacity="0.15" strokeLinecap="round" />
    <line x1="10" y1="27" x2="38" y2="27" stroke={C.purple} strokeWidth="4.5" opacity="0.1" strokeLinecap="round" />
    {/* Blur indicator circles */}
    <circle cx="24" cy="42" r="3" fill={C.purple} opacity="0.15" />
    <circle cx="24" cy="42" r="5" fill="none" stroke={C.purple} strokeWidth="1" opacity="0.25" />
    <circle cx="24" cy="42" r="7" fill="none" stroke={C.purple} strokeWidth="0.5" opacity="0.15" />
  </svg>
);

const FiltersIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Three overlapping color circles */}
    <circle cx="19" cy="18" r="10" fill="#EF4444" opacity="0.35" />
    <circle cx="29" cy="18" r="10" fill="#22C55E" opacity="0.35" />
    <circle cx="24" cy="27" r="10" fill="#3B82F6" opacity="0.35" />
    {/* Slider bars */}
    <line x1="8" y1="40" x2="40" y2="40" stroke={C.purple} strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    <circle cx="20" cy="40" r="3" fill={C.purple} opacity="0.7" />
    <line x1="8" y1="45" x2="40" y2="45" stroke={C.purple} strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    <circle cx="30" cy="45" r="3" fill={C.purple} opacity="0.7" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  COMPOSE TOOLS (teal accent)
// ══════════════════════════════════════════════════════════════

const CombineIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Left image */}
    <rect x="2" y="10" width="14" height="12" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <circle cx="7" cy="14" r="1.5" fill={C.teal} opacity="0.4" />
    <path d="M4,20 l3,-3 2.5,2 2,-1.5 3,2.5 H4Z" fill={C.teal} opacity="0.25" />
    {/* Right image */}
    <rect x="2" y="26" width="14" height="12" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <circle cx="7" cy="30" r="1.5" fill={C.teal} opacity="0.4" />
    <path d="M4,36 l3,-3 2.5,2 2,-1.5 3,2.5 H4Z" fill={C.teal} opacity="0.25" />
    {/* Merging arrows */}
    <path d="M18,16 L25,24" stroke={C.teal} strokeWidth="2" strokeLinecap="round" />
    <path d="M18,32 L25,24" stroke={C.teal} strokeWidth="2" strokeLinecap="round" />
    <path d="M23,21.5 l2.5,2.5 -2.5,2.5" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Combined result */}
    <rect x="28" y="8" width="18" height="14" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <line x1="37" y1="8" x2="37" y2="22" stroke={C.teal} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
    <circle cx="33" cy="13" r="1.5" fill={C.teal} opacity="0.4" />
    <circle cx="42" cy="13" r="1.5" fill={C.teal} opacity="0.4" />
    <path d="M29,19 l2,-2 2,1.5 2,-1 2,1.5 H29Z" fill={C.teal} opacity="0.2" />
    <path d="M38,19 l2,-2 2,1.5 2,-1 2,1.5 H38Z" fill={C.teal} opacity="0.2" />
    {/* Bottom combined (vertical) */}
    <rect x="28" y="26" width="18" height="14" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <line x1="28" y1="33" x2="46" y2="33" stroke={C.teal} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
    <circle cx="33" cy="29" r="1.5" fill={C.teal} opacity="0.4" />
    <path d="M29,37 l4,-2 3,1.5 4,-1.5" stroke={C.teal} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const SplitImageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Source image */}
    <rect x="2" y="10" width="18" height="14" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <circle cx="7" cy="14" r="2" fill={C.teal} opacity="0.4" />
    <path d="M4,22 l4,-4 3,2.5 3,-2 4,3.5 H4Z" fill={C.teal} opacity="0.25" />
    {/* Dashed grid lines */}
    <line x1="11" y1="10" x2="11" y2="24" stroke={C.teal} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
    <line x1="2" y1="17" x2="20" y2="17" stroke={C.teal} strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
    {/* Arrow */}
    <path d="M22,17 l4,0" stroke={C.teal} strokeWidth="2" strokeLinecap="round" />
    <path d="M24.5,14.5 l2.5,2.5 -2.5,2.5" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Four result pieces */}
    <rect x="28" y="4" width="8" height="8" rx="1.5" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <rect x="38" y="4" width="8" height="8" rx="1.5" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <rect x="28" y="14" width="8" height="8" rx="1.5" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <rect x="38" y="14" width="8" height="8" rx="1.5" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    {/* Mini content hints in pieces */}
    <circle cx="31" cy="7" r="1" fill={C.teal} opacity="0.3" />
    <path d="M39,10 l2,-2 2,1.5 2,-1" stroke={C.teal} strokeWidth="0.6" opacity="0.3" strokeLinecap="round" />
    <path d="M29,20 l2,-2 2,1.5" stroke={C.teal} strokeWidth="0.6" opacity="0.3" strokeLinecap="round" />
    <path d="M39,20 l2,-2 2,1" stroke={C.teal} strokeWidth="0.6" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const CollageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Grid layout with different sized slots */}
    {/* Large top-left */}
    <rect x="4" y="4" width="22" height="20" rx="2.5" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <circle cx="11" cy="11" r="2.5" fill={C.teal} opacity="0.35" />
    <path d="M6,21 l5,-5 4,3 4,-3 3,5 H6Z" fill={C.teal} opacity="0.2" />
    {/* Small top-right */}
    <rect x="28" y="4" width="16" height="9" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <path d="M30,11 l3,-3 2.5,2 3,-2 3,3 H30Z" fill={C.teal} opacity="0.2" />
    {/* Medium right */}
    <rect x="28" y="15" width="16" height="9" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <circle cx="33" cy="18.5" r="1.5" fill={C.teal} opacity="0.3" />
    {/* Bottom row — three equal */}
    <rect x="4" y="26" width="12" height="18" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <path d="M6,40 l3,-4 2,2 3,-3" stroke={C.teal} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <rect x="18" y="26" width="12" height="18" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <circle cx="24" cy="32" r="2" fill={C.teal} opacity="0.3" />
    <rect x="32" y="26" width="12" height="18" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <path d="M34,40 l2.5,-4 2,2 2.5,-2.5" stroke={C.teal} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const RoundImageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Dashed circle outside */}
    <circle cx="24" cy="24" r="20" fill="none" stroke={C.teal} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4" />
    {/* Image inside circle (clipped) */}
    <clipPath id="round-clip">
      <circle cx="24" cy="24" r="16" />
    </clipPath>
    <g clipPath="url(#round-clip)">
      <rect x="8" y="8" width="32" height="32" fill="#CFFAFE" />
      <circle cx="17" cy="17" r="4" fill={C.teal} opacity="0.4" />
      <path d="M8,36 l8,-8 6,5 5,-4 9,7 H8Z" fill={C.teal} opacity="0.3" />
    </g>
    <circle cx="24" cy="24" r="16" fill="none" stroke={C.teal} strokeWidth="2" />
  </svg>
);

const ProfilePhotoIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Circle background */}
    <circle cx="24" cy="24" r="20" fill="#CFFAFE" stroke={C.teal} strokeWidth="2" />
    {/* User silhouette */}
    <circle cx="24" cy="18" r="7" fill={C.teal} opacity="0.5" />
    <path d="M10,42 a14,11 0 0,1 28,0" fill={C.teal} opacity="0.35" />
  </svg>
);

const MemeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="4" y="4" width="40" height="40" rx="3" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    {/* Image content */}
    <circle cx="16" cy="20" r="3" fill={C.teal} opacity="0.3" />
    <path d="M6,34 l8,-8 6,5 6,-5 10,8 H6Z" fill={C.teal} opacity="0.2" />
    {/* Top text bar */}
    <rect x="4" y="4" width="40" height="10" rx="3" fill={C.teal} opacity="0.8" />
    <line x1="14" y1="9" x2="34" y2="9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bottom text bar */}
    <rect x="4" y="34" width="40" height="10" rx="3" fill={C.teal} opacity="0.8" />
    <line x1="12" y1="39" x2="36" y2="39" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  OPTIMIZE TOOLS (green accent)
// ══════════════════════════════════════════════════════════════

const CompressIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Large image outline (original size) */}
    <rect x="4" y="4" width="28" height="22" rx="3" fill="#DCFCE7" stroke={C.green} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
    {/* Inward compression arrows */}
    <path d="M8,8 l5,4 M8,8 h4 M8,8 v3" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28,22 l-5,-4 M28,22 h-4 M28,22 v-3" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Compressed result */}
    <rect x="26" y="14" width="18" height="14" rx="3" fill="#DCFCE7" stroke={C.green} strokeWidth="1.8" />
    <circle cx="31" cy="19" r="2" fill={C.green} opacity="0.4" />
    <path d="M28,26 l4,-4 3,2.5 3,-2 4,3.5 H28Z" fill={C.green} opacity="0.25" />
    {/* Size reduction indicator */}
    <text x="36" y="42" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif" fill={C.green} opacity="0.6">-70%</text>
  </svg>
);

const WatermarkIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="4" y="4" width="40" height="32" rx="3" fill="#DCFCE7" stroke={C.green} strokeWidth="1.5" />
    <circle cx="14" cy="14" r="3.5" fill={C.green} opacity="0.3" />
    <path d="M6,32 l8,-8 6,5 6,-5 10,8 H6Z" fill={C.green} opacity="0.2" />
    {/* Semi-transparent "DRAFT" text overlay (rotated) */}
    <g transform="rotate(-25, 24, 20)">
      <text x="24" y="24" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" fill={C.green} opacity="0.25" letterSpacing="2">DRAFT</text>
    </g>
    {/* Water drop icon */}
    <path d="M38,38 c0,3 -2.5,5 -5,5 s-5,-2 -5,-5 c0,-3 5,-8 5,-8 s5,5 5,8Z" fill={C.green} opacity="0.4" stroke={C.green} strokeWidth="1" />
  </svg>
);


// ══════════════════════════════════════════════════════════════
//  EFFECTS TOOLS — continued (purple accent)
// ══════════════════════════════════════════════════════════════

const ColorReplaceIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Source color circle */}
    <circle cx="16" cy="20" r="10" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <circle cx="16" cy="20" r="5" fill={C.purple} opacity="0.5" />
    {/* Arrow */}
    <path d="M28,20 l6,0" stroke={C.purple} strokeWidth="2" strokeLinecap="round" />
    <path d="M32,17 l4,3 -4,3" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Target color circle */}
    <circle cx="40" cy="20" r="6" fill={C.rose} opacity="0.6" stroke={C.rose} strokeWidth="1.5" />
    {/* Eyedropper */}
    <path d="M10,34 l4,-4 4,4 -4,4Z" fill={C.purple} opacity="0.7" />
    <line x1="14" y1="30" x2="20" y2="24" stroke={C.purple} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const VignetteIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="4" y="6" width="40" height="32" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    {/* Landscape scene */}
    <circle cx="14" cy="14" r="3.5" fill={C.purple} opacity="0.3" />
    <path d="M6,34 l8,-8 6,5 6,-5 10,8 H6Z" fill={C.purple} opacity="0.2" />
    {/* Vignette darkening at edges (4 gradient rects) */}
    <rect x="4" y="6" width="8" height="32" rx="1" fill={C.purple} opacity="0.25" />
    <rect x="36" y="6" width="8" height="32" rx="1" fill={C.purple} opacity="0.25" />
    <rect x="4" y="6" width="40" height="7" rx="1" fill={C.purple} opacity="0.2" />
    <rect x="4" y="31" width="40" height="7" rx="1" fill={C.purple} opacity="0.2" />
    {/* Bright center indicator */}
    <circle cx="24" cy="22" r="8" fill="white" opacity="0.2" />
  </svg>
);

const NoiseIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image frame */}
    <rect x="4" y="6" width="40" height="32" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    {/* Noise grain dots scattered */}
    {[
      [10,12], [18,10], [30,14], [38,11], [8,22], [14,20], [22,18],
      [34,20], [40,24], [12,28], [20,26], [28,22], [36,30], [16,34],
      [26,32], [38,34], [10,16], [24,14], [32,26], [42,18], [6,30],
      [22,30], [30,34], [18,16], [34,16], [28,28], [40,28], [8,34],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.2 : 0.8} fill={C.purple} opacity={0.15 + (i % 4) * 0.1} />
    ))}
    {/* Film grain label */}
    <text x="24" y="44" textAnchor="middle" fontSize="6" fontWeight="700" fontFamily="system-ui, sans-serif" fill={C.purple} opacity="0.5">GRAIN</text>
  </svg>
);

const SharpenIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Blurry half (left) */}
    <rect x="4" y="6" width="20" height="32" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.5" />
    <circle cx="14" cy="16" r="3" fill={C.purple} opacity="0.15" />
    <path d="M6,34 l4,-6 4,3 4,-4 2,7 H6Z" fill={C.purple} opacity="0.1" />
    {/* Sharp half (right) */}
    <rect x="24" y="6" width="20" height="32" rx="3" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.8" />
    <circle cx="34" cy="16" r="3" fill={C.purple} opacity="0.4" />
    <path d="M26,34 l4,-6 4,3 4,-4 2,7 H26Z" fill={C.purple} opacity="0.3" />
    {/* Center divider */}
    <line x1="24" y1="6" x2="24" y2="38" stroke={C.purple} strokeWidth="1.5" strokeDasharray="2,2" />
    {/* Diamond/sharpness indicator */}
    <path d="M24,42 l3,4 -3,0 -3,0Z" fill={C.purple} opacity="0.6" />
  </svg>
);

const SepiaIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Vintage photo frame */}
    <rect x="6" y="4" width="36" height="28" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
    {/* Sepia-toned landscape */}
    <circle cx="16" cy="14" r="3.5" fill="#D97706" opacity="0.3" />
    <path d="M8,28 l6,-6 5,4 5,-4 8,6 H8Z" fill="#D97706" opacity="0.25" />
    {/* Warm color overlay */}
    <rect x="6" y="4" width="36" height="28" rx="3" fill="#D97706" opacity="0.08" />
    {/* Vintage curl corner */}
    <path d="M42,4 Q42,10 36,10" fill="none" stroke="#D97706" strokeWidth="1" opacity="0.4" />
    {/* "SEPIA" label */}
    <text x="24" y="42" textAnchor="middle" fontSize="8" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#D97706" opacity="0.5">SEPIA</text>
  </svg>
);

const InvertIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Left half — light */}
    <path d="M8,6 h16 v32 H8 a3,3 0 0 1 -3,-3 V9 a3,3 0 0 1 3,-3Z" fill="#EDE9FE" stroke={C.purple} strokeWidth="1.5" />
    <circle cx="14" cy="16" r="3" fill={C.purple} opacity="0.3" />
    <path d="M7,34 l5,-6 4,3 4,-4 4,7 H7Z" fill={C.purple} opacity="0.2" />
    {/* Right half — dark (inverted) */}
    <path d="M24,6 h16 a3,3 0 0 1 3,3 v26 a3,3 0 0 1 -3,3 H24Z" fill={C.purple} opacity="0.85" />
    <circle cx="34" cy="16" r="3" fill="white" opacity="0.4" />
    <path d="M24,34 l5,-6 4,3 4,-4 4,7 H24Z" fill="white" opacity="0.3" />
    {/* Center divider */}
    <line x1="24" y1="6" x2="24" y2="38" stroke={C.purple} strokeWidth="1.5" />
    {/* Yin-yang hint */}
    <circle cx="24" cy="44" r="3" fill="none" stroke={C.purple} strokeWidth="1.5" opacity="0.4" />
    <path d="M24,41 a3,3 0 0 1 0,6" fill={C.purple} opacity="0.4" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  COMPOSE TOOLS — continued (teal accent)
// ══════════════════════════════════════════════════════════════

const ImageToIconIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Source image (large) */}
    <rect x="2" y="4" width="22" height="18" rx="3" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6" />
    <circle cx="10" cy="11" r="2.5" fill={C.teal} opacity="0.3" />
    <path d="M4,20 l4,-4 4,3 4,-3 4,4 H4Z" fill={C.teal} opacity="0.15" />
    {/* Arrow */}
    <path d="M26,14 l4,0" stroke={C.teal} strokeWidth="2" strokeLinecap="round" />
    <path d="M28,11 l4,3 -4,3" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Multi-size icons output */}
    <rect x="34" y="4" width="12" height="12" rx="3" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <text x="40" y="12" textAnchor="middle" fontSize="6" fontWeight="700" fontFamily="system-ui, sans-serif" fill={C.teal} opacity="0.6">ICO</text>
    <rect x="36" y="20" width="8" height="8" rx="2" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.2" />
    <rect x="38" y="32" width="5" height="5" rx="1.5" fill="#CFFAFE" stroke={C.teal} strokeWidth="1" />
  </svg>
);

const ColorPaletteIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Image source */}
    <rect x="4" y="6" width="24" height="20" rx="3" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    <circle cx="12" cy="14" r="3" fill={C.teal} opacity="0.3" />
    <path d="M6,24 l5,-5 4,3 4,-3 5,5 H6Z" fill={C.teal} opacity="0.2" />
    {/* Extracted color swatches */}
    <rect x="34" y="6" width="10" height="6" rx="2" fill="#F43F5E" opacity="0.8" />
    <rect x="34" y="14" width="10" height="6" rx="2" fill="#3B82F6" opacity="0.8" />
    <rect x="34" y="22" width="10" height="6" rx="2" fill="#F59E0B" opacity="0.8" />
    <rect x="34" y="30" width="10" height="6" rx="2" fill={C.teal} opacity="0.8" />
    {/* Eyedropper connecting */}
    <path d="M28,16 l4,-2" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2" />
  </svg>
);

const HtmlToImageIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Code editor frame */}
    <rect x="2" y="4" width="22" height="20" rx="3" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.5" />
    {/* Code lines */}
    <text x="6" y="12" fontSize="5" fontWeight="700" fontFamily="monospace" fill={C.teal} opacity="0.7">&lt;/&gt;</text>
    <line x1="6" y1="16" x2="18" y2="16" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <line x1="6" y1="20" x2="14" y2="20" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    {/* Arrow */}
    <path d="M26,14 l4,0" stroke={C.teal} strokeWidth="2" strokeLinecap="round" />
    <path d="M28,11 l4,3 -4,3" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Rendered image output */}
    <rect x="34" y="4" width="12" height="20" rx="3" fill="#CFFAFE" stroke={C.teal} strokeWidth="1.8" />
    <circle cx="40" cy="11" r="2" fill={C.teal} opacity="0.4" />
    <path d="M36,22 l3,-4 3,2 2,-2 2,4 H36Z" fill={C.teal} opacity="0.25" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  GENERATE TOOLS (rose accent)
// ══════════════════════════════════════════════════════════════

const GradientIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    <defs>
      <linearGradient id="grad-icon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={C.rose} />
        <stop offset="50%" stopColor={C.purple} />
        <stop offset="100%" stopColor={C.blue} />
      </linearGradient>
    </defs>
    {/* Gradient rectangle */}
    <rect x="4" y="6" width="40" height="30" rx="4" fill="url(#grad-icon)" opacity="0.7" />
    <rect x="4" y="6" width="40" height="30" rx="4" fill="none" stroke={C.rose} strokeWidth="1.5" />
    {/* Color stops */}
    <circle cx="8" cy="40" r="3" fill={C.rose} opacity="0.8" />
    <circle cx="24" cy="40" r="3" fill={C.purple} opacity="0.8" />
    <circle cx="40" cy="40" r="3" fill={C.blue} opacity="0.8" />
    <line x1="11" y1="40" x2="21" y2="40" stroke={C.rose} strokeWidth="1" opacity="0.4" />
    <line x1="27" y1="40" x2="37" y2="40" stroke={C.rose} strokeWidth="1" opacity="0.4" />
  </svg>
);

const PlaceholderIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Placeholder rectangle */}
    <rect x="4" y="6" width="40" height="30" rx="3" fill="#FFE4E6" stroke={C.rose} strokeWidth="1.5" />
    {/* Diagonal cross lines */}
    <line x1="4" y1="6" x2="44" y2="36" stroke={C.rose} strokeWidth="1" opacity="0.2" />
    <line x1="44" y1="6" x2="4" y2="36" stroke={C.rose} strokeWidth="1" opacity="0.2" />
    {/* Dimensions text */}
    <rect x="12" y="16" width="24" height="12" rx="2" fill="white" opacity="0.8" />
    <text x="24" y="25" textAnchor="middle" fontSize="7" fontWeight="700" fontFamily="system-ui, sans-serif" fill={C.rose} opacity="0.7">800×600</text>
    {/* Image icon hint */}
    <circle cx="38" cy="12" r="2" fill={C.rose} opacity="0.3" />
  </svg>
);

const PatternIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* Pattern grid */}
    <rect x="4" y="4" width="40" height="40" rx="3" fill="#FFE4E6" stroke={C.rose} strokeWidth="1.5" />
    {/* Repeating pattern elements — diamonds */}
    {[
      [12,12], [24,12], [36,12],
      [12,24], [24,24], [36,24],
      [12,36], [24,36], [36,36],
    ].map(([cx, cy], i) => (
      <path key={i} d={`M${cx},${cy - 4} l4,4 -4,4 -4,-4Z`} fill={C.rose} opacity={0.2 + (i % 3) * 0.1} />
    ))}
    {/* Grid lines */}
    <line x1="18" y1="4" x2="18" y2="44" stroke={C.rose} strokeWidth="0.5" opacity="0.15" />
    <line x1="30" y1="4" x2="30" y2="44" stroke={C.rose} strokeWidth="0.5" opacity="0.15" />
    <line x1="4" y1="18" x2="44" y2="18" stroke={C.rose} strokeWidth="0.5" opacity="0.15" />
    <line x1="4" y1="30" x2="44" y2="30" stroke={C.rose} strokeWidth="0.5" opacity="0.15" />
    {/* Repeat arrows */}
    <path d="M42,8 l2,0 0,2" stroke={C.rose} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const QrCodeIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" {...props}>
    {/* QR frame */}
    <rect x="4" y="4" width="40" height="40" rx="3" fill="#FFE4E6" stroke={C.rose} strokeWidth="1.5" />
    {/* Top-left finder pattern */}
    <rect x="8" y="8" width="12" height="12" rx="1" fill="none" stroke={C.rose} strokeWidth="2" />
    <rect x="11" y="11" width="6" height="6" rx="0.5" fill={C.rose} opacity="0.8" />
    {/* Top-right finder pattern */}
    <rect x="28" y="8" width="12" height="12" rx="1" fill="none" stroke={C.rose} strokeWidth="2" />
    <rect x="31" y="11" width="6" height="6" rx="0.5" fill={C.rose} opacity="0.8" />
    {/* Bottom-left finder pattern */}
    <rect x="8" y="28" width="12" height="12" rx="1" fill="none" stroke={C.rose} strokeWidth="2" />
    <rect x="11" y="31" width="6" height="6" rx="0.5" fill={C.rose} opacity="0.8" />
    {/* Data modules */}
    {[
      [24,24,4], [30,24,3], [36,30,3], [24,30,3], [30,34,4], [36,36,3], [24,36,3],
    ].map(([x, y, s], i) => (
      <rect key={i} x={x} y={y} width={s} height={s} rx="0.5" fill={C.rose} opacity={0.3 + (i % 3) * 0.15} />
    ))}
  </svg>
);

// ══════════════════════════════════════════════════════════════
//  ICON MAP
// ══════════════════════════════════════════════════════════════

export const toolIconMap: Record<string, FC<IconProps>> = {
  // Edit
  "resize": ResizeIcon,
  "crop": CropIcon,
  "rotate": RotateIcon,
  "flip": FlipIcon,
  "photo-editor": PhotoEditorIcon,
  // Convert
  "jpg-to-png": JpgToPngIcon,
  "png-to-jpg": PngToJpgIcon,
  "webp-to-jpg": WebpToJpgIcon,
  "webp-to-png": WebpToPngIcon,
  "jpg-to-webp": JpgToWebpIcon,
  "png-to-webp": PngToWebpIcon,
  "svg-to-png": SvgToPngIcon,
  "svg-to-jpg": SvgToJpgIcon,
  "gif-to-jpg": GifToJpgIcon,
  "bmp-to-jpg": BmpToJpgIcon,
  "bmp-to-png": BmpToPngIcon,
  "heic-to-jpg": HeicToJpgIcon,
  "heic-to-png": HeicToPngIcon,
  "tiff-to-jpg": TiffToJpgIcon,
  "tiff-to-png": TiffToPngIcon,
  "psd-to-jpg": PsdToJpgIcon,
  "psd-to-png": PsdToPngIcon,
  "eps-to-jpg": EpsToJpgIcon,
  "eps-to-png": EpsToPngIcon,
  "eps-to-svg": EpsToSvgIcon,
  "png-to-svg": PngToSvgIcon,
  "jpg-to-svg": JpgToSvgIcon,
  "gif-to-mp4": GifToMp4Icon,
  "image-to-text": ImageToTextIcon,
  // Effects
  "grayscale": GrayscaleIcon,
  "add-text": AddTextIcon,
  "add-border": AddBorderIcon,
  "pixelate": PixelateIcon,
  "blur": BlurIcon,
  "filters": FiltersIcon,
  "color-replace": ColorReplaceIcon,
  "vignette": VignetteIcon,
  "noise": NoiseIcon,
  "sharpen": SharpenIcon,
  "sepia": SepiaIcon,
  "invert": InvertIcon,
  // Compose
  "combine": CombineIcon,
  "split-image": SplitImageIcon,
  "collage": CollageIcon,
  "round-image": RoundImageIcon,
  "profile-photo": ProfilePhotoIcon,
  "meme": MemeIcon,
  "image-to-icon": ImageToIconIcon,
  "color-palette": ColorPaletteIcon,
  "html-to-image": HtmlToImageIcon,
  // Optimize
  "compress": CompressIcon,
  "watermark": WatermarkIcon,
  // Generate
  "gradient": GradientIcon,
  "placeholder": PlaceholderIcon,
  "pattern": PatternIcon,
  "qr-code": QrCodeIcon,
};

// ── Category icons ─────────────────────────────────────────────
export const categoryIconMap: Record<string, FC<IconProps>> = {
  edit: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15,3 l6,6 -12,12 H3 v-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="13" y1="5" x2="19" y2="11" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  convert: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4,8 h7 l-3,-3 M11,8 l-3,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20,16 h-7 l3,-3 M13,16 l3,3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  effects: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      {/* Sparkle/wand */}
      <path d="M12,2 l1.5,4.5 L18,8 l-4.5,1.5 L12,14 l-1.5,-4.5 L6,8 l4.5,-1.5Z" fill="currentColor" />
      <path d="M5,16 l1,3 3,1 -3,1 -1,3 -1,-3 -3,-1 3,-1Z" fill="currentColor" opacity="0.6" />
      <path d="M19,14 l0.8,2.2 2.2,0.8 -2.2,0.8 -0.8,2.2 -0.8,-2.2 -2.2,-0.8 2.2,-0.8Z" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  compose: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      {/* Grid/layers */}
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  optimize: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M13,2 l-2,8 h6 l-4,12 1,-8 h-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  generate: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      {/* Paint palette */}
      <path d="M12,2 l2,5 5,2 -5,2 -2,5 -2,-5 -5,-2 5,-2Z" fill="currentColor" />
      <circle cx="6" cy="18" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="12" cy="20" r="2.5" fill="currentColor" opacity="0.3" />
    </svg>
  ),
};

export function getToolIcon(slug: string): FC<IconProps> | undefined {
  return toolIconMap[slug];
}

export function getCategoryIcon(category: string): FC<IconProps> | undefined {
  return categoryIconMap[category];
}
