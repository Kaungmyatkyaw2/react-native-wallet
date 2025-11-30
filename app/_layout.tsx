import { AuthProvider } from "@/contexts/auth.context";
import { ThemeProvider } from "@/contexts/theme.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "StackSans-Bold": require("../assets/fonts/StackSansText-Bold.ttf"),
    "StackSans-ExtraLight": require("../assets/fonts/StackSansText-ExtraLight.ttf"),
    "StackSans-Light": require("../assets/fonts/StackSansText-Light.ttf"),
    "StackSans-Medium": require("../assets/fonts/StackSansText-Medium.ttf"),
    "StackSans-Regular": require("../assets/fonts/StackSansText-Regular.ttf"),
    "StackSans-SemiBold": require("../assets/fonts/StackSansText-SemiBold.ttf"),
  });

  // Use useAuth instead of useSession

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <ThemeProvider>
          <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>

            <Toast topOffset={60} />
          </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
