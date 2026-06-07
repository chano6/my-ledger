"use server";

import { revalidatePath } from "next/cache";
import { categorySchema, updateCategorySchema } from "../schemas/category";
import { createClient } from "../supabase/server";
import type { CategoryInput } from "../types";

export async function createCategory(data: CategoryInput): Promise<void> {
  // 1. zod 검증
  const result = categorySchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const { type, name, color, icon } = result.data;

  // 2. 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  // 3. DB INSERT
  const { error } = await supabase.from("categories").insert({
    user_id: user.id,
    type,
    name,
    color,
    icon,
  });

  if (error) {
    console.error("카테고리 추가 실패:", error);
    throw new Error("카테고리 추가에 실패했습니다.");
  }

  // 4. 캐싱 갱신
  revalidatePath("/categories");
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}

export async function updateCategory(id: string, data: CategoryInput): Promise<void> {
  // 1. zod 검증
  const result = updateCategorySchema.safeParse({ id, ...data });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const { type, name, color, icon } = result.data;

  // 2. 사용자 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  // 3. DB UPDATE
  const { error } = await supabase
    .from("categories")
    .update({
      type,
      name,
      color,
      icon,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("카테고리 수정 실패:", error);
    throw new Error("카테고리 수정에 실패했습니다.");
  }

  // 4. 캐싱 갱신
  revalidatePath("/categories");
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}

export async function deleteCategory(id: string) {
  if (!id) {
    throw new Error("카테고리 ID가 필요합니다.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("categories").delete().eq("id", id).eq("user_id", user.id);

  if (error) {
    console.error("카테고리 삭제 실패:", error);
    throw new Error("카테고리 삭제에 실패했습니다.");
  }

  revalidatePath("/categories");
  revalidatePath("/transactions");
  revalidatePath("/dashboard");
}
