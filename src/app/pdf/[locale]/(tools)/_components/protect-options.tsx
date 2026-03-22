"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  Printer,
  Copy,
  Pencil,
  MessageSquare,
  FormInput,
  Accessibility,
  Layers,
} from "lucide-react";

export interface ProtectLabels {
  passwordLabel: string;
  confirmPasswordLabel: string;
  passwordPlaceholder: string;
  confirmPlaceholder: string;
  showPassword: string;
  hidePassword: string;
  passwordMismatch: string;
  passwordRequired: string;
  strengthWeak: string;
  strengthMedium: string;
  strengthStrong: string;
  advancedLabel: string;
  permissionsLabel: string;
  permPrinting: string;
  permPrintingDesc: string;
  permPrintNone: string;
  permPrintLowRes: string;
  permPrintHighRes: string;
  permCopying: string;
  permCopyingDesc: string;
  permModifying: string;
  permModifyingDesc: string;
  permAnnotating: string;
  permAnnotatingDesc: string;
  permFillingForms: string;
  permFillingFormsDesc: string;
  permAccessibility: string;
  permAccessibilityDesc: string;
  permAssembly: string;
  permAssemblyDesc: string;
  protectButton: string;
  privacyNote: string;
}

interface ProtectOptionsProps {
  onChange: (options: Record<string, unknown>) => void;
  labels: ProtectLabels;
}

type PrintPerm = "highResolution" | "lowResolution" | false;

