import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { FilterParams } from "./types";

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

/**
 * FilterParams를 /transactions 페이지 URL 쿼리스트링으로 직렬화
 * falsy 값은 파라미터에서 제외
 * @param params 필터 조건
 * @returns `/transactions` 또는 `/transactions?key=value&...` 형태의 URL 문자열
 */
export function makeTransactionsUrl(params: FilterParams): string {
  const urlParams = new URLSearchParams();

  if (params.type) urlParams.set("type", params.type);
  if (params.categoryId) urlParams.set("category", params.categoryId);
  if (params.startDate) urlParams.set("start", params.startDate);
  if (params.endDate) urlParams.set("end", params.endDate);
  if (params.search) urlParams.set("search", params.search);

  const queryString = urlParams.toString();
  return `/transactions${queryString ? `?${queryString}` : ""}`;
}
