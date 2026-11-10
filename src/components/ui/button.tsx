import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button kiểu pill của site: viền 2px, chữ extrabold, primary vàng có bóng cứng.
 * Dùng cho <button>. Với <Link>, dùng className={buttonVariants({...})}.
 * Các variant "ghost" và "outline" được shadcn Sheet/Dialog dùng cho nút đóng, giữ tên.
 */
const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-2",
    "font-extrabold whitespace-nowrap no-underline select-none outline-none",
    "transition-[transform,background-color,border-color,box-shadow,color] duration-150",
    "focus-visible:ring-4 focus-visible:ring-focus",
    "active:translate-y-[2px] active:shadow-none",
    "disabled:pointer-events-none disabled:border-line-2 disabled:bg-disabled disabled:text-disabled-text disabled:shadow-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-ink bg-yellow text-ink shadow-hard hover:bg-yellow-deep",
        ghost: "border-ink bg-white text-ink shadow-hard hover:bg-cream",
        outline: "border-ink bg-transparent text-ink hover:bg-white",
        subtle: "border-line bg-white text-ink hover:border-ink-4 hover:bg-cream",
        dark: "border-ink bg-ink text-white shadow-hard hover:bg-ink-2",
        soft: "border-transparent bg-white/70 text-ink-2 hover:bg-white hover:text-ink",
        zalo: "border-zalo-deep bg-zalo text-white shadow-[0_3px_0_0_var(--color-zalo-deep)] hover:brightness-105",
        whatsapp:
          "border-whatsapp-deep bg-whatsapp text-white shadow-[0_3px_0_0_var(--color-whatsapp-deep)] hover:brightness-105",
        link: "h-auto border-transparent bg-transparent px-0 text-link underline-offset-4 shadow-none hover:underline active:translate-y-0",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "size-11 p-0",
        "icon-sm": "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
