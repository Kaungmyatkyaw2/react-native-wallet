export const Colors = {
  primary: {
    main: "#0071ff",
    dark: "#02275aff",
    light: "#4d9dff",
  },
  background: {
    primary: "#FAFAFA",
    muted: "#dee0e0ff",
    activeTab: "#0073ff3a",
  },
  text: {
    primary: "#120D0D",
    secondary: "#838282ff",
    white: "#f3f3f3d3",
    muted: "#A7A7A7",
  },
  border: {
    primary: "#E0E0E0",
  },
  status: {
    red: "#DC2626",
    green: "#059669",
    yellow: "#D97706",
    blue: "#2563EB",
    redMuted: "#dc26268c",
  },
  common: {
    white: "#ffffff",
  },
  charts: {
    pie: {
      primary: "#0071ff",
      secondary: "#00b8ff",
      accent: "#0044cc",
      highlight: "#66a3ff",
    },
  },
};

export type ColorType = keyof typeof Colors;
