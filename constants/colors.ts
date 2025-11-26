export const Colors = {
  primary: "#0071ff",
  activeTabBg: "#0073ff3a",
  primaryDark: "#02275aff",
  primaryLight: "#4d9dff",
  text: "#120D0D",
  textSecondary: "#838282ff",
  mute: "#A7A7A7",
  border: "#E0E0E0",
  bg: "#FAFAFA",

  textWhite: "#f3f3f3d3",

  white: "#ffffff",

  muteBg: "#dee0e0ff",

  red: "#DC2626",
  green: "#059669",
  yellow: "#D97706",
  blue: "#2563EB",
  redMuteBg: "#dc26268c",
  pieChart: {
    primary: "#0071ff", // Your original primary blue
    secondary: "#00b8ff", // Lighter cyan-blue
    accent: "#0044cc", // Darker blue
    highlight: "#66a3ff", // Soft light blue
  },
};

export type ColorType = keyof typeof Colors;
