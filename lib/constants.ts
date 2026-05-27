import {
  getCurrentMonthRange,
  getCurrentYearRange,
  getLastMonthRange,
  getRecentDaysRange,
} from "./format";

// 날짜 프리셋 정의
export const DATE_PRESETS = [
  { label: "이번 달", getRange: getCurrentMonthRange },
  { label: "지난 달", getRange: getLastMonthRange },
  { label: "최근 7일", getRange: () => getRecentDaysRange(7) },
  { label: "최근 30일", getRange: () => getRecentDaysRange(30) },
  { label: "올해", getRange: getCurrentYearRange },
];
