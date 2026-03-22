"use client";

import type { ImageDictionary } from "@/lib/i18n/image-config";

export interface ProfilePhotoOptionsValue {
  platform: "instagram" | "twitter" | "linkedin" | "facebook" | "youtube" | "custom";
  customSize: number;
}

interface ProfilePhotoOptionsProps {
  value: ProfilePhotoOptionsValue;
  onChange: (value: ProfilePhotoOptionsValue) => void;
  labels: ImageDictionary["toolOptions"]["profilePhoto"];
}

export function ProfilePhotoOptions({ value, onChange, labels }: ProfilePhotoOptionsProps) {
  const PLATFORMS = [
    { value: "instagram" as const, label: labels.instagram, size: "320\u00D7320" },
    { value: "twitter" as const, label: labels.twitter, size: "400\u00D7400" },
    { value: "linkedin" as const, label: labels.linkedin, size: "400\u00D7400" },
    { value: "facebook" as const, label: labels.facebook, size: "320\u00D7320" },
    { value: "youtube" as const, label: labels.youtube, size: "800\u00D7800" },
    { value: "custom" as const, label: labels.custom, size: "" },
  ];

  return (
    <div className="space-y-4">
      {/* Platform selector */}
      <div>
        <label className="block text-xs font-medium text-foreground-muted mb-2">
          {labels.platform}
        </label>
        <div className="flex flex-col gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onChange({ ...value, platform: p.value })}
              className={`flex items-center justify-between rounded-md border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                value.platform === p.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              <span className="text-xs font-medium">{p.label}</span>
              {p.size && (
                <span className="text-xs opacity-70">{p.size}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom size input */}
      {value.platform === "custom" && (
        <div>
          <label className="block text-xs font-medium text-foreground-muted mb-1">
            {labels.sizePx}
          </label>
          <input
            type="number"
            min={16}
            max={4096}
            value={value.customSize}
            onChange={(e) => onChange({ ...value, customSize: Math.max(16, Math.min(4096, Number(e.target.value))) })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="mt-1 text-xs text-foreground-muted">
            {labels.output} {value.customSize}&times;{value.customSize}
          </p>
        </div>
      )}
    </div>
  );
}

export function getDefaultProfilePhotoOptions(): ProfilePhotoOptionsValue {
  return {
    platform: "instagram",
    customSize: 400,
  };
}
