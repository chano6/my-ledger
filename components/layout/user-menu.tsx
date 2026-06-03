"use client";

import { ChevronUp, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/lib/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type UserMenuProps = {
  userName: string;
  userEmail: string;
};

export function UserMenu({ userName, userEmail }: UserMenuProps) {
  const handleSignOut = async () => {
    try {
      await logout();
      // logout에서 redirect하므로 도달 안 함
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
          className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-bg-sunken"
        >
          {/* 아바타 */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-peach-soft text-[14px] font-bold text-peach-deep">
            {initial}
          </div>

          {/* 사용자 정보 */}
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold text-fg">{userName}</div>
            <div className="truncate text-[11px] text-fg-soft">{userEmail}</div>
          </div>

          <ChevronUp className="h-3.5 w-3.5 shrink-0 text-fg-soft" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" side="top" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-fg">{userName}</span>
            <span className="truncate text-[11px] text-fg-soft">{userEmail}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* TODO: 프로필 페이지 */}
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
