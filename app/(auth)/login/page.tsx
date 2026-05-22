import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { LoginForm } from "@/components/auth/login-form";

function LoginPage() {
  return (
    <>
      <AuthSidePanel side="left" />
      <div className="flex items-center justify-center p-6 md:p-12">
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
