"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface HtmlToImageOptionsValue {
  html: string;
}

interface HtmlToImageOptionsProps {
  value: HtmlToImageOptionsValue;
  onChange: (value: HtmlToImageOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["htmlToImage"];
}

export function HtmlToImageOptions({ value, onChange, labels }: HtmlToImageOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-foreground-muted mb-1 block">
          {labels.htmlCode}
        </label>
        <textarea
          value={value.html}
          onChange={(e) => onChange({ html: e.target.value })}
          placeholder={labels.htmlPlaceholder}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-mono resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-accent/50"
          rows={8}
        />
      </div>
    </div>
  );
}

export function getDefaultHtmlToImageOptions(): HtmlToImageOptionsValue {
  return {
    html: '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;"><h1 style="color:#333;font-size:48px;">Hello World</h1></div>',
  };
}
