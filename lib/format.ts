import { DATE_PRESETS } from "./constants";

// 금액을 한국어 형식으로 표시: 12345 → "12,345원"
export function formatCurrency(amount: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}

// 날짜를 한국어 형식으로 표시: 2026-05-07 → "5월 7일 (목)"
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(d);
}

// 짧은 날짜 형식: "05.07"
export function formatShortDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  })
    .format(d)
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
}

// 날짜를 "YYYY-MM-DD" 형식으로 변환 (예: 2026-05-07)
export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 이번 달의 시작/종료 날짜
export function getCurrentMonthRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return { start: toDateString(start), end: toDateString(end) };
}

// 지난 달의 시작/종료 날짜
export function getLastMonthRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);

  return { start: toDateString(start), end: toDateString(end) };
}

// 올해의 시작/종료 날짜
export function getCurrentYearRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31);

  return { start: toDateString(start), end: toDateString(end) };
}

// 큰 금액을 짧게 표시
export function formatCompactCurrency(value: number): string {
  if (value === 0) return "0";
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}천만`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}백만`;
  if (value >= 10000) return `${(value / 10000).toFixed(0)}만`;
  return String(value);
}

// 상대 날짜 표시 (예: formatRelativeDate('2026-05-22') => '오늘')
export function formatRelativeDate(date: string | Date): string {
  const target = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - target.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays === -1) return "내일";

  return `${target.getMonth() + 1}월 ${target.getDate()}일`;
}

// 현재 월 1일 ~ 오늘
export function getCurrentMonthDateRange(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return `${month}월 1일 ~ ${month}월 ${day}일`;
}

// 최근 N일 범위 (오늘 포함)
export function getRecentDaysRange(days: number): { start: string; end: string } {
  const now = new Date();
  const start = new Date();
  start.setDate(now.getDate() - (days - 1));

  return { start: toDateString(start), end: toDateString(now) };
}

// 프리셋 우선 + 짧은 날짜
export function formatDateRangeShort(start: string | undefined, end: string | undefined): string {
  if (!start && !end) return "기간 전체";

  // 프리셋 매칭 확인
  const matched = DATE_PRESETS.find((p) => {
    const range = p.getRange();
    return range.start === start && range.end === end;
  });

  if (matched) return matched.label;

  // 사용자 지정 형식: "5월 1일 – 5월 25일"
  if (start && end) {
    return `${formatShortDate(start)} - ${formatShortDate(end)}`;
  }

  if (start) return `${formatShortDate(start)} 이후`;
  if (end) return `${formatShortDate(end)} 이전`;

  return "기간 전체";
}

// 날짜 범위를 자연어로 표시
// @example formatDateRangeLabel() => '전체 기간'
// @example formatDateRangeLabel('2026-05-01', '2026-05-25') => '5월 1일부터 누적'
// @example formatDateRangeLabel('2026-05-01') => '5월 1일부터'
// @example formatDateRangeLabel(undefined, '2026-05-25') => '5월 25일까지'
export function formatDateRangeLabel(start?: string, end?: string): string {
  if (!start && !end) return "전체 기간";

  if (start && end) {
    const d = new Date(start);
    return `${d.getMonth() + 1}월 ${d.getDate()}일부터 누적`;
  }

  if (start) {
    const d = new Date(start);
    return `${d.getMonth() + 1}월 ${d.getDate()}일부터`;
  }

  if (end) {
    const d = new Date(end);
    return `${d.getMonth() + 1}월 ${d.getDate()}일까지`;
  }

  return "전체 기간";
}
