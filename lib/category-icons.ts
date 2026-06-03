import {
  Briefcase,
  Bus,
  Car,
  Coffee,
  Film,
  Gift,
  Heart,
  Home,
  type LucideIcon,
  Plane,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Tag,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

export type CategoryIconKey =
  | "tag"
  | "utensils-crossed"
  | "home"
  | "shopping-cart"
  | "shopping-bag"
  | "car"
  | "bus"
  | "plane"
  | "film"
  | "heart"
  | "gift"
  | "sparkles"
  | "coffee"
  | "smartphone"
  | "briefcase"
  | "wallet";

// 아이콘 이름 → 컴포넌트
export const CATEGORY_ICONS: Record<CategoryIconKey, LucideIcon> = {
  tag: Tag,
  "utensils-crossed": UtensilsCrossed, // 식비
  home: Home, // 주거
  "shopping-cart": ShoppingCart, // 장보기
  "shopping-bag": ShoppingBag, // 쇼핑
  car: Car, // 자동차
  bus: Bus, // 대중교통
  plane: Plane, // 여행
  film: Film, // 여가, 영화
  heart: Heart, // 의료, 건강
  gift: Gift, // 선물
  sparkles: Sparkles, // 미용
  coffee: Coffee, // 카페
  smartphone: Smartphone, // 통신
  briefcase: Briefcase, // 업무
  wallet: Wallet, // 월급, 수입
};

// 아이콘 라벨 (선택 UI용)
export const CATEGORY_ICON_LABELS: Record<CategoryIconKey, string> = {
  tag: "기본",
  "utensils-crossed": "식비",
  home: "주거",
  "shopping-cart": "장보기",
  "shopping-bag": "쇼핑",
  car: "자동차",
  bus: "대중교통",
  plane: "여행",
  film: "여가",
  heart: "의료",
  gift: "선물",
  sparkles: "미용",
  coffee: "카페",
  smartphone: "통신",
  briefcase: "업무",
  wallet: "월급",
};

// 아이콘 가져오기
export function getCategoryIcon(iconKey: string): LucideIcon {
  return CATEGORY_ICONS[iconKey as CategoryIconKey] ?? Tag;
}
