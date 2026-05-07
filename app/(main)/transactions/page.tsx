import Link from "next/link";
import TransactionList from "@/components/transactions/transaction-list";
import { Button } from "@/components/ui/button";
import { getTransactions } from "@/lib/queries/transactions";

async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <>
      {/* 헤더 + 추가 버튼 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">거래 내역</h1>
          <p className="mt-1 text-muted-foreground">전체 {transactions.length}건의 거래</p>
        </div>
        <Button asChild>
          <Link href="/transactions/new">+ 새 거래</Link>
        </Button>
      </div>

      {/* 거래 목록 */}
      <TransactionList transactions={transactions} />
    </>
  );
}

export default TransactionsPage;
