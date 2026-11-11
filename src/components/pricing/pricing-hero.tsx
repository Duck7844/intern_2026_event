import Image from "next/image";
import { Check } from "lucide-react";

import { IMG } from "@/lib/assets";

const highlights = [
  "Thanh toán chuyển khoản, có hoá đơn VAT",
  "Kích hoạt ngay sau khi nhận tiền",
  "Hỗ trợ qua Zalo trong ngày sự kiện",
];


/** Banner tối ở đầu trang Ưu đãi: text trái, ảnh minh hoạ phải. */
export function PricingHero() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border-2 border-ink bg-ink px-6 py-10 text-white shadow-[0_6px_0_0_var(--color-ink-2)] md:px-12 md:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <p className="inline-flex items-center rounded-full border-2 border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-extrabold text-footer-text">
            Bảng giá &amp; ưu đãi
          </p>
          <h1 className="text-[36px] leading-[1.05] text-white md:text-[52px]">
            Bảng giá &amp; ưu đãi mùa sự kiện
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-footer-text md:text-lg">
            Mini game cho Year End Party, Tết và các chương trình quảng bá thương hiệu. Chơi thử
            miễn phí, trả phí theo từng sự kiện.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2 text-sm font-extrabold text-yellow">
                <Check className="size-4" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md lg:max-w-none" aria-hidden="true">
          <Image src={IMG.promoHero} alt="" fill unoptimized priority className="object-contain" />
        </div>
      </div>
    </section>
  );
}
