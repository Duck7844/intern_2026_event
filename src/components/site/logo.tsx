import Link from "next/link";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Màu chữ khi đặt trên nền tối (footer) */
  onDark?: boolean;
  ariaLabel?: string;
};

export function Logo({ className, onDark, ariaLabel }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={ariaLabel ?? `${site.name} – Trang chủ`}
      className={cn(
        "inline-flex flex-none items-center gap-[0.45em] font-display text-[20px] leading-none font-extrabold no-underline md:text-[26px]",
        onDark ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark className="size-[1.5em] text-[1em]" />
      <span className="tracking-[-0.01em]">{site.name}</span>
    </Link>
  );
}

/**
 * Logo mark: ô vuông vàng bo góc, viền ink, bóng cứng, chữ cái đầu của thương hiệu.
 * Kích thước theo em để scale cùng chữ bên cạnh.
 */
export function LogoMark({ className }: { className?: string }) {
  const letter = site.logoLetter;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[0.32em] border-2 border-ink bg-yellow font-display font-extrabold text-ink shadow-hard-sm",
        className,
      )}
    >
      <span className="translate-y-[0.03em] text-[0.95em] leading-none">{letter}</span>
    </span>
  );
}
