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
