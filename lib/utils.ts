export const getGreetingText = () => {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 9) {
    return "Good morning!";
  } else if (hour >= 9 && hour < 12) {
    return "Good afternoon!";
  } else if (hour >= 12 && hour < 18) {
    return "Good evening!";
  }

  return "Good night!";
};

export const formatDate = (date: Date | string) => {
  if (date instanceof Date) {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  return "";
};

export const formatAmount = (amount: number = 0, currency: string = "") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

import {
  BookOpen,
  Briefcase,
  Bus,
  HelpCircle, // Default icon
  ShoppingCart,
  Utensils,
  Wallet,
} from "lucide-react-native";

export const CategoryIcons = {
  Tuition: BookOpen,
  Shopping: ShoppingCart,
  Transportation: Bus,
  Food: Utensils,
  Job: Briefcase,
  "Pocket Money": Wallet,
  default: HelpCircle,
} as const;

export type CategoryType = keyof typeof CategoryIcons;

export const getCategoryIcon = (category: string) => {
  return CategoryIcons[category as CategoryType] || CategoryIcons.default;
};
