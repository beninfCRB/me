import { type ClassValue, clsx } from "clsx"
import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { cva }