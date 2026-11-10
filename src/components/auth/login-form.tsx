"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().trim().email("Email chưa đúng định dạng"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type FormValues = z.infer<typeof schema>;

/** Form đăng nhập demo: validate client, submit hiện toast. Chưa nối auth. */
export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    toast.success(`Đăng nhập demo với ${values.email}`, {
      description: "Luồng xác thực thật sẽ nối ở giai đoạn sau.",
    });
  });

  return (
    <div className="rounded-[24px] border-2 border-ink bg-white p-6 shadow-[0_6px_0_0_var(--color-ink)] md:p-8">
      <h2 className="text-[24px] leading-tight md:text-[28px]">Đăng nhập</h2>
      <p className="mt-1 text-sm text-ink-3">Dành cho host tạo và quản lý phòng sự kiện.</p>

      <Button
        type="button"
        variant="ghost"
        className="mt-6 w-full"
        onClick={() => toast("Đăng nhập Google sẽ bật khi nối backend.")}
      >
        <GoogleMark className="size-5" />
        Đăng nhập bằng Google
      </Button>

      <div className="my-5 flex items-center gap-3 text-xs font-bold text-ink-4">
        <span className="h-0.5 flex-1 bg-line" />
        hoặc
        <span className="h-0.5 flex-1 bg-line" />
      </div>

      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-xs font-extrabold text-ink-2">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="ban@congty.vn"
            aria-invalid={errors.email ? true : undefined}
            className={inputClass}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-xs font-extrabold text-ink-2">
              Mật khẩu
            </label>
            <Link href="#" className="text-xs font-bold text-link">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={errors.password ? true : undefined}
              className={cn(inputClass, "pr-12")}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-md p-1 text-ink-3 hover:text-ink"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
          Đăng nhập
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-3">
        Chưa có tài khoản?{" "}
        <Link href="#" className="font-extrabold text-link">
          Đăng ký miễn phí
        </Link>
      </p>
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-[14px] border-2 border-line-2 bg-white px-4 text-sm font-bold text-ink placeholder:font-semibold placeholder:text-ink-4 focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus aria-invalid:border-err";

function FieldError({ message }: { message?: string }) {
  return (
    <p className={cn("min-h-4 text-xs font-bold text-err", !message && "invisible")} role={message ? "alert" : undefined}>
      {message ?? " "}
    </p>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  );
}
