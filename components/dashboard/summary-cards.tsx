import { formatCurrency } from "@/lib/format";
import { getCurrentMonthSummary } from "@/lib/queries/stats";

export async function SummaryCards() {
  const { income, expense, balance } = await getCurrentMonthSummary();

  return (
    <div className="mb-8 grid grid-cols-3 gap-4">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">이번 달 수입</p>
        <p className="mt-1 text-2xl font-bold text-green-600">{formatCurrency(income)}</p>
      </div>
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">이번 달 지출</p>
        <p className="mt-1 text-2xl font-bold text-red-600">{formatCurrency(expense)}</p>
      </div>
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">잔액</p>
        <p className="mt-1 text-2xl font-bold">{formatCurrency(balance)}</p>
      </div>
    </div>
  );
}
