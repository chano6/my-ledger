import { createClient } from "@/lib/supabase/server";
import type { Category } from "../types";

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("카테고리 조회 실패: ", error);
    return [];
  }

  return data as Category[];
}
