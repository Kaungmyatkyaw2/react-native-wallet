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

export const getInitials = (name?: string) => {
  if (!name) return "U"; // fallback

  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("")
    .slice(0, 3);
};
