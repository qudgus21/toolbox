"use client";

export interface CompressOptionsValue {
  quality: number;
  outputFormat: "jpeg" | "webp";
}

interface CompressOptionsProps {
  value: CompressOptionsValue;
  onChange: (value: CompressOptionsValue) => void;
  originalSize?: number; // bytes
}

const FORMAT_OPTIONS: { value: CompressOptionsValue["outputFormat"]; label: string }[] = [
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CompressOptions({
  value,
  onChange,
  originalSize,
}: CompressOptionsProps) {
  // Rough estimate: quality maps roughly to size ratio
  const estimatedRatio = value.outputFormat === "webp"
    ? value.quality / 100 * 0.7  // WebP is generally smaller
    : value.quality / 100 * 0.85;
  const estimatedSize = originalSize ? Math.round(originalSize * estimatedRatio) : null;

  return (
    <div className="space-y-5">
      {/* Quality slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-foreground-muted">
            Quality
          </label>
          <span className="text-sm font-semibold text-foreground">
            {value.quality}%
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          step={1}
          value={value.quality}
          onChange={(e) => onChange({ ...value, quality: Number(e.target.value) })}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-foreground-muted mt-1">
          <span>Smallest</span>
          <span>Best quality</span>
        </div>
      </div>

      {/* Output format */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          Output Format
        </label>
        <div className="flex gap-2">
          {FORMAT_OPTIONS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => onChange({ ...value, outputFormat: f.value })}
              className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                value.outputFormat === f.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size estimate */}
      {originalSize && estimatedSize && (
        <div className="rounded-md border border-border bg-background-subtle p-3">
          <div className="flex justify-between text-xs">
            <span className="text-foreground-muted">Original size</span>
            <span className="font-medium text-foreground">{formatBytes(originalSize)}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-foreground-muted">Estimated output</span>
            <span className="font-medium text-accent">~{formatBytes(estimatedSize)}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-foreground-muted">Estimated reduction</span>
            <span className="font-medium text-green-600 dark:text-green-400">
              ~{Math.round((1 - estimatedRatio) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function getDefaultCompressOptions(): CompressOptionsValue {
  return {
    quality: 80,
    outputFormat: "jpeg",
  };
}
