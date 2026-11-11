import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { iconSrc } from "@/lib/assets";

const features = [
  { icon: "users", text: "Tới 300 người/phòng" },
  { icon: "repeat", text: "Nhiều game, 1 mã phòng" },
  { icon: "draw", text: "Logo & màu riêng" },
  { icon: "chart", text: "Xuất kết quả Excel" },
];

const collage = [
  { src: "/design/web-img/quiz.webp", rotate: "-rotate-3" },
  { src: "/design/web-img/bingo.webp", rotate: "rotate-2" },
  { src: "/design/web-img/binh-chon.webp", rotate: "-rotate-1" },
  { src: "/design/web-img/vong-quay.webp", rotate: "rotate-3" },
  { src: "/design/web-img/chon-phe.webp", rotate: "-rotate-2" },
  { src: "/design/web-img/boc-tham.webp", rotate: "rotate-1" },
] as const;

const ecosystem = [
  {
    icon: "phone-qr",
    title: "Check-in sự kiện",
    description: "Đón khách bằng QR, in thẻ, thống kê theo thời gian thực.",
    href: "https://example.com/check-in",
  },
  {
    icon: "wheel",
    title: "Vòng quay chuyên nghiệp",
    description: "Quay thưởng trên LED theo danh sách check-in, nhiều đợt giải.",
    href: "https://example.com/vong-quay",
  },
  {
    icon: "lottery",
    title: "Bốc thăm chuyên nghiệp",
    description: "Bốc số cho hàng nghìn khách, lưu lịch sử trúng giải.",
    href: "https://example.com/boc-tham",
  },
];

/** Section #su-kien: block cho doanh nghiệp + 3 card hệ sinh thái. */
export function Business() {
  return (
    <section id="su-kien" className="wrap scroll-mt-20 py-6 md:py-10">
      <div className="grid gap-8 rounded-[28px] border-2 border-ink bg-white p-6 md:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12">
        <div className="flex flex-col items-start gap-5">
          <p className="inline-flex items-center rounded-full border-2 border-line bg-cream px-3.5 py-1.5 text-xs font-extrabold text-ink-2">
            Cho doanh nghiệp &amp; ban tổ chức
          </p>
          <h2 className="text-[30px] leading-[1.1] md:text-[40px]">
            Cả hội trường reo hò cùng một bảng xếp hạng
          </h2>
          <p className="text-base leading-relaxed text-ink-3 md:text-lg">
            Year-end party, hội nghị khách hàng, team building: khách quét QR, chơi trên điện
            thoại, kết quả nhảy liên tục trên màn LED. Chúng tôi lo nội dung riêng, logo thương
            hiệu và hỗ trợ trong ngày sự kiện.
          </p>

          <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f.text}
                className="flex items-center gap-3 rounded-2xl border-2 border-line bg-cream px-4 py-3 text-sm font-extrabold text-ink"
              >
                <Image src={iconSrc(f.icon)} alt="" width={28} height={28} className="size-7" />
                {f.text}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/lien-he" className={buttonVariants({ size: "md" })}>
              Nhận tư vấn
            </Link>
            <Link href="/man-chieu" className={buttonVariants({ variant: "outline", size: "md" })}>
              Xem màn trình chiếu
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:gap-4" aria-hidden="true">
          {collage.map((c) => (
            <li
              key={c.src}
              className={cn(
                "relative aspect-square overflow-hidden rounded-[18px] border-[3px] border-white shadow-[0_0_0_2px_var(--color-line)] motion-reduce:transform-none",
                c.rotate,
              )}
            >
              <Image src={c.src} alt="" fill sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>

      <h2 className="mt-14 mb-6 text-[26px] leading-tight md:mt-20 md:text-[32px]">
        Một sự kiện trọn vẹn cần nhiều hơn mini game
      </h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {ecosystem.map((item) => (
          <li key={item.title}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-start gap-4 rounded-card border-2 border-line bg-white p-5 no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-line bg-cream">
                <Image src={iconSrc(item.icon)} alt="" width={32} height={32} className="size-8" />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-1 text-[17px] font-extrabold text-ink">
                  {item.title}
                  <ArrowUpRight
                    className="size-4 text-ink-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-3">
                  {item.description}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
