import { TransactionList } from "@/components/transactions/transaction-list";
import { getTransactions } from "@/lib/queries/transactions";

export async function RecentTransactions() {
  const transactions = await getTransactions({ limit: 5 });

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">최근 거래</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
}
