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
