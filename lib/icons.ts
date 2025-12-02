import {
  Briefcase,
  Bus,
  CreditCard,
  DollarSign,
  Gift,
  GraduationCap,
  HeartPulse,
  HelpCircle, // Default icon
  Home,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Tv,
  Utensils,
  Wifi,
} from "lucide-react-native";

export const CategoryIcons = {
  // Expense Categories
  Housing: Home,
  Transportation: Bus,
  "Food & Dining": Utensils,
  Utilities: Wifi,
  Healthcare: HeartPulse,
  Entertainment: Tv,
  Shopping: ShoppingCart,
  "Debt Payments": CreditCard,
  "Personal Care": Sparkles,
  Education: GraduationCap,

  // Income Categories
  Salary: DollarSign,
  Freelance: Briefcase,
  Business: Briefcase,
  Investment: TrendingUp,
  Rental: Home,
  Gifts: Gift,
  "Side Hustle": Briefcase,
  Dividends: TrendingUp,
  Commission: DollarSign,
  Refunds: CreditCard,

  // Other categories (fallback for both types)
  Other: HelpCircle,

  default: HelpCircle,
} as const;

export type CategoryType = keyof typeof CategoryIcons;

export const getCategoryIcon = (category: string) => {
  return CategoryIcons[category as CategoryType] || CategoryIcons.default;
};
