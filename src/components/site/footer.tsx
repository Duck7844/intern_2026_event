"use client";

import Link from "next/link";
import { toast } from "sonner";

import { LangToggle } from "@/components/site/lang-toggle";
import { Logo } from "@/components/site/logo";
import { footerColumns } from "@/data/nav";
import { site } from "@/data/site";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.15fr_repeat(3,1fr)] md:gap-8 md:py-16">
        <div className="flex flex-col gap-4">
          <Logo onDark />
          <p className="max-w-xs text-sm leading-relaxed text-footer-text">
            {t("footer.description")}
          </p>
          <LangToggle onDark className="self-start" />
        </div>

        {footerColumns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="font-display text-base font-extrabold text-white">{t(col.title)}</h3>
            <ul className="flex flex-col gap-2">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-footer-text no-underline transition-colors hover:text-white hover:underline"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
              {col.title === "footer.support" && (
                <li>
                  <button
                    type="button"
                    onClick={() => toast(t("common.comingSoon"))}
                    className="cursor-pointer text-sm text-footer-text transition-colors hover:text-white hover:underline"
                  >
                    {t("footer.cookies")}
                  </button>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-footer-text md:flex-row md:items-center md:justify-between">
          <p>
            © {site.year} {site.name}
          </p>
          <p>{t("footer.note")}</p>
        </div>
      </div>
    </footer>
  );
}
