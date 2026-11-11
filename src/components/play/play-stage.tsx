import Image from "next/image";

import { cn } from "@/lib/utils";

type PlayStageProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Ảnh nền phủ kín sân khấu */
  background?: string;
  /** Class nền khi không có ảnh (gradient) */
  className?: string;
  /** Lớp phủ tối lên ảnh nền để chữ dễ đọc */
  overlayClassName?: string;
  children: React.ReactNode;
};

/** Card sân khấu lớn của trang chơi. Khi fullscreen thì bỏ bo góc và phủ kín màn hình. */
export function PlayStage({
  id,
  eyebrow,
  title,
  subtitle,
  background,
  className,
  overlayClassName,
  children,
}: PlayStageProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-[560px] flex-col items-center overflow-hidden rounded-[28px] border-2 border-ink px-4 py-8 text-white shadow-[0_6px_0_0_var(--color-ink)] md:min-h-[640px] md:px-8 md:py-10",
        "fullscreen:min-h-screen fullscreen:justify-center fullscreen:rounded-none fullscreen:border-0",
        className,
      )}
    >
      {background && (
        <Image src={background} alt="" fill priority sizes="100vw" className="object-cover" />
      )}
      {overlayClassName && <div aria-hidden="true" className={cn("absolute inset-0", overlayClassName)} />}

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        {eyebrow && (
          <p className="mb-1 text-[11px] font-extrabold tracking-[0.3em] text-white/80 uppercase">{eyebrow}</p>
        )}
        <h1 className="text-[30px] leading-tight text-yellow drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] md:text-[40px]">
          {title}
        </h1>
        {subtitle && <p className="mt-1.5 text-sm font-bold text-white/90 md:text-base">{subtitle}</p>}
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center">{children}</div>
    </section>
  );
}
