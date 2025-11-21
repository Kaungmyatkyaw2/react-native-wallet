import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth.context";
import { Tabs } from "expo-router";
import {
  History,
  Home,
  LucideIcon,
  PieChart,
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
  if (focused) {
    return (
      <View style={styles.activeTab}>
        <Icon color={Colors.primary} />
      </View>
    );
  }

  return <Icon color={Colors.text} />;
};

const _layout = () => {
  const { isLoading, session } = useAuth();

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

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: Colors.bg,
          borderTopWidth: 0.5,
          borderTopColor: Colors.mute,
          paddingTop: 20,
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
    backgroundColor: Colors.activeTabBg,
    padding: 10,
    borderRadius: 10,
  },
});
