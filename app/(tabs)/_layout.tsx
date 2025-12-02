import { useAuth } from "@/contexts/auth.context";
import { useTheme } from "@/contexts/theme.context";
import { Redirect, Tabs, usePathname } from "expo-router";
import {
  History,
  Home,
  LucideIcon,
  PieChart,
  PlusIcon,
  Settings,
} from "lucide-react-native";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const CustomTab = ({
  focused,
  icon: Icon,
}: {
  focused: boolean;
  icon: LucideIcon;
}) => {
  const { colors } = useTheme();

  if (focused) {
    return (
      <View
        style={[
          styles.activeTab,
          { backgroundColor: colors.background.activeTab },
        ]}
      >
        <Icon color={colors.primary.main} />
      </View>
    );
  }

  return <Icon color={colors.text.primary} />;
};

const _layout = () => {
  const { isLoading, session } = useAuth();
  const { colors } = useTheme();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <View
        style={{
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopWidth: 0.5,
          borderTopColor: colors.text.muted,
          paddingTop: 20,
          display: pathname.includes("create") ? "none" : "flex",
        },
      }}
    >
      <Tabs.Protected guard={session != null}>
        <Tabs.Screen
          name="index"
          options={{
            title: "index",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <CustomTab focused={focused} icon={Home} />
            ),
          }}
        />
        <Tabs.Screen
          name="overview"
          options={{
            title: "Overview",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <CustomTab focused={focused} icon={PieChart} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: () => (
              <View
                style={[
                  styles.createTab,
                  { backgroundColor: colors.primary.main },
                ]}
              >
                <PlusIcon color={colors.text.white} />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <CustomTab focused={focused} icon={History} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <CustomTab focused={focused} icon={Settings} />
            ),
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  activeTab: {
    padding: 10,
    borderRadius: 10,
  },
  createTab: {
    width: 65,
    height: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
