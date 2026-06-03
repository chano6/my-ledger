import type { ComponentType } from "react";

export type Profile = {
  id: string;
  name: string;
  created_at: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
};

export type TransactionType = "income" | "expense";

export type Variant = TransactionType | "balance";

export type TransactionFilter = {
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  search?: string;
};

export type Category = {
  id: string;
  user_id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon: string;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  category_id: string | null;
  amount: number;
  type: TransactionType;
  description: string | null;
  date: string;
  created_at: string;
};

// 카테고리 정보가 같이 들어간 거래 (조인 결과)
export type TransactionWithCategory = Transaction & {
  category: Pick<Category, "name" | "icon" | "color" | "type"> | null;
};

export type ActionState = {
  error: string | null;
} | null;

export type CategoryStats = {
  category_id: string;
  category_name: string;
  category_icon: string;
  category_color: string;
  total: number;
  count: number;
};

export type MonthlySummary = {
  income: number;
  expense: number;
  balance: number;
};

export type MonthlyStats = {
  month: string; // '2026-05' 형식
  monthLabel: string; // '5월' (표시용)
  income: number;
  expense: number;
};

export type FilterParams = {
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
};
