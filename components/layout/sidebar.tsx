import { SidebarContent } from "./sidebar-content";

type SidebarProps = {
  userEmail: string;
};

export function Sidebar({ userEmail }: SidebarProps) {
  return (
    <aside className="hidden w-62 shrink-0 flex-col border-r border-border bg-bg-sunken md:flex">
      <SidebarContent userEmail={userEmail} />
    </aside>
  );
}
