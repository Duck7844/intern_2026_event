import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/site/logo";

/** Layout tối giản: chỉ logo + link về trang chủ, dùng cho màn hình vào phòng chơi. */
export default function BareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-dots">
      <div className="wrap relative flex h-16 items-center justify-center md:h-[72px]">
        <Logo />
        <Link
          href="/"
          className="absolute right-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-2 no-underline hover:text-ink md:right-6"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Trang chủ</span>
        </Link>
      </div>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
