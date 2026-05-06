import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Ledger</h1>
      <p>로그인 상태: {user ? `✅ ${user.email}` : "❌ 비로그인"}</p>
    </main>
  );
}
