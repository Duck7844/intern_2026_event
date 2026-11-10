import * as React from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Thẻ heading, mặc định h2 */
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Slot bên phải (ví dụ link "Xem tất cả") khi align="left" */
  aside?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
  aside,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 md:mb-10",
        align === "center" && "items-center text-center",
        align === "left" && aside && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex max-w-2xl flex-col gap-3", align === "center" && "items-center")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Tag
          className={cn(
            "text-balance",
            Tag === "h1"
              ? "text-[34px] leading-[1.05] md:text-[56px]"
              : "text-[28px] leading-[1.1] md:text-[38px]",
          )}
        >
          {title}
        </Tag>
        {description && (
          <p className="text-base leading-relaxed text-ink-3 md:text-lg">{description}</p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
