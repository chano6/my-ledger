"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { SidebarContent } from "./sidebar-content";

type MobileSidebarProps = {
  userEmail: string;
};

export function MobileSidebar({ userEmail }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="메뉴 열기">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-70 bg-bg-sunken p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>메뉴</SheetTitle>
          <SheetDescription>가계부 페이지로 이동하는 메뉴입니다.</SheetDescription>
        </SheetHeader>
        <SidebarContent userEmail={userEmail} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
