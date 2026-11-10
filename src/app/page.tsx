import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

/**
 * Trang chủ tạm thời của phase 0: trưng bày bộ component nền để kiểm tra token, font, responsive.
 * Phase 1 sẽ thay toàn bộ nội dung này bằng trang chủ thật (xem docs/, màn hình S01).
 */
export default function HomePage() {
  return (
    <div className="bg-dots">
      <section className="wrap py-14 md:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Phase 0 · Component kit"
          title={
            <>
              Chơi là vui,
              <br />
              vui là <span className="text-yellow-deep">kết nối!</span>
            </>
          }
          description="Nền tảng giao diện: design tokens, font Baloo 2 + Nunito, Header, Footer, drawer mobile và các component dùng chung. Trang này sẽ được thay bằng trang chủ thật ở phase 1."
        />

        <div className="flex flex-wrap gap-3">
          <Button>
            Chơi ngay <ArrowRight />
          </Button>
          <Button variant="ghost">Nhập mã phòng</Button>
          <Button variant="outline">Tổ chức cho sự kiện</Button>
          <Button variant="dark">
            <Sparkles /> Tạo phòng
          </Button>
          <Button variant="zalo" size="sm">
            Nhắn Zalo
          </Button>
          <Button variant="whatsapp" size="sm">
            WhatsApp
          </Button>
          <Button disabled>Disabled</Button>
          <Link href="/ho-tro" className={buttonVariants({ variant: "link" })}>
            Link dạng nút
          </Link>
        </div>
      </section>

      <section className="wrap pb-14 md:pb-20">
        <SectionHeading
          title="Chip lọc & nhãn"
          description="Chip lọc theo dịp ở trang chủ và chip 'Hợp với' ở trang chi tiết game."
        />
        <div className="flex flex-wrap gap-2">
          <Chip active>Tất cả</Chip>
          <Chip>Hội nghị & YEP</Chip>
          <Chip>Team building</Chip>
          <Chip>Nhóm bạn</Chip>
          <Chip>Phá băng</Chip>
          <Chip>Trao thưởng</Chip>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip as="span" size="sm" tone="peach">
            Hội nghị · Year-end
          </Chip>
          <Chip as="span" size="sm" tone="mint">
            Team building
          </Chip>
          <Chip as="span" size="sm" tone="peri">
            Phá băng
          </Chip>
          <Chip as="span" size="sm" tone="yellow">
            Trao thưởng
          </Chip>
          <Chip as="span" size="sm" tone="lilac">
            Tết · Year-end
          </Chip>
        </div>
      </section>

      <section className="wrap pb-20 md:pb-28">
        <SectionHeading
          title="Card các tông màu"
          description="Card viền 2px, bo 20px. Tông pastel dùng cho card game, tông ink cho block nổi bật."
          aside={
            <Link href="/ban-co" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Xem tất cả <ArrowRight />
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(["white", "mint", "peri", "peach", "pink", "lilac", "yellow", "ink"] as const).map(
            (tone) => (
              <Card key={tone} tone={tone} hover>
                <CardTitle className={tone === "ink" ? "text-white" : undefined}>
                  Card {tone}
                </CardTitle>
                <CardDescription
                  className={tone === "ink" ? "mt-1 text-footer-text" : "mt-1"}
                >
                  Mô tả ngắn 2 dòng cho card, kiểm tra màu chữ trên nền {tone}.
                </CardDescription>
              </Card>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
