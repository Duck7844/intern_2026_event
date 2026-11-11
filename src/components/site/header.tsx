"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { headerNav } from "@/data/nav";
import { playRoutes } from "@/data/play";
import { useLang } from "@/lib/i18n";
import { iconSrc } from "@/lib/assets";
import { cn } from "@/lib/utils";

/** Link đang active khi pathname trùng, hoặc là anchor về Home và đang ở Home. */
function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return pathname === "/" && href === "/#game";
  // Mục "Vòng quay & Bốc thăm" active cho cả 4 trang chơi
  if (href === "/vong-quay") return playRoutes.includes(pathname);
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const active = (href: string) => isActive(pathname, href);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-line bg-cream/95 backdrop-blur-[8px]">
      <div className="wrap relative flex min-h-16 flex-nowrap items-center justify-between gap-2 md:min-h-[72px] md:justify-start md:gap-6">
        <Logo />

        <nav
          aria-label={t("nav.mainLabel")}
          className="hidden flex-1 flex-wrap gap-x-6 gap-y-1 md:flex"
        >
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={active(item.href) ? "page" : undefined}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-2 md:ml-0 md:gap-3">
          <Link
            href="/dang-nhap"
            title={t("nav.loginTitle")}
            className="inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm font-extrabold whitespace-nowrap text-ink-2 no-underline transition-colors hover:bg-white hover:text-ink"
          >
            <Image src={iconSrc("key")} alt="" width={20} height={20} className="size-[1.2em]" />
            <span className="sr-only md:not-sr-only">{t("nav.login")}</span>
          </Link>

          <Link
            href="/choi"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden md:inline-flex")}
          >
            {t("nav.joinRoom")}
          </Link>

          <Link
            href="/#game"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "max-md:h-[42px] max-md:px-3.5 max-md:text-sm max-[359px]:hidden",
            )}
          >
            {t("nav.playNow")}
          </Link>

          <MobileNav isActive={active} />
        </div>
      </div>
    </header>
  );
}
