"use client";

import { type Lang, useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { value: Lang; label: string }[] = [
  { value: "vi", label: "VI" },
  { value: "en", label: "EN" },
];

type LangToggleProps = {
  className?: string;
  /** Phiên bản trên nền tối (footer) */
  onDark?: boolean;
};

export function LangToggle({ className, onDark }: LangToggleProps) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className={cn(
        "inline-flex rounded-full border-2 p-0.5",
        onDark ? "border-white/20 bg-white/5" : "border-line bg-white",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === lang;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(opt.value)}
            className={cn(
              "h-7 min-w-10 cursor-pointer rounded-full px-2.5 text-xs font-extrabold transition-colors outline-none focus-visible:ring-4 focus-visible:ring-focus",
              active
                ? onDark
                  ? "bg-yellow text-ink"
                  : "bg-ink text-white"
                : onDark
                  ? "text-footer-text hover:text-white"
                  : "text-ink-3 hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
