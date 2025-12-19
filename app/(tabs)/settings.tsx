import ThemeSelectorBottomSheet from "@/components/setting/theme-selector-bottom-sheet";
import CText from "@/components/shared/c-text";
import { useAuth } from "@/contexts/auth.context";
import { useTheme } from "@/contexts/theme.context";
import { supabase } from "@/lib/supabase";
import { getInitials } from "@/lib/utils";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import {
  ChevronRight,
  Lock,
  LucideIcon,
  Palette,
  Power,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface MenuItemProps {
  title: string;
  icon: LucideIcon;
  onPress?: () => void;
}

const MenuItem = ({ title, icon: Icon, onPress }: MenuItemProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.menuItem, { borderColor: colors.border.primary }]}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <View
          style={[
            styles.menuIconWrapper,
            { backgroundColor: colors.background.activeTab },
          ]}
        >
          <Icon color={colors.primary.main} size={20} />
        </View>
        <CText style={[styles.menuTitle, { color: colors.text.primary }]}>
          {title}
        </CText>
      </View>
      <ChevronRight color={colors.text.secondary} />
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const { colors } = useTheme();
  const { isLoading, session } = useAuth();
  const [isOpenTheme, setIsOpenTheme] = useState(false);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const userInfo = session?.user.user_metadata;

  const handleLogout = async () => {
    const response = await supabase.auth.signOut();

    if (response.error) {
      Toast.show({
        type: "error",
        text1: response.error.code,
        text2: response.error.message,
      });
      return;
    }

    Toast.show({ type: "success", text1: "Successfully logged out" });
    router.push("/login");
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: colors.background.primary },
        ]}
      >
        <CText style={[styles.heading, { color: colors.primary.dark }]}>
          Settings
        </CText>

        <ThemeSelectorBottomSheet
          isOpen={isOpenTheme}
          onClose={() => setIsOpenTheme(false)}
        />
        <View
          style={[
            styles.profileBox,
            {
              borderColor: colors.border.primary,
              backgroundColor: colors.background.primary,
            },
          ]}
        >
          <View
            style={[styles.avatar, { backgroundColor: colors.primary.main }]}
          >
            <CText style={[styles.avatarText, { color: colors.text.white }]}>
              {getInitials(userInfo?.display_name)}
            </CText>
          </View>

          <View>
            <CText style={[styles.profileName, { color: colors.text.primary }]}>
              {userInfo?.display_name}
            </CText>
            <CText
              style={[styles.profileEmail, { color: colors.text.secondary }]}
            >
              {userInfo?.email}
            </CText>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuList}>
          {/* <MenuItem icon={Globe} title="Change Language" /> */}
          <MenuItem
            icon={Palette}
            title="Change Theme"
            onPress={() => setIsOpenTheme(true)}
          />
          <MenuItem
            icon={Lock}
            title="Change Password"
            onPress={() => router.push("/change-password")}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutBtn, { borderColor: colors.border.primary }]}
          onPress={() => {
            handleLogout();
          }}
        >
          <Power size={20} color={colors.status.red} />
          <CText style={[styles.logoutText, { color: colors.status.red }]}>
            Logout
          </CText>
        </TouchableOpacity>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    minHeight: "100%",
  },

  heading: {
    fontSize: 20,
    fontFamily: "StackSans-Bold",
  },

  profileBox: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 40,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 19,
    fontFamily: "StackSans-Bold",
  },

  profileName: {
    fontSize: 15,
    fontFamily: "StackSans-SemiBold",
  },

  profileEmail: {
    fontSize: 12,
    marginTop: 5,
  },

  menuList: {
    flexDirection: "column",
    marginTop: 40,
    gap: 20,
  },

  menuItem: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuIconWrapper: {
    padding: 10,
    borderRadius: 25,
  },

  menuTitle: {
    fontFamily: "StackSans-SemiBold",
  },

  logoutBtn: {
    marginTop: 50,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  logoutText: {
    fontFamily: "StackSans-SemiBold",
  },
});
