import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/site/section-heading";
import { SupportTabs } from "@/components/support/support-tabs";

export const metadata: Metadata = {
  title: "Hướng dẫn & FAQ",
  description: "Hướng dẫn nhanh cho người tổ chức và người chơi, kèm câu hỏi thường gặp.",
};

export default function SupportPage() {
  return (
    <div className="bg-dots">
      <div className="wrap py-12 md:py-16">
        <SectionHeading
          as="h1"
          eyebrow="Hỗ trợ"
          title="Chúng tôi giúp gì được bạn?"
          description="Hướng dẫn nhanh cho người tổ chức và người chơi."
        />
        <SupportTabs />

        <section
          id="dieu-khoan"
          className="mt-16 scroll-mt-24 rounded-[24px] border-2 border-line bg-white p-6 md:mt-20 md:p-8"
        >
          <h2 className="text-[24px] leading-tight md:text-[28px]">Điều khoản sử dụng</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-ink-3">
            <p>
              Dịch vụ cung cấp công cụ tổ chức mini game cho sự kiện. Người tổ chức chịu trách
              nhiệm về nội dung, hình ảnh và logo đưa vào phòng chơi, và cần có quyền sử dụng
              các tài liệu đó.
            </p>
            <p>
              Gói trả phí tính theo sự kiện, có hiệu lực 30 ngày kể từ khi thanh toán. Thông tin
              người chơi chỉ dùng để vận hành phòng chơi và xuất kết quả cho người tổ chức.
            </p>
            <p>
              Chi tiết về dữ liệu cá nhân xem tại{" "}
              <Link href="/chinh-sach-quyen-rieng-tu" className="font-bold text-link">
                Chính sách quyền riêng tư
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
