export type Category = {
  id: string;
  user_id: string;
  name: string;
  type: "income" | "expense";
  color: string;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  category_id: string | null;
  amount: number;
  type: "income" | "expense";
  description: string | null;
  date: string;
  created_at: string;
};

// 카테고리 정보가 같이 들어간 거래 (조인 결과)
export type TransactionWithCategory = Transaction & {
  category: Pick<Category, "name" | "color" | "type"> | null;
};
