import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const wordCount = (strIn: string) => {
  const trimStr = strIn?.trim();

  if (trimStr === "") {
    return 0;
  }

  const wordArr = trimStr?.split(/\s+/);
  return wordArr?.length;
};
