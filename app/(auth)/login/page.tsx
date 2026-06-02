import type { Metadata } from "next";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "로그인",
  description: "우리집 가계부. 계정으로 로그인하세요.",
};

function LoginPage() {
  return (
    <>
      <AuthSidePanel side="left" />
      <div className="flex items-center justify-center p-6 lg:p-12">
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
