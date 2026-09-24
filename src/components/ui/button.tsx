import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "gradient"
    | "glass"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const buttonVariantsObj = {
  base: [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium",
    "ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "transition-[color,background-color,border-color,box-shadow,transform,filter] duration-300 ease-silk",
    "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ].join(" "),
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-foreground/15 bg-foreground/[0.02] hover:border-primary/40 hover:bg-foreground/[0.06] hover:text-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-foreground/[0.06] hover:text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      gradient:
        "group overflow-hidden bg-gradient-to-r from-primary via-purple-500 to-fuchsia-500 text-white shadow-glow hover:shadow-glow-lg hover:brightness-110",
      glass:
        "glass-card text-foreground hover:border-primary/40 hover:shadow-glow",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-full px-3.5",
      lg: "h-12 rounded-xl px-6 text-[0.95rem]",
      icon: "h-10 w-10",
    },
  },
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          buttonVariantsObj.base,
          buttonVariantsObj.variants.variant[variant],
          buttonVariantsObj.variants.size[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
