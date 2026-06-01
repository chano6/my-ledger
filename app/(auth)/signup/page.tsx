import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { SignupForm } from "@/components/auth/signup-form";

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
