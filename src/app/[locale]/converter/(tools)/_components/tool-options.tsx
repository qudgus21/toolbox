"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { ConverterDictionary } from "@/lib/i18n/converter-config";

interface ToolOptionsProps {
  slug: string;
  options: Record<string, unknown>;
  onChange: (options: Record<string, unknown>) => void;
  labels: ConverterDictionary["common"];
  t: Record<string, string>;
  unitLabels?: Record<string, Record<string, string>>;
}

// ── TOOL_UNITS: unit options for every unit-type tool ─────────────────

export const TOOL_UNITS: Record<string, { value: string; label: string }[]> = {
  length: [
    { value: "m", label: "Meter (m)" },
    { value: "km", label: "Kilometer (km)" },
    { value: "cm", label: "Centimeter (cm)" },
    { value: "mm", label: "Millimeter (mm)" },
    { value: "mi", label: "Mile (mi)" },
    { value: "yd", label: "Yard (yd)" },
    { value: "ft", label: "Foot (ft)" },
    { value: "in", label: "Inch (in)" },
    { value: "nm", label: "Nautical Mile (nm)" },
    { value: "\u03BCm", label: "Micrometer (\u03BCm)" },
  ],
  weight: [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "g", label: "Gram (g)" },
    { value: "mg", label: "Milligram (mg)" },
    { value: "lb", label: "Pound (lb)" },
    { value: "oz", label: "Ounce (oz)" },
    { value: "ton", label: "Metric Ton (t)" },
    { value: "st", label: "Stone (st)" },
    { value: "ct", label: "Carat (ct)" },
  ],
  temperature: [
    { value: "C", label: "Celsius (\u00B0C)" },
    { value: "F", label: "Fahrenheit (\u00B0F)" },
    { value: "K", label: "Kelvin (K)" },
  ],
  area: [
    { value: "m\u00B2", label: "Square Meter (m\u00B2)" },
    { value: "km\u00B2", label: "Square Kilometer (km\u00B2)" },
    { value: "ha", label: "Hectare (ha)" },
    { value: "acre", label: "Acre" },
    { value: "ft\u00B2", label: "Square Foot (ft\u00B2)" },
    { value: "mi\u00B2", label: "Square Mile (mi\u00B2)" },
    { value: "yd\u00B2", label: "Square Yard (yd\u00B2)" },
    { value: "cm\u00B2", label: "Square Centimeter (cm\u00B2)" },
  ],
  volume: [
    { value: "L", label: "Liter (L)" },
    { value: "mL", label: "Milliliter (mL)" },
    { value: "gal", label: "US Gallon (gal)" },
    { value: "fl oz", label: "US Fluid Ounce (fl oz)" },
    { value: "cup", label: "US Cup" },
    { value: "pt", label: "US Pint (pt)" },
    { value: "qt", label: "US Quart (qt)" },
    { value: "m\u00B3", label: "Cubic Meter (m\u00B3)" },
    { value: "cm\u00B3", label: "Cubic Centimeter (cm\u00B3)" },
    { value: "tbsp", label: "Tablespoon (tbsp)" },
    { value: "tsp", label: "Teaspoon (tsp)" },
  ],
  speed: [
    { value: "m/s", label: "Meter/sec (m/s)" },
    { value: "km/h", label: "Kilometer/hr (km/h)" },
    { value: "mph", label: "Mile/hr (mph)" },
    { value: "kn", label: "Knot (kn)" },
    { value: "ft/s", label: "Foot/sec (ft/s)" },
    { value: "mach", label: "Mach" },
  ],
  time: [
    { value: "ms", label: "Millisecond (ms)" },
    { value: "s", label: "Second (s)" },
    { value: "min", label: "Minute (min)" },
    { value: "h", label: "Hour (h)" },
    { value: "d", label: "Day (d)" },
    { value: "wk", label: "Week (wk)" },
    { value: "mo", label: "Month (mo)" },
    { value: "yr", label: "Year (yr)" },
  ],
  pressure: [
    { value: "Pa", label: "Pascal (Pa)" },
    { value: "kPa", label: "Kilopascal (kPa)" },
    { value: "bar", label: "Bar" },
    { value: "psi", label: "PSI" },
    { value: "atm", label: "Atmosphere (atm)" },
    { value: "torr", label: "Torr" },
    { value: "mmHg", label: "mmHg" },
  ],
  energy: [
    { value: "J", label: "Joule (J)" },
    { value: "kJ", label: "Kilojoule (kJ)" },
    { value: "cal", label: "Calorie (cal)" },
    { value: "kcal", label: "Kilocalorie (kcal)" },
    { value: "Wh", label: "Watt-hour (Wh)" },
    { value: "kWh", label: "Kilowatt-hour (kWh)" },
    { value: "BTU", label: "BTU" },
    { value: "eV", label: "Electronvolt (eV)" },
  ],
  power: [
    { value: "W", label: "Watt (W)" },
    { value: "kW", label: "Kilowatt (kW)" },
    { value: "MW", label: "Megawatt (MW)" },
    { value: "hp", label: "Horsepower (hp)" },
    { value: "BTU/h", label: "BTU/hr" },
    { value: "cal/s", label: "Calorie/sec" },
  ],
  frequency: [
    { value: "Hz", label: "Hertz (Hz)" },
    { value: "kHz", label: "Kilohertz (kHz)" },
    { value: "MHz", label: "Megahertz (MHz)" },
    { value: "GHz", label: "Gigahertz (GHz)" },
    { value: "rpm", label: "RPM" },
  ],
  angle: [
    { value: "deg", label: "Degree (\u00B0)" },
    { value: "rad", label: "Radian (rad)" },
    { value: "grad", label: "Gradian (grad)" },
    { value: "turn", label: "Turn" },
    { value: "arcmin", label: "Arc Minute (\u2032)" },
    { value: "arcsec", label: "Arc Second (\u2033)" },
  ],
  "data-storage": [
    { value: "B", label: "Byte (B)" },
    { value: "KB", label: "Kilobyte (KB)" },
    { value: "MB", label: "Megabyte (MB)" },
    { value: "GB", label: "Gigabyte (GB)" },
    { value: "TB", label: "Terabyte (TB)" },
    { value: "PB", label: "Petabyte (PB)" },
    { value: "bit", label: "Bit" },
    { value: "Kbit", label: "Kilobit" },
    { value: "Mbit", label: "Megabit" },
    { value: "Gbit", label: "Gigabit" },
  ],
  "fuel-economy": [
    { value: "km/L", label: "km/L" },
    { value: "mpg", label: "mpg (US)" },
    { value: "L/100km", label: "L/100km" },
  ],
  "cooking-measurement": [
    { value: "cup", label: "Cup" },
    { value: "tbsp", label: "Tablespoon" },
    { value: "tsp", label: "Teaspoon" },
    { value: "mL", label: "Milliliter (mL)" },
    { value: "L", label: "Liter (L)" },
    { value: "fl_oz", label: "Fluid Ounce" },
    { value: "g", label: "Gram (g)" },
    { value: "kg", label: "Kilogram (kg)" },
    { value: "oz", label: "Ounce (oz)" },
    { value: "lb", label: "Pound (lb)" },
  ],
  "oven-temperature": [
    { value: "C", label: "Celsius (\u00B0C)" },
    { value: "F", label: "Fahrenheit (\u00B0F)" },
    { value: "gasmark", label: "Gas Mark" },
  ],
  "px-rem": [
    { value: "px", label: "Pixels (px)" },
    { value: "rem", label: "Root Em (rem)" },
  ],
  "px-em": [
    { value: "px", label: "Pixels (px)" },
    { value: "em", label: "Em (em)" },
  ],
  "px-percent": [
    { value: "px", label: "Pixels (px)" },
    { value: "%", label: "Percent (%)" },
  ],
  "css-unit": [
    { value: "px", label: "Pixels (px)" },
    { value: "rem", label: "Root Em (rem)" },
    { value: "em", label: "Em (em)" },
    { value: "%", label: "Percent (%)" },
    { value: "vw", label: "Viewport Width (vw)" },
    { value: "vh", label: "Viewport Height (vh)" },
  ],
};

