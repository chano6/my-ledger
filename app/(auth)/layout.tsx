import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="grid min-h-screen md:grid-cols-2">{children}</div>;
}
