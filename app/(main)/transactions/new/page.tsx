import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function NewTransactionPage() {
  // 오늘 날짜 (input의 기본값으로 사용)
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">새 거래 추가</h1>
        <p className="mt-1 text-muted-foreground">수입 또는 지출 내역을 입력하세요.</p>
      </div>

      {/* 폼 */}
      <form className="max-w-md space-y-4">
        {/* 수입/지출 선택 */}
        <div className="grid gap-2">
          <Label htmlFor="type">유형</Label>
          <Select name="type" defaultValue="expense">
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">지출</SelectItem>
              <SelectItem value="income">수입</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 금액 */}
        <div className="grid gap-2">
          <Label htmlFor="amount">금액</Label>
          <Input id="amount" name="amount" type="number" placeholder="0" min="1" required />
        </div>

        {/* 카테고리 */}
        <div className="grid gap-2">
          <Label htmlFor="category">카테고리</Label>
          <Select name="category_id">
            <SelectTrigger id="category">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder">(다음 단계에서 진짜 카테고리로 변경)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 날짜 */}
        <div className="grid gap-2">
          <Label htmlFor="date">날짜</Label>
          <Input id="date" name="date" type="date" defaultValue={today} required />
        </div>

        {/* 메모 */}
        <div className="grid gap-2">
          <Label htmlFor="description">메모 (선택)</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="거래 내용을 입력하세요"
            rows={3}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            저장
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/transactions">취소</Link>
          </Button>
        </div>
      </form>
    </>
  );
}

export default NewTransactionPage;
