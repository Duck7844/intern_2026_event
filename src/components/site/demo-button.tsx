"use client";

import { toast } from "sonner";

import { Button, type ButtonProps } from "@/components/ui/button";

type DemoButtonProps = Omit<ButtonProps, "onClick"> & {
  /** Nội dung toast khi bấm */
  message: string;
  description?: string;
};

/**
 * Nút cho các hành động chưa có luồng thật (chơi thử, tạo phòng, thanh toán...).
 * Bấm vào chỉ hiện toast, dùng thống nhất ở mọi phase.
 */
export function DemoButton({ message, description, type = "button", ...props }: DemoButtonProps) {
  return <Button type={type} onClick={() => toast(message, { description })} {...props} />;
}
