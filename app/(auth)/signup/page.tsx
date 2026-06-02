import type { Metadata } from "next";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "회원가입",
  description: "우리집 가계부에 가입하고 개인 가계부 관리를 시작하세요.",
};

function SignupPage() {
  return (
    <>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <SignupForm />
      </div>
      <AuthSidePanel side="right" />
    </>
  );
}

export default SignupPage;
