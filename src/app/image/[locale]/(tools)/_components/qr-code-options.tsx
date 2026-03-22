"use client";

export interface QrCodeOptionsValue {
  text: string;
  size: number;
  fgColor: string;
  bgColor: string;
  errorCorrection: "L" | "M" | "Q" | "H";
}

interface QrCodeOptionsProps {
  value: QrCodeOptionsValue;
  onChange: (value: QrCodeOptionsValue) => void;
}

const EC_LABELS: Record<string, string> = {
  L: "Low (7%)",
  M: "Medium (15%)",
  Q: "Quartile (25%)",
  H: "High (30%)",
};

export function QrCodeOptions({ value, onChange }: QrCodeOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Text/URL input */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          Text or URL
        </label>
        <textarea
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          placeholder="https://example.com"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-accent/50"
          rows={3}
        />
      </div>

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground-muted">
            Size
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.size}px
          </span>
        </div>
        <input
          type="range"
          min={100}
          max={1000}
          step={50}
          value={value.size}
          onChange={(e) => onChange({ ...value, size: Number(e.target.value) })}
          className="w-full accent-accent"
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            Foreground
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.fgColor}
              onChange={(e) => onChange({ ...value, fgColor: e.target.value })}
              className="h-8 w-8 rounded border border-border cursor-pointer"
            />
            <span className="text-xs text-foreground-muted font-mono">{value.fgColor}</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.bgColor}
              onChange={(e) => onChange({ ...value, bgColor: e.target.value })}
              className="h-8 w-8 rounded border border-border cursor-pointer"
            />
            <span className="text-xs text-foreground-muted font-mono">{value.bgColor}</span>
          </div>
        </div>
      </div>

      {/* Error correction */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-2 block">
          Error Correction
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["L", "M", "Q", "H"] as const).map((level) => (
            <button
              key={level}
              onClick={() => onChange({ ...value, errorCorrection: level })}
              className={`rounded-md border px-3 py-2 text-xs cursor-pointer transition-colors ${
                value.errorCorrection === level
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground-muted hover:border-foreground/30"
              }`}
            >
              {EC_LABELS[level]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getDefaultQrCodeOptions(): QrCodeOptionsValue {
  return {
    text: "https://example.com",
    size: 400,
    fgColor: "#000000",
    bgColor: "#ffffff",
    errorCorrection: "M",
  };
}
