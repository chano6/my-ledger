import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 두 값의 증감률(%)을 계산
 * @param current 현재 값
 * @param previous 이전 값
 * @returns 증감률 (%), 이전 값이 0이면 null
 */
export function calcChangeRate(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}
