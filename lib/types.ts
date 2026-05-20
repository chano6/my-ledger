export type TransactionType = "income" | "expense";

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
  category: Pick<Category, "name" | "color" | "type"> | null;
};

export type ActionState = {
  error: string | null;
} | null;
