"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function createTransaction(formData: FormData) {
  // 1. formData에서 값 추출
  const type = formData.get("type") as "income" | "expense";
  const amount = Number(formData.get("amount"));
  const categoryId = formData.get("category_id") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;

  // 2. 유효성 검사
  if (!type || !amount || !categoryId || !date) {
    throw new Error("필수 입력값이 누락되었습니다.");
  }

  if (amount <= 0) {
    throw new Error("금액은 0보다 커야 합니다.");
  }

  // 3. 현재 로그인된 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  // 4. DB에 INSERT
  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    type,
    amount,
    category_id: categoryId,
    date,
    description: description || null,
  });

  if (error) {
    console.error("거래 추가 실패:", error);
    throw new Error("거래 추가에 실패했습니다.");
  }

  // 5. 캐싱 갱신 + 페이지 이동
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  redirect("/transactions");
}

export async function deleteTransaction(id: string) {
  if (!id) {
    throw new Error("거래 ID가 필요합니다.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("transactions").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    console.error("거래 삭제 실패:", error);
    throw new Error("거래 삭제에 실패했습니다.");
  }

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}

export async function updateTransaction(formData: FormData) {
  // 1. formData에서 값 추출
  const id = formData.get("id") as string;
  const type = formData.get("type") as "income" | "expense";
  const amount = Number(formData.get("amount"));
  const categoryId = formData.get("category_id") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;

  // 2. 유효성 검사
  if (!id) {
    throw new Error("거래 ID가 필요합니다.");
  }

  if (!type || !amount || !categoryId || !date) {
    throw new Error("필수 입력값이 누락되었습니다.");
  }

  if (amount <= 0) {
    throw new Error("금액은 0보다 커야 합니다.");
  }

  // 3. 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  // 4. DB UPDATE
  const { error } = await supabase
    .from("transactions")
    .update({
      type,
      amount,
      category_id: categoryId,
      date,
      description: description || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("거래 수정 실패:", error);
    throw new Error("거래 수정에 실패했습니다.");
  }

  // 5. 캐싱 갱신 + 페이지 이동
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  redirect("/transactions");
}
