import { clsx, type ClassValue } from "clsx";

/** Merge conditional classnames. `cn("btn", isActive && "btn-primary")` */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
