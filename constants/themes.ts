export const Themes = {
  light: {
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
      black: "#000000",
    },
    charts: {
      pie: {
        primary: "#0071ff",
        secondary: "#00b8ff",
        accent: "#0044cc",
        highlight: "#66a3ff",
      },
    },
  },
  dark: {
    primary: {
      main: "#4d9dff",
      dark: "#0071ff",
      light: "#80b8ff",
    },
    background: {
      primary: "#121212",
      muted: "#2d2d2d",
      activeTab: "#4d9dff3a",
    },
    text: {
      primary: "#f3f3f3",
      secondary: "#a7a7a7",
      white: "#ffffff",
      muted: "#838282",
    },
    border: {
      primary: "#404040",
    },
    status: {
      red: "#f87171",
      green: "#34d399",
      yellow: "#fbbf24",
      blue: "#60a5fa",
      redMuted: "#f871718c",
    },
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    charts: {
      pie: {
        primary: "#4d9dff",
        secondary: "#00b8ff",
        accent: "#0071ff",
        highlight: "#80b8ff",
      },
    },
  },
};

export type ThemeMode = keyof typeof Themes;
export type ColorType = keyof typeof Themes.light;
