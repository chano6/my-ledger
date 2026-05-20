"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categorySchema } from "../schemas/category";
import { createClient } from "../supabase/server";
import type { ActionState } from "../types";

export async function createCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const result = categorySchema.safeParse({
    type: formData.get("type"),
    name: formData.get("name"),
    color: formData.get("color"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { type, name, color } = result.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "로그인이 필요합니다." };
  }

  const { error } = await supabase.from("categories").insert({
    user_id: user.id,
    type,
    name,
    color,
  });

  if (error) {
    console.error("카테고리 추가 실패:", error);
    return { error: "카테고리 추가에 실패했습니다." };
  }

  revalidatePath("/categories");
  revalidatePath("/transactions/new");
  redirect("/categories");
}
