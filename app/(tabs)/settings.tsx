import CText from "@/components/shared/c-text";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth.context";
import { supabase } from "@/lib/supabase";
import { getInitials } from "@/lib/utils";
import { router } from "expo-router";
import {
  ChevronRight,
  Globe,
  Lock,
  LucideIcon,
  Palette,
  Power,
} from "lucide-react-native";
import React from "react";
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
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIconWrapper}>
          <Icon color={Colors.primary} size={20} />
        </View>
        <CText style={styles.menuTitle}>{title}</CText>
      </View>
      <ChevronRight color={Colors.textSecondary} />
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const { isLoading, session } = useAuth();

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
    <SafeAreaView style={styles.container}>
      <CText style={styles.heading}>Settings</CText>

      <View style={styles.profileBox}>
        <View style={styles.avatar}>
          <CText style={styles.avatarText}>
            {getInitials(userInfo?.display_name)}
          </CText>
        </View>

        <View>
          <CText style={styles.profileName}>{userInfo?.display_name}</CText>
          <CText style={styles.profileEmail}>{userInfo?.email}</CText>
        </View>
      </View>

      {/* Menu List */}
      <View style={styles.menuList}>
        <MenuItem icon={Globe} title="Change Language" />
        <MenuItem icon={Palette} title="Change Theme" />
        <MenuItem icon={Lock} title="Change Password" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          handleLogout();
        }}
      >
        <Power size={20} color={Colors.red} />
        <CText style={styles.logoutText}>Logout</CText>
      </TouchableOpacity>
    </SafeAreaView>
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
    color: Colors.primaryDark,
  },

  profileBox: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 40,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: Colors.textWhite,
    fontSize: 19,
    fontFamily: "StackSans-Bold",
  },

  profileName: {
    fontSize: 15,
    fontFamily: "StackSans-SemiBold",
  },

  profileEmail: {
    color: Colors.textSecondary,
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
    borderColor: Colors.border,
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
    borderRadius: 100,
    backgroundColor: Colors.activeTabBg,
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
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  logoutText: {
    fontFamily: "StackSans-SemiBold",
    color: Colors.red,
  },
});
