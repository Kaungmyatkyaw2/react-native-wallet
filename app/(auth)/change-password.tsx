import ChangePasswordForm from "@/components/setting/change-password-form";
import CText from "@/components/shared/c-text";
import { useTheme } from "@/contexts/theme.context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ChangePasswordScreen = () => {
  const { colors } = useTheme();

  return (
    <View>
      <View
        style={[
          styles.headerWrapper,
          { backgroundColor: colors.background.primary },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={[styles.backButton, { borderColor: colors.border.primary }]}
        >
          <ChevronLeft color={colors.text.primary} />
        </TouchableOpacity>
        <CText style={[styles.headerTitleText, { color: colors.text.primary }]}>
          Change Password
        </CText>
      </View>

      <ChangePasswordForm />
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleText: {
    fontFamily: "StackSans-SemiBold",
    fontSize: 18,
    textAlign: "center",
    position: "relative",
    width: "100%",
    textTransform: "capitalize",
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: "flex-start",
    position: "absolute",
    left: 20,
    top: 50,
  },
});
