import { SidebarContent } from "./sidebar-content";

type SidebarProps = {
  userName: string;
  userEmail: string;
};

export function Sidebar({ userName, userEmail }: SidebarProps) {
  return (
    <aside className="hidden w-62 shrink-0 flex-col border-r border-border bg-bg-sunken md:flex">
      <SidebarContent userName={userName} userEmail={userEmail} />
    </aside>
  );
}