// Default from/to units per slug
export const DEFAULT_UNITS: Record<string, { from: string; to: string }> = {
  length: { from: "m", to: "ft" },
  weight: { from: "kg", to: "lb" },
  temperature: { from: "C", to: "F" },
  area: { from: "m\u00B2", to: "ft\u00B2" },
  volume: { from: "L", to: "gal" },
  speed: { from: "km/h", to: "mph" },
  time: { from: "h", to: "min" },
  pressure: { from: "bar", to: "psi" },
  energy: { from: "kJ", to: "kcal" },
  power: { from: "kW", to: "hp" },
  frequency: { from: "MHz", to: "GHz" },
  angle: { from: "deg", to: "rad" },
  "data-storage": { from: "MB", to: "GB" },
  "fuel-economy": { from: "km/L", to: "mpg" },
  "cooking-measurement": { from: "cup", to: "mL" },
  "oven-temperature": { from: "C", to: "F" },
  "px-rem": { from: "px", to: "rem" },
  "px-em": { from: "px", to: "em" },
  "px-percent": { from: "px", to: "%" },
  "css-unit": { from: "px", to: "rem" },
};

// ── Shared small UI primitives ──────────────────────────────────────

function ToggleSwitch({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer group">
      <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={cn(
          "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-all duration-200 cursor-pointer",
          value ? "bg-emerald-500 shadow-sm shadow-emerald-500/30" : "bg-foreground-subtle/25 hover:bg-foreground-subtle/35",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-white transition-all duration-200 shadow-sm",
            value ? "translate-x-[20px] scale-110" : "translate-x-[4px]",
          )}
        />
      </button>
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  label,
  min = 0,
  max = 9999,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <label className="flex items-center justify-between gap-2">
      <span className="text-sm font-medium text-foreground-muted">{label}</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-foreground-muted hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-150 cursor-pointer text-sm font-bold"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
          min={min}
          max={max}
          step={step}
          className="h-8 w-16 rounded-lg border border-border/60 bg-transparent px-2 text-center text-sm font-semibold text-foreground tabular-nums focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
        />
        <button
          type="button"
          onClick={() => onChange(clamp(value + step))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-foreground-muted hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-150 cursor-pointer text-sm font-bold"
        >
          +
        </button>
      </div>
    </label>
  );
}

function TextInput({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground-muted">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 rounded-lg border border-border/60 bg-transparent px-3 text-sm text-foreground placeholder:text-foreground-subtle/50 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
      />
    </label>
  );
}

function ButtonGroup({
  options: opts,
  value,
  onChange,
  label,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-foreground-muted">{label}</span>}
      <div className="flex flex-wrap gap-1.5">
        {opts.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer",
              value === opt.value
                ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/25"
                : "bg-background-subtle/80 text-foreground-muted hover:text-foreground hover:bg-background-elevated hover:shadow-sm",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DirectionToggle({
  value,
  onChange,
  labelA,
  labelB,
}: {
  value: string;
  onChange: (v: string) => void;
  labelA: string;
  labelB: string;
}) {
  return (
    <div className="flex rounded-xl border border-border/50 overflow-hidden bg-background-subtle/50">
      <button
        type="button"
        onClick={() => onChange("aToB")}
        className={cn(
          "flex-1 px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
          value === "aToB"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-foreground-muted hover:text-foreground hover:bg-background-subtle",
        )}
      >
        {labelA}
      </button>
      <button
        type="button"
        onClick={() => onChange("bToA")}
        className={cn(
          "flex-1 px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
          value === "bToA"
            ? "bg-emerald-500 text-white shadow-sm"
            : "text-foreground-muted hover:text-foreground hover:bg-background-subtle",
        )}
      >
        {labelB}
      </button>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────

function o<T>(options: Record<string, unknown>, key: string, fallback: T): T {
  return (options[key] as T) ?? fallback;
}

// ── Main component ──────────────────────────────────────────────────

/** Resolve unit labels from dictionary, falling back to English defaults */
export function getUnits(slug: string, unitLabels?: Record<string, Record<string, string>>) {
  const units = TOOL_UNITS[slug];
  if (!units) return [];
  const labels = unitLabels?.[slug];
  if (!labels) return units;
  return units.map((u) => ({ ...u, label: labels[u.value] ?? u.label }));
}

export function ToolOptions({ slug, options, onChange, labels, t, unitLabels }: ToolOptionsProps) {
  const set = useCallback(
    (key: string, value: unknown) => {
      onChange({ ...options, [key]: value });
    },
    [options, onChange],
  );

  const content = renderOptions(slug, options, set, labels, t, unitLabels);
  if (!content) return null;

  return (
    <div className="rounded-2xl border border-border/50 bg-gradient-to-r from-background-subtle/60 to-background p-4 space-y-3 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{labels.options}</h3>
      {content}
    </div>
  );
}

function renderOptions(
  slug: string,
  options: Record<string, unknown>,
  set: (key: string, value: unknown) => void,
  _labels: ConverterDictionary["common"],
  t: Record<string, string>,
  _unitLabels?: Record<string, Record<string, string>>,
): React.ReactNode {
  switch (slug) {
    // ── Number tools ─────────────────────────────────────────

    case "number-base":
      return (
        <>
          <ButtonGroup
            label={t.fromBase ?? "From Base"}
            value={o(options, "fromBase", "10")}
            onChange={(v) => set("fromBase", v)}
            options={[
              { value: "2", label: t.binary ?? "Binary" },
              { value: "8", label: t.octal ?? "Octal" },
              { value: "10", label: t.decimal ?? "Decimal" },
              { value: "16", label: t.hexadecimal ?? "Hex" },
            ]}
          />
          <ButtonGroup
            label={t.toBase ?? "To Base"}
            value={o(options, "toBase", "2")}
            onChange={(v) => set("toBase", v)}
            options={[
              { value: "2", label: t.binary ?? "Binary" },
              { value: "8", label: t.octal ?? "Octal" },
              { value: "10", label: t.decimal ?? "Decimal" },
              { value: "16", label: t.hexadecimal ?? "Hex" },
            ]}
          />
        </>
      );

    case "roman-numeral":
      return (
        <ButtonGroup
          label={t.direction ?? "Direction"}
          value={o(options, "direction", "toRoman")}
          onChange={(v) => set("direction", v)}
          options={[
            { value: "toRoman", label: t.toRoman ?? "Number \u2192 Roman" },
            { value: "toNumber", label: t.toArabic ?? "Roman \u2192 Number" },
          ]}
        />
      );

    case "scientific-notation":
      return (
        <ButtonGroup
          label={t.direction ?? "Direction"}
          value={o(options, "direction", "toScientific")}
          onChange={(v) => set("direction", v)}
          options={[
            { value: "toScientific", label: t.toScientific ?? "Standard \u2192 Scientific" },
            { value: "toStandard", label: t.toStandard ?? "Scientific \u2192 Standard" },
          ]}
        />
      );

    case "fraction-decimal":
      return (
        <ButtonGroup
          label={t.direction ?? "Direction"}
          value={o(options, "direction", "toDecimal")}
          onChange={(v) => set("direction", v)}
          options={[
            { value: "toDecimal", label: t.toDecimal ?? "Fraction \u2192 Decimal" },
            { value: "toFraction", label: t.toFraction ?? "Decimal \u2192 Fraction" },
          ]}
        />
      );

    case "percentage":
      return (
        <ButtonGroup
          label={t.mode ?? "Mode"}
          value={o(options, "mode", "decimalToPercent")}
          onChange={(v) => set("mode", v)}
          options={[
            { value: "decimalToPercent", label: t.decimalToPercent ?? "Decimal \u2192 %" },
            { value: "percentToDecimal", label: t.percentToDecimal ?? "% \u2192 Decimal" },
            { value: "fractionToPercent", label: t.fractionToPercent ?? "Fraction \u2192 %" },
          ]}
        />
      );

    // ── Color tools ──────────────────────────────────────────

    case "color-palette-generator":
      return (
        <ButtonGroup
          label={t.harmony ?? "Color harmony"}
          value={o(options, "harmony", "complementary")}
          onChange={(v) => set("harmony", v)}
          options={[
            { value: "complementary", label: t.complementary ?? "Complementary" },
            { value: "triadic", label: t.triadic ?? "Triadic" },
            { value: "analogous", label: t.analogous ?? "Analogous" },
            { value: "split-complementary", label: t.splitComplementary ?? "Split Complementary" },
            { value: "tetradic", label: t.tetradic ?? "Tetradic" },
            { value: "monochromatic", label: t.monochromatic ?? "Monochromatic" },
          ]}
        />
      );

    case "gradient-generator":
      return (
        <>
          <ButtonGroup
            label={t.gradientType ?? "Gradient Type"}
            value={o(options, "type", "linear")}
            onChange={(v) => set("type", v)}
            options={[
              { value: "linear", label: t.linear ?? "Linear" },
              { value: "radial", label: t.radial ?? "Radial" },
              { value: "conic", label: t.conic ?? "Conic" },
            ]}
          />
          <NumberInput
            label={t.gradientAngle ?? "Angle (deg)"}
            value={o(options, "angle", 90)}
            onChange={(v) => set("angle", v)}
            min={0}
            max={360}
            step={15}
          />
        </>
      );

    case "color-contrast-checker":
      return (
        <TextInput
          label={t.backgroundColor ?? "Background Color"}
          value={o(options, "bgColor", "#ffffff")}
          onChange={(v) => set("bgColor", v)}
        />
      );

    case "color-blindness-simulator":
      return (
        <ButtonGroup
          label={t.colorType ?? "Deficiency type"}
          value={o(options, "type", "protanopia")}
          onChange={(v) => set("type", v)}
          options={[
            { value: "protanopia", label: t.protanopia ?? "Protanopia" },
            { value: "deuteranopia", label: t.deuteranopia ?? "Deuteranopia" },
            { value: "tritanopia", label: t.tritanopia ?? "Tritanopia" },
            { value: "achromatopsia", label: t.achromatopsia ?? "Achromatopsia" },
          ]}
        />
      );

    // ── Data tools ───────────────────────────────────────────

    case "json-yaml":
      return (
        <DirectionToggle
          value={o(options, "direction", "aToB")}
          onChange={(v) => set("direction", v)}
          labelA={t.jsonToYaml ?? "JSON \u2192 YAML"}
          labelB={t.yamlToJson ?? "YAML \u2192 JSON"}
        />
      );

    case "json-csv":
      return (
        <DirectionToggle
          value={o(options, "direction", "aToB")}
          onChange={(v) => set("direction", v)}
          labelA={t.jsonToCsv ?? "JSON \u2192 CSV"}
          labelB={t.csvToJson ?? "CSV \u2192 JSON"}
        />
      );

    case "json-xml":
      return (
        <DirectionToggle
          value={o(options, "direction", "aToB")}
          onChange={(v) => set("direction", v)}
          labelA={t.jsonToXml ?? "JSON \u2192 XML"}
          labelB={t.xmlToJson ?? "XML \u2192 JSON"}
        />
      );

    case "json-toml":
      return (
        <DirectionToggle
          value={o(options, "direction", "aToB")}
          onChange={(v) => set("direction", v)}
          labelA={t.jsonToToml ?? "JSON \u2192 TOML"}
          labelB={t.tomlToJson ?? "TOML \u2192 JSON"}
        />
      );

    case "markdown-html":
      return (
        <DirectionToggle
          value={o(options, "direction", "aToB")}
          onChange={(v) => set("direction", v)}
          labelA={t.mdToHtml ?? "Markdown \u2192 HTML"}
          labelB={t.htmlToMd ?? "HTML \u2192 Markdown"}
        />
      );

    case "csv-table":
      return (
        <ButtonGroup
          label={t.outputFormat ?? "Output Format"}
          value={o(options, "format", "markdown")}
          onChange={(v) => set("format", v)}
          options={[
            { value: "markdown", label: t.markdown ?? "Markdown table" },
            { value: "html", label: t.html ?? "HTML table" },
          ]}
        />
      );

    case "json-typescript":
      return (
        <TextInput
          label={t.rootName ?? "Root interface name"}
          value={o(options, "interfaceName", "Root")}
          onChange={(v) => set("interfaceName", v)}
        />
      );

    case "sql-json":
      return (
        <DirectionToggle
          value={o(options, "direction", "aToB")}
          onChange={(v) => set("direction", v)}
          labelA={t.sqlToJson ?? "SQL \u2192 JSON"}
          labelB={t.jsonToSql ?? "JSON \u2192 SQL"}
        />
      );

    // ── CSS tools ────────────────────────────────────────────

    case "px-rem":
      return (
        <>
          <DirectionToggle
            value={o(options, "direction", "aToB")}
            onChange={(v) => set("direction", v)}
            labelA={t.pxToRem ?? "px \u2192 rem"}
            labelB={t.remToPx ?? "rem \u2192 px"}
          />
          <NumberInput
            label={t.baseSize ?? "Base Font Size (px)"}
            value={o(options, "baseSize", 16)}
            onChange={(v) => set("baseSize", v)}
            min={1}
            max={100}
          />
        </>
      );

    case "px-em":
      return (
        <>
          <DirectionToggle
            value={o(options, "direction", "aToB")}
            onChange={(v) => set("direction", v)}
            labelA={t.pxToEm ?? "px \u2192 em"}
            labelB={t.emToPx ?? "em \u2192 px"}
          />
          <NumberInput
            label={t.parentSize ?? "Parent Font Size (px)"}
            value={o(options, "parentSize", 16)}
            onChange={(v) => set("parentSize", v)}
            min={1}
            max={100}
          />
        </>
      );

    case "px-percent":
      return (
        <>
          <DirectionToggle
            value={o(options, "direction", "aToB")}
            onChange={(v) => set("direction", v)}
            labelA={t.pxToPercent ?? "px \u2192 %"}
            labelB={t.percentToPx ?? "% \u2192 px"}
          />
          <NumberInput
            label={t.containerWidth ?? "Container Width (px)"}
            value={o(options, "containerWidth", 1920)}
            onChange={(v) => set("containerWidth", v)}
            min={1}
            max={9999}
          />
        </>
      );

    case "css-unit":
      return (
        <NumberInput
          label={t.baseSize ?? "Base Font Size (px)"}
          value={o(options, "baseSize", 16)}
          onChange={(v) => set("baseSize", v)}
          min={1}
          max={100}
        />
      );

    case "css-minifier":
      return (
        <ButtonGroup
          label={t.mode ?? "Mode"}
          value={o(options, "mode", "minify")}
          onChange={(v) => set("mode", v)}
          options={[
            { value: "minify", label: t.minify ?? "Minify" },
            { value: "beautify", label: t.beautify ?? "Beautify" },
          ]}
        />
      );

    case "tailwind-css":
      return (
        <DirectionToggle
          value={o(options, "direction", "aToB")}
          onChange={(v) => set("direction", v)}
          labelA={t.tailwindToCss ?? "Tailwind \u2192 CSS"}
          labelB={t.cssToTailwind ?? "CSS \u2192 Tailwind"}
        />
      );

    // ── Cooking tools ────────────────────────────────────────

    case "cooking-measurement":
      return (
        <ButtonGroup
          label={t.ingredient ?? "Ingredient"}
          value={o(options, "ingredient", "water")}
          onChange={(v) => set("ingredient", v)}
          options={[
            { value: "water", label: t.water ?? "Water" },
            { value: "flour", label: t.flour ?? "Flour" },
            { value: "sugar", label: t.sugar ?? "Sugar" },
            { value: "butter", label: t.butter ?? "Butter" },
            { value: "rice", label: t.rice ?? "Rice" },
            { value: "milk", label: t.milk ?? "Milk" },
          ]}
        />
      );

    case "recipe-scaler":
      return (
        <>
          <NumberInput
            label={t.originalServings ?? "Original Servings"}
            value={o(options, "originalServings", 4)}
            onChange={(v) => set("originalServings", v)}
            min={1}
            max={999}
          />
          <NumberInput
            label={t.targetServings ?? "Target Servings"}
            value={o(options, "targetServings", 8)}
            onChange={(v) => set("targetServings", v)}
            min={1}
            max={999}
          />
        </>
      );

    // ── DateTime tools ───────────────────────────────────────

    case "timezone":
      return (
        <>
          <TextInput
            label={t.fromTimezone ?? "From Timezone"}
            value={o(options, "fromTimezone", "UTC")}
            onChange={(v) => set("fromTimezone", v)}
            placeholder="UTC"
          />
          <TextInput
            label={t.toTimezone ?? "To Timezone"}
            value={o(options, "toTimezone", "America/New_York")}
            onChange={(v) => set("toTimezone", v)}
            placeholder="America/New_York"
          />
        </>
      );

    case "unix-timestamp":
      return (
        <ButtonGroup
          label={t.direction ?? "Direction"}
          value={o(options, "direction", "toDate")}
          onChange={(v) => set("direction", v)}
          options={[
            { value: "toDate", label: t.timestampToDate ?? "Timestamp \u2192 Date" },
            { value: "toTimestamp", label: t.dateToTimestamp ?? "Date \u2192 Timestamp" },
          ]}
        />
      );

    case "date-format":
      return (
        <ButtonGroup
          label={t.outputFormat ?? "Output Format"}
          value={o(options, "format", "iso")}
          onChange={(v) => set("format", v)}
          options={[
            { value: "iso", label: t.iso ?? "ISO 8601" },
            { value: "us", label: t.us ?? "US (MM/DD/YYYY)" },
            { value: "eu", label: t.eu ?? "EU (DD/MM/YYYY)" },
            { value: "long", label: t.long ?? "Long format" },
            { value: "relative", label: t.relative ?? "Relative" },
          ]}
        />
      );

    case "date-calculator":
      return (
        <ButtonGroup
          label={t.mode ?? "Mode"}
          value={o(options, "mode", "diff")}
          onChange={(v) => set("mode", v)}
          options={[
            { value: "diff", label: t.difference ?? "Difference" },
            { value: "add", label: t.addDays ?? "Add days" },
            { value: "subtract", label: t.subtractDays ?? "Subtract days" },
          ]}
        />
      );

    case "age-calculator":
      return (
        <ToggleSwitch
          label={t.showDetails ?? "Show detailed breakdown"}
          value={o(options, "showDetails", true)}
          onChange={(v) => set("showDetails", v)}
        />
      );

    // ── Geography tools ──────────────────────────────────────

    case "coordinate":
      return (
        <ButtonGroup
          label={t.outputFormat ?? "Output Format"}
          value={o(options, "format", "dd")}
          onChange={(v) => set("format", v)}
          options={[
            { value: "dd", label: t.dd ?? "Decimal Degrees (DD)" },
            { value: "dms", label: t.dms ?? "Degrees Minutes Seconds (DMS)" },
            { value: "ddm", label: t.ddm ?? "Degrees Decimal Minutes (DDM)" },
          ]}
        />
      );

    // No options
    case "color-converter":
    case "distance-calculator":
      return null;

    default:
      return null;
  }
}
