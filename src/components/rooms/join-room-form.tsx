"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const CODE_RE = /^[A-Z0-9]{6}$/;

/**
 * Form vào phòng. Nhận mã từ ?code= (hero trang chủ chuyển sang), chuẩn hoá viết hoa,
 * bỏ khoảng trắng. Submit demo: validate và hiện toast vì chưa có phòng thật.
 */
export function JoinRoomForm() {
  const params = useSearchParams();
  const initial = (params.get("code") ?? "").replace(/\s+/g, "").toUpperCase().slice(0, 6);
  const [code, setCode] = React.useState(initial);
  const [error, setError] = React.useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = code.replace(/\s+/g, "").toUpperCase();
    if (!CODE_RE.test(normalized)) {
      setError("Mã phòng gồm 6 chữ hoặc số, ví dụ 482913 hoặc WYS77K");
      return;
    }
    setError(null);
    toast(`Phòng ${normalized} chưa tồn tại trong bản demo.`, {
      description: "Phòng chơi realtime sẽ nối ở giai đoạn sau.",
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-4">
      <label htmlFor="join-code" className="sr-only">
        Mã phòng
      </label>
      <input
        id="join-code"
        name="code"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        autoFocus
        maxLength={7}
        placeholder="_ _ _ _ _ _"
        value={code}
        onChange={(e) => {
          setCode(e.target.value.toUpperCase());
          if (error) setError(null);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "join-code-error" : undefined}
        className="h-16 w-full rounded-2xl border-2 border-peach bg-white text-center font-mono text-3xl font-bold tracking-[0.35em] text-ink placeholder:tracking-[0.2em] placeholder:text-ink-4 focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus aria-invalid:border-err md:h-20 md:text-4xl"
      />
      {error && (
        <p id="join-code-error" role="alert" className="text-center text-sm font-bold text-err">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full">
        Vào phòng
      </Button>
    </form>
  );
}
