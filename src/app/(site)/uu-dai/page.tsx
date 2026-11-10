import type { Metadata } from "next";

import { FeaturedPromo } from "@/components/pricing/featured-promo";
import { PricingCard } from "@/components/pricing/pricing-card";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PromoCard } from "@/components/pricing/promo-card";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { pricingFaq } from "@/data/faq";
import { plans, pricingNotes, promos } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Bảng giá & ưu đãi",
  description: "Gói miễn phí cho nhóm nhỏ, gói theo sự kiện cho hội nghị và Year End Party.",
};

export default function PricingPage() {
  const quick = plans.filter((p) => p.id === "free" || p.recommended);
  const featured = promos.find((p) => p.featured);

  return (
    <div className="bg-dots">
      <div className="wrap flex flex-col gap-14 py-8 md:gap-20 md:py-12">
        <PricingHero />

        {/* Chọn nhanh */}
        <section aria-labelledby="quick-pick">
          <h2 id="quick-pick" className="mb-5 text-[24px] leading-tight md:text-[28px]">
            Chọn nhanh
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {quick.map((plan) => (
              <PricingCard key={plan.id} plan={plan} size="lg" />
            ))}
          </div>
        </section>

        {featured && <FeaturedPromo promo={featured} />}

        {/* Tất cả chương trình */}
        <section aria-labelledby="all-promos">
          <h2 id="all-promos" className="mb-5 text-[24px] leading-tight md:text-[28px]">
            Tất cả chương trình
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promos.map((promo) => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </div>
        </section>

        {/* Tất cả gói */}
        <section aria-labelledby="all-plans">
          <div className="mb-5 flex flex-col gap-1">
            <h2 id="all-plans" className="text-[24px] leading-tight md:text-[28px]">
              Gói theo sự kiện
            </h2>
            <p className="text-sm text-ink-3">Chọn theo số người tham dự, dùng cho 1 sự kiện trong 30 ngày.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
          <ul className="mt-6 flex flex-col gap-1.5 text-sm text-ink-3">
            {pricingNotes.map((n) => (
              <li key={n}>· {n}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pricing-faq">
          <h2 id="pricing-faq" className="mb-5 text-[26px] leading-tight md:text-[32px]">
            Câu hỏi thường gặp
          </h2>
          <FaqAccordion items={pricingFaq} />
        </section>
      </div>
    </div>
  );
}
