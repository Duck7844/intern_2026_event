import type { Metadata } from "next";
import Image from "next/image";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập để tạo phòng, gắn thương hiệu và quản lý sự kiện.",
};

const benefits = [
  {
    icon: "draw",
    text: "Gắn logo, màu thương hiệu, ảnh sản phẩm vào game trong vài phút.",
  },
  {
    icon: "phone-qr",
    text: "Khách quét QR, nhập số điện thoại, mỗi số chỉ chơi một lần.",
  },
  {
    icon: "trophy",
    text: "Bảng xếp hạng, mã nhận quà, quầy trao quà, xuất danh sách cho kế toán.",
  },
];

export default function LoginPage() {
  return (
    <div className="bg-dots">
      <div className="wrap grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">Dành cho ban tổ chức sự kiện và marketing</p>
          <h1 className="text-[36px] leading-[1.05] md:text-[48px]">
            Tạo mini game có thương hiệu, thu lead và trao quà minh bạch
          </h1>
          <ul className="flex flex-col gap-4">
            {benefits.map((b) => (
              <li key={b.icon} className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-line bg-white">
                  <Image src={`/icons/${b.icon}.png`} alt="" width={28} height={28} className="size-7" />
                </span>
                <p className="pt-2 text-base leading-relaxed font-bold text-ink-2">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-md justify-self-center lg:justify-self-end">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
