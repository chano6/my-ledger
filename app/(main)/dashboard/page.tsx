import TransactionList from "@/components/transactions/transaction-list";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";
import { formatCurrency } from "@/lib/format";
import { getTransactions } from "@/lib/queries/transactions";
import { createClient } from "@/lib/supabase/server";

async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 거래 목록 가져오기
  const transactions = await getTransactions();

  // 이번 달 통계 계산
  const now = new Date();
  const thisMonth = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  });

  const totalIncome = thisMonth
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = thisMonth
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="container mx-auto max-w-4xl p-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Ledger</h1>
        <p className="mt-1 text-muted-foreground">안녕하세요, {user?.email}님 👋</p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="mb-2 text-xl font-semibold">대시보드</h2>

        {/* 이번 달 요약 카드 */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">이번 달 수입</p>
            <p className="mt-1 text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">이번 달 지출</p>
            <p className="mt-1 text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">잔액</p>
            <p className="mt-1 text-2xl font-bold">{formatCurrency(balance)}</p>
          </div>
        </div>

        {/* 거래 목록 */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">최근 거래</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
