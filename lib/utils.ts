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
