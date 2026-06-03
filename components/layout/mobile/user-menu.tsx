"use client";

import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/auth";

type MobileUserMenuProps = {
  userName: string;
  userEmail: string;
};

export function MobileUserMenu({ userName, userEmail }: MobileUserMenuProps) {
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error("로그아웃에 실패했어요", {
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("로그아웃 실패:", error);
    }
  };

  const initial = userName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full bg-peach-soft text-[14px] font-bold text-peach-deep transition-opacity hover:opacity-80"
          aria-label="사용자 메뉴"
        >
          {initial}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-fg">{userName}</span>
            <span className="truncate text-[11px] text-fg-soft">{userEmail}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled className="cursor-pointer">
          <User className="mr-2 h-3.5 w-3.5" />
          <span>프로필 (준비 중)</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-coral focus:bg-coral-soft focus:text-coral"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
