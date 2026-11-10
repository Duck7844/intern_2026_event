import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Chip dạng pill. Có 2 cách dùng:
 * - Chip lọc (interactive): <Chip active onClick />  -> render <button>
 * - Chip nhãn (static):     <Chip tone="peach" as="span">Hội nghị</Chip>
 */
const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 text-sm font-bold whitespace-nowrap transition-colors",
  {
    variants: {
      tone: {
        neutral: "border-line bg-white text-ink-2",
        ink: "border-ink bg-ink text-white",
        yellow: "border-yellow-deep/60 bg-yellow/60 text-ink",
        mint: "border-mint bg-mint/40 text-ok",
        peri: "border-peri bg-peri/40 text-ink",
        peach: "border-peach bg-chip-peach-bg text-chip-peach",
        pink: "border-pink bg-pink/40 text-ink",
        lilac: "border-lilac bg-lilac/50 text-ink",
      },
      size: {
        sm: "h-7 text-xs",
        md: "h-9",
      },
      interactive: {
        true: "cursor-pointer hover:border-ink-4 focus-visible:ring-4 focus-visible:ring-focus outline-none",
        false: "",
      },
    },
    defaultVariants: { tone: "neutral", size: "md", interactive: false },
  },
);

type ChipProps = React.ComponentProps<"button"> &
  VariantProps<typeof chipVariants> & {
    /** Trạng thái đang chọn (chip lọc). Khi true, chip đổi sang tone ink. */
    active?: boolean;
    as?: "button" | "span";
  };

function Chip({
  className,
  tone,
  size,
  interactive,
  active,
  as,
  type,
  ...props
}: ChipProps) {
  const isButton = (as ?? "button") === "button";
  const classes = cn(
    chipVariants({
      tone: active ? "ink" : tone,
      size,
      interactive: interactive ?? isButton,
    }),
    className,
  );

  if (!isButton) {
    const { onClick: _onClick, ...spanProps } = props;
    void _onClick;
    return (
      <span
        data-slot="chip"
        className={classes}
        {...(spanProps as React.ComponentProps<"span">)}
      />
    );
  }

  return (
    <button
      data-slot="chip"
      type={type ?? "button"}
      aria-pressed={active}
      className={classes}
      {...props}
    />
  );
}

export { Chip, chipVariants, type ChipProps };
