import CText from "@/components/shared/c-text";
import CButton from "@/components/shared/form/c-button";
import CInput from "@/components/shared/form/c-input";
import { useTheme } from "@/contexts/theme.context";
import { supabase } from "@/lib/supabase";
import { LoginFormSchema, LoginFormType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (formData: LoginFormType) => {
    try {
      setIsLoading(true);
      const { email, password } = formData;

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Toast.show({ type: "error", text1: error.code, text2: error.message });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Successfully log in to the account",
      });

      router.push("/");
    } catch (error) {
      console.error("Error while logging in: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.primary }]}
    >
      <View style={styles.formWrapper}>
        <CText style={[styles.headerText, { color: colors.text.primary }]}>
          Login to your account!
        </CText>

        <View style={styles.form}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="email"
            render={({ field, fieldState }) => (
              <CInput
                label="Email"
                placeholder="johndoe@example.com"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="password"
            render={({ field, fieldState }) => (
              <CInput
                label="Password"
                placeholder="*********"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                value={field.value}
                isPassword
              />
            )}
          />

          <CButton onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
            Login
          </CButton>
        </View>

        <CText style={[styles.bottomText, { color: colors.text.secondary }]}>
          Don't you have an account?{" "}
          <Link
            href={"/register"}
            style={[styles.registerLink, { color: colors.primary.main }]}
          >
            Register Here
          </Link>
        </CText>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    minHeight: "100%",
  },
  formWrapper: {
    width: "100%",
  },
  headerText: {
    fontSize: 30,
    fontFamily: "StackSans-Bold",
    marginBottom: 39,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  bottomText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 30,
  },
  registerLink: {
    textDecorationLine: "underline",
  },
});
