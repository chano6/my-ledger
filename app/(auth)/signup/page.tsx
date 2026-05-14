import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { signup } from "@/lib/actions/auth";

function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form action={signup} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>가계부 시작을 위한 계정을 만들어주세요.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="6자 이상"
                required
                minLength={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <SubmitButton className="w-full" pendingLabel="가입 중...">
              회원가입
            </SubmitButton>
            <p className="text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="underline">
                로그인
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default SignupPage;