function getPasswordStrength(pw: string): "weak" | "medium" | "strong" {
  if (pw.length < 6) return "weak";
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

const strengthColors = {
  weak: "bg-red-500",
  medium: "bg-amber-500",
  strong: "bg-emerald-500",
};

export function ProtectOptions({ onChange, labels }: ProtectOptionsProps) {
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Permissions
  const [printing, setPrinting] = useState<PrintPerm>("highResolution");
  const [copying, setCopying] = useState(true);
  const [modifying, setModifying] = useState(true);
  const [annotating, setAnnotating] = useState(true);
  const [fillingForms, setFillingForms] = useState(true);
  const [contentAccessibility, setContentAccessibility] = useState(true);
  const [documentAssembly, setDocumentAssembly] = useState(true);

  const passwordsMatch = userPassword === confirmPassword;
  const strength = userPassword ? getPasswordStrength(userPassword) : null;

  useEffect(() => {
    const permissions: Record<string, unknown> = {
      printing,
      copying,
      modifying,
      annotating,
      fillingForms,
      contentAccessibility,
      documentAssembly,
    };

    const pwValid = userPassword.length > 0 && userPassword === confirmPassword;

    onChange({
      userPassword,
      permissions,
      _valid: pwValid,
    });
  }, [
    onChange,
    userPassword,
    confirmPassword,
    printing,
    copying,
    modifying,
    annotating,
    fillingForms,
    contentAccessibility,
    documentAssembly,
  ]);

  const printOptions: { value: PrintPerm; label: string }[] = [
    { value: "highResolution", label: labels.permPrintHighRes },
    { value: "lowResolution", label: labels.permPrintLowRes },
    { value: false, label: labels.permPrintNone },
  ];

  const permToggles: {
    key: string;
    icon: typeof Copy;
    value: boolean;
    setter: (v: boolean) => void;
    title: string;
    desc: string;
  }[] = [
    { key: "copying", icon: Copy, value: copying, setter: setCopying, title: labels.permCopying, desc: labels.permCopyingDesc },
    { key: "modifying", icon: Pencil, value: modifying, setter: setModifying, title: labels.permModifying, desc: labels.permModifyingDesc },
    { key: "annotating", icon: MessageSquare, value: annotating, setter: setAnnotating, title: labels.permAnnotating, desc: labels.permAnnotatingDesc },
    { key: "fillingForms", icon: FormInput, value: fillingForms, setter: setFillingForms, title: labels.permFillingForms, desc: labels.permFillingFormsDesc },
    { key: "contentAccessibility", icon: Accessibility, value: contentAccessibility, setter: setContentAccessibility, title: labels.permAccessibility, desc: labels.permAccessibilityDesc },
    { key: "documentAssembly", icon: Layers, value: documentAssembly, setter: setDocumentAssembly, title: labels.permAssembly, desc: labels.permAssemblyDesc },
  ];

  return (
    <div className="space-y-4">
      {/* ─── 비밀번호 (필수) ─── */}
      <div className="space-y-3 rounded-xl border border-border bg-background-elevated p-4">
        <label className="block text-sm font-bold text-foreground">
          {labels.passwordLabel}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder={labels.passwordPlaceholder}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
            aria-label={showPassword ? labels.hidePassword : labels.showPassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Password strength */}
        {strength && (
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1">
              <div className={cn("h-1 flex-1 rounded-full transition-colors", strengthColors[strength])} />
              <div className={cn("h-1 flex-1 rounded-full transition-colors", strength === "medium" || strength === "strong" ? strengthColors[strength] : "bg-foreground-subtle/20")} />
              <div className={cn("h-1 flex-1 rounded-full transition-colors", strength === "strong" ? strengthColors[strength] : "bg-foreground-subtle/20")} />
            </div>
            <span className={cn(
              "text-xs font-medium",
              strength === "weak" ? "text-red-500" : strength === "medium" ? "text-amber-500" : "text-emerald-500",
            )}>
              {strength === "weak" ? labels.strengthWeak : strength === "medium" ? labels.strengthMedium : labels.strengthStrong}
            </span>
          </div>
        )}

        {/* Confirm password */}
        <label className="block text-sm font-bold text-foreground">
          {labels.confirmPasswordLabel}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (!confirmTouched) setConfirmTouched(true);
          }}
          placeholder={labels.confirmPlaceholder}
          className={cn(
            "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-1 transition-colors",
            confirmTouched && !passwordsMatch
              ? "border-red-400 focus:border-red-400 focus:ring-red-400"
              : "border-border focus:border-accent focus:ring-accent",
          )}
        />
        {confirmTouched && !passwordsMatch && (
          <p className="text-xs text-red-500">{labels.passwordMismatch}</p>
        )}
      </div>

      {/* ─── 권한 설정 (항상 표시) ─── */}
      <div className="rounded-xl border border-border bg-background-elevated p-4 space-y-3">
        <p className="text-sm font-bold text-foreground">{labels.permissionsLabel}</p>

        {/* Printing — select */}
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <Printer className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            printing !== false ? "text-accent" : "text-foreground-subtle",
          )} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">{labels.permPrinting}</p>
            <p className="text-xs text-foreground-subtle leading-tight">{labels.permPrintingDesc}</p>
          </div>
          <select
            value={printing === false ? "none" : printing}
            onChange={(e) => {
              const v = e.target.value;
              setPrinting(v === "none" ? false : v as "highResolution" | "lowResolution");
            }}
            className="rounded-lg border border-border bg-background px-2 py-1 text-xs font-medium text-foreground cursor-pointer focus:border-accent focus:outline-none"
          >
            {printOptions.map((o) => (
              <option key={String(o.value)} value={o.value === false ? "none" : o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Boolean toggles */}
        {permToggles.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => t.setter(!t.value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 cursor-pointer",
                t.value ? "bg-accent-muted/50" : "hover:bg-background-muted",
              )}
            >
              <Icon className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                t.value ? "text-accent" : "text-foreground-subtle",
              )} />
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-bold transition-colors",
                  t.value ? "text-foreground" : "text-foreground-muted",
                )}>
                  {t.title}
                </p>
                <p className="text-xs text-foreground-subtle leading-tight">{t.desc}</p>
              </div>
              {/* Toggle switch */}
              <div className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
                t.value ? "bg-accent" : "bg-foreground-subtle/30",
              )}>
                <div className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                  t.value ? "translate-x-5" : "translate-x-0.5",
                )} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Privacy note */}
      <p className="text-xs text-foreground-subtle leading-relaxed px-1">
        {labels.privacyNote}
      </p>
    </div>
  );
}
