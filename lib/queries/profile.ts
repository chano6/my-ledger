import { createClient } from "../supabase/server";
import type { Profile } from "../types";

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  if (error) {
    console.error("프로필 조회 실패:", error);
    return null;
  }

  return data as Profile;
}
