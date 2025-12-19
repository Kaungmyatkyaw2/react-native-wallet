import CButton from "@/components/shared/form/c-button";
import CInput from "@/components/shared/form/c-input";
import { useTheme } from "@/contexts/theme.context";
import { ChangePasswordSchema, ChangePasswordType } from "@/schema/auth.schema";
import { changePassword } from "@/services/supabase.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

const ChangePasswordForm = () => {
  const { colors } = useTheme();
  const { control, handleSubmit, reset } = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: ChangePasswordType) => {
    try {
      setLoading(true);

      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      Toast.show({
        type: "success",
        text1: "Successfully changed password",
      });

      reset();
      router.back();
    } catch (error) {
      console.error("Error while changing password: ", error);
      Toast.show({
        type: "error",
        text1: (error as Error).message || "Failed to change password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.primary }]}
    >
      <Controller
        control={control}
        name="oldPassword"
        render={({ field, fieldState }) => (
          <CInput
            label="Old Password"
            placeholder="Enter your current password"
            labelStyle={[styles.label, { color: colors.text.secondary }]}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            value={field.value}
            isPassword
            required
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field, fieldState }) => (
          <CInput
            label="New Password"
            placeholder="Enter your new password"
            labelStyle={[styles.label, { color: colors.text.secondary }]}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            value={field.value}
            isPassword
            required
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <CInput
            label="Confirm New Password"
            placeholder="Confirm your new password"
            labelStyle={[styles.label, { color: colors.text.secondary }]}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            value={field.value}
            isPassword
            required
          />
        )}
      />

      <CButton
        style={[styles.button, { shadowColor: colors.primary.main }]}
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
      >
        CHANGE PASSWORD
      </CButton>
    </View>
  );
};

export default ChangePasswordForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 35,
    flexDirection: "column",
    gap: 25,
    minHeight: "100%",
  },
  label: {
    fontFamily: "StackSans-SemiBold",
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
  },
});
