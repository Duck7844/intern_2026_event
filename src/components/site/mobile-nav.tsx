"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LangToggle } from "@/components/site/lang-toggle";
import { headerNav } from "@/data/nav";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  /** Hàm kiểm tra link đang active, dùng chung với nav desktop */
  isActive: (href: string) => boolean;
};

/**
 * Hamburger + panel thả xuống ngay dưới header (giống site gốc), chỉ hiện < md.
 * Hamburger 3 gạch biến thành X tại chỗ. Đóng khi: bấm link, đổi route, Escape, click ra ngoài.
 */
export function MobileNav({ isActive }: MobileNavProps) {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Đóng khi route đổi (pattern "adjust state during render").
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="contents md:hidden">
      <button
        type="button"
        aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 flex-none cursor-pointer flex-col items-center justify-center gap-1 rounded-control border-2 border-line bg-white p-0 outline-none focus-visible:ring-4 focus-visible:ring-focus"
      >
        <Bar className={cn(open && "translate-y-[6.5px] rotate-45")} />
        <Bar className={cn(open && "opacity-0")} />
        <Bar className={cn(open && "-translate-y-[6.5px] -rotate-45")} />
      </button>

      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          "absolute inset-x-0 top-full border-b-2 border-line bg-cream shadow-soft",
          open && "animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none",
        )}
      >
        <nav aria-label={t("nav.mainLabel")} className="wrap flex flex-col py-2">
          {headerNav.map((item) => (
            <MobileLink
              key={item.href}
              href={item.href}
              active={isActive(item.href)}
              onClick={() => setOpen(false)}
            >
              {t(item.label)}
            </MobileLink>
          ))}
          <MobileLink href="/choi" active={isActive("/choi")} onClick={() => setOpen(false)}>
            {t("nav.joinRoom")}
          </MobileLink>
          <div className="py-4">
            <LangToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className="group border-b border-line py-4 text-lg font-extrabold text-ink no-underline last:border-b-0"
    >
      <span
        className={cn(
          "border-b-[3px] border-transparent pb-0.5 transition-colors",
          active && "border-yellow",
        )}
      >
        {children}
      </span>
    </Link>
  );
}

function Bar({ className }: { className?: string }) {
  return (
    <i
      aria-hidden="true"
      className={cn(
        "block h-[2.5px] w-[18px] rounded-sm bg-ink-2 transition-[transform,opacity] duration-200 motion-reduce:transition-none",
        className,
      )}
    />
  );
}
