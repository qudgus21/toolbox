"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface HtmlToImageOptionsValue {
  html: string;
  width: number;
  height: number;
  backgroundColor: string;
}

interface HtmlToImageOptionsProps {
  value: HtmlToImageOptionsValue;
  onChange: (value: HtmlToImageOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["htmlToImage"];
}

export function HtmlToImageOptions({ value, onChange, labels }: HtmlToImageOptionsProps) {
  return (
    <div className="space-y-4">
      {/* HTML input */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          {labels.htmlCode}
        </label>
        <textarea
          value={value.html}
          onChange={(e) => onChange({ ...value, html: e.target.value })}
          placeholder={labels.htmlPlaceholder}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-mono resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-accent/50"
          rows={6}
        />
      </div>

      {/* Width & Height */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            {labels.widthPx}
          </label>
          <input
            type="number"
            min={100}
            max={4096}
            value={value.width}
            onChange={(e) => onChange({ ...value, width: Number(e.target.value) || 800 })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground-muted mb-1 block">
            {labels.heightPx}
          </label>
          <input
            type="number"
            min={100}
            max={4096}
            value={value.height}
            onChange={(e) => onChange({ ...value, height: Number(e.target.value) || 600 })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>

      {/* Background color */}
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          {labels.bgColor}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value.backgroundColor}
            onChange={(e) => onChange({ ...value, backgroundColor: e.target.value })}
            className="h-8 w-8 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={value.backgroundColor}
            onChange={(e) => onChange({ ...value, backgroundColor: e.target.value })}
            className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      </div>
    </div>
  );
}

export function getDefaultHtmlToImageOptions(): HtmlToImageOptionsValue {
  return {
    html: '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:sans-serif;"><h1 style="color:#333;font-size:48px;">Hello World</h1></div>',
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
  };
}
