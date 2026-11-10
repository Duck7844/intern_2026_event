"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, MessageCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const eventTypes = ["Year-end party", "Hội nghị khách hàng", "Team building", "Hội thảo / workshop", "Khác"];
const guestRanges = ["Dưới 50", "50 – 150", "150 – 300", "Trên 300"];

const schema = z.object({
  name: z.string().trim().min(2, "Nhập họ và tên của bạn"),
  company: z.string().trim().optional(),
  eventType: z.string().min(1, "Chọn loại sự kiện"),
  guests: z.string().min(1, "Chọn số khách dự kiến"),
});

type FormValues = z.infer<typeof schema>;

const benefits = [
  "Tư vấn miễn phí, báo giá theo sự kiện",
  "Demo trực tiếp cùng ban tổ chức",
  "Combo check-in + mini game + quay thưởng",
];

/**
 * Section #tu-van. Form tượng trưng: validate phía client, submit chỉ hiện toast,
 * không gửi dữ liệu đi đâu (theo yêu cầu phase 1).
 */
export function ConsultForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", company: "", eventType: eventTypes[0], guests: guestRanges[1] },
  });

  function submit(channel: "zalo" | "whatsapp") {
    return handleSubmit((values) => {
      toast.success(
        `Đã ghi nhận yêu cầu của ${values.name} (demo). Kênh: ${channel === "zalo" ? "Zalo" : "WhatsApp"}.`,
      );
      reset();
    });
  }

  return (
    <section id="tu-van" className="wrap scroll-mt-20 py-6 pb-20 md:py-10 md:pb-28">
      <div className="grid gap-8 rounded-[28px] border-2 border-line bg-yellow/30 p-6 md:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        <div className="flex flex-col gap-5">
          <h2 className="text-[30px] leading-[1.1] md:text-[40px]">Sắp có sự kiện? Nhắn chúng tôi nhé</h2>
          <p className="text-base leading-relaxed text-ink-3 md:text-lg">
            Điền vài thông tin, chúng tôi soạn sẵn tin nhắn. Chọn Zalo hoặc WhatsApp để chat trực
            tiếp với chuyên viên.
          </p>
          <ul className="flex flex-col gap-2.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-bold text-ink-2">
                <Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <form
          noValidate
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 rounded-card border-2 border-line bg-white p-5 md:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Họ và tên" htmlFor="consult-name" error={errors.name?.message}>
              <input
                id="consult-name"
                placeholder="Nguyễn Văn A"
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                className={inputClass}
                {...register("name")}
              />
            </Field>
            <Field label="Công ty" htmlFor="consult-company">
              <input
                id="consult-company"
                placeholder="Tên công ty / agency"
                autoComplete="organization"
                className={inputClass}
                {...register("company")}
              />
            </Field>
            <Field label="Loại sự kiện" htmlFor="consult-type" error={errors.eventType?.message}>
              <select id="consult-type" className={inputClass} {...register("eventType")}>
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Số khách dự kiến" htmlFor="consult-guests" error={errors.guests?.message}>
              <select id="consult-guests" className={inputClass} {...register("guests")}>
                {guestRanges.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button type="button" variant="zalo" disabled={isSubmitting} onClick={submit("zalo")}>
              <Send /> Nhắn qua Zalo
            </Button>
            <Button
              type="button"
              variant="whatsapp"
              disabled={isSubmitting}
              onClick={submit("whatsapp")}
            >
              <MessageCircle /> Nhắn qua WhatsApp
            </Button>
          </div>
          <p className="text-xs text-ink-3">
            Thông tin không lưu trên website, chỉ dùng để soạn tin nhắn. (Bản demo: chỉ hiển thị
            thông báo.)
          </p>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "h-12 w-full rounded-[14px] border-2 border-line-2 bg-white px-4 text-sm font-bold text-ink placeholder:font-semibold placeholder:text-ink-4 focus:border-ink-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-focus aria-invalid:border-err";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-extrabold text-ink-2">
        {label}
      </label>
      {children}
      <p
        className={cn("min-h-4 text-xs font-bold text-err", !error && "invisible")}
        role={error ? "alert" : undefined}
      >
        {error ?? " "}
      </p>
    </div>
  );
}
