import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "StackSans-Bold": require("../assets/fonts/StackSansText-Bold.ttf"),
    "StackSans-ExtraLight": require("../assets/fonts/StackSansText-ExtraLight.ttf"),
    "StackSans-Light": require("../assets/fonts/StackSansText-Light.ttf"),
    "StackSans-Medium": require("../assets/fonts/StackSansText-Medium.ttf"),
    "StackSans-Regular": require("../assets/fonts/StackSansText-Regular.ttf"),
    "StackSans-SemiBold": require("../assets/fonts/StackSansText-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
