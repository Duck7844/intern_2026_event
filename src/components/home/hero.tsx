import Image from "next/image";
import Link from "next/link";
import { Check, Crown, TrendingDown, TrendingUp, Users } from "lucide-react";

import { RoomCodeForm } from "@/components/home/room-code-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const leaderboard = [
  { rank: 1, name: "Thảo Vy", score: "4.200", avatar: "ava-fox", delta: 0 },
  { rank: 2, name: "Minh Quân", score: "3.940", avatar: "ava-panda", delta: 0 },
  { rank: 3, name: "Hà Linh", score: "3.775", avatar: "ava-cat", delta: 2 },
  { rank: 4, name: "Bà Tư", score: "3.680", avatar: "ava-tiger", delta: -1 },
  { rank: 5, name: "Đức Anh", score: "3.420", avatar: "ava-frog", delta: -1 },
];

export function Hero() {
  return (
    <section className="wrap grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:py-20">
      {/* Cột trái: thông điệp + CTA */}
      <div className="flex flex-col items-start gap-6">
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-white px-4 py-2 text-sm font-extrabold text-ink-2">
          <Image src="/icons/party.png" alt="" width={20} height={20} className="size-5" />
          Mini game cho nhóm bạn &amp; ngày hội công ty
        </p>

        <h1 className="text-[44px] leading-[1.02] md:text-[60px] lg:text-[64px]">
          Chơi là vui,
          <br />
          vui là{" "}
          <span className="relative inline-block px-3">
            <span
              aria-hidden="true"
              className="absolute inset-0 -rotate-2 rounded-[14px] bg-yellow shadow-hard-sm"
            />
            <span className="relative">kết nối!</span>
          </span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-ink-3 md:text-xl">
          Đố vui, đuổi hình bắt chữ, vòng quay may mắn… Mở phòng, cả trăm người quét QR là cùng
          chơi trên điện thoại. Không cần cài app.
        </p>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/#game" className={cn(buttonVariants({ size: "lg" }), "sm:min-w-44")}>
            Chơi ngay
          </Link>
          <Link
            href="/#su-kien"
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "sm:min-w-44")}
          >
            Tổ chức cho sự kiện
          </Link>
        </div>

        <RoomCodeForm className="w-full max-w-md" />
      </div>

      {/* Cột phải: mock bảng xếp hạng + điện thoại */}
      <div className="relative mx-auto w-full max-w-[520px] pb-20 pl-6 sm:pl-10 lg:mx-0 lg:justify-self-end">
        <div className="rounded-[22px] border-2 border-ink bg-white p-4 shadow-[0_6px_0_0_var(--color-ink)] md:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl border-2 border-ink bg-peach font-display text-lg font-extrabold text-ink">
              ?
            </span>
            <h2 className="mr-auto font-display text-lg font-extrabold">Đố vui Year-end</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-err-bg px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-err uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-err" />
              Trực tiếp
            </span>
            <span className="rounded-full bg-cream px-2.5 py-1 text-xs font-extrabold text-ink-2">
              Câu 5/10
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-peri/50 px-2.5 py-1 text-xs font-extrabold text-ink-2">
              <Users className="size-3.5" aria-hidden="true" /> 188
            </span>
          </div>

          <ol className="flex flex-col gap-2">
            {leaderboard.map((row) => {
              const first = row.rank === 1;
              return (
                <li
                  key={row.rank}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 px-3 py-2",
                    first ? "border-ink bg-yellow" : "border-line bg-white",
                  )}
                >
                  <span className="flex w-6 justify-center font-extrabold text-ink-2">
                    {first ? (
                      <Crown className="size-5 text-ink" aria-label="Hạng 1" />
                    ) : (
                      row.rank
                    )}
                  </span>
                  <span className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full border-2 border-line bg-cream">
                    <Image
                      src={`/icons/${row.avatar}.png`}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7"
                    />
                  </span>
                  <span className="flex-1 font-extrabold">{row.name}</span>
                  {row.delta !== 0 && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-extrabold",
                        row.delta > 0 ? "text-ok" : "text-err",
                      )}
                    >
                      {row.delta > 0 ? (
                        <TrendingUp className="size-3.5" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="size-3.5" aria-hidden="true" />
                      )}
                      {Math.abs(row.delta)}
                    </span>
                  )}
                  <span className="font-display text-lg font-extrabold">{row.score}</span>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 border-t-2 border-dashed border-line pt-3 text-right text-xs font-bold text-ink-3">
            Hà Linh vừa vượt lên hạng 3
          </div>
        </div>

        {/* Điện thoại nghiêng */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[150px] -rotate-[8deg] rounded-[26px] border-[3px] border-ink bg-ink p-1.5 shadow-[0_6px_0_0_var(--color-ink-2)] sm:w-[170px]"
        >
          <div className="rounded-[20px] bg-white px-3 pt-3 pb-3">
            <p className="mb-2 text-[10px] font-extrabold tracking-widest text-ink-3 uppercase">
              Câu 5/10
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <span className="flex h-12 items-center justify-center rounded-xl border-2 border-ink bg-peach text-ink">
                ▲
              </span>
              <span className="flex h-12 items-center justify-center rounded-xl border-2 border-ink bg-peri text-ink">
                ◆
              </span>
              <span className="flex h-12 items-center justify-center rounded-xl border-2 border-ink bg-yellow text-ink">
                ●
              </span>
              <span className="flex h-12 items-center justify-center rounded-xl border-2 border-ink bg-mint text-ink">
                ■
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-extrabold text-ok">
              <Check className="size-3" /> Đã gửi · +950
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
