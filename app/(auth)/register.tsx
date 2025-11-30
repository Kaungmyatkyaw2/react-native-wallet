import CText from "@/components/shared/c-text";
import CButton from "@/components/shared/form/c-button";
import CInput from "@/components/shared/form/c-input";
import { useTheme } from "@/contexts/theme.context";
import { supabase } from "@/lib/supabase";
import { RegisterFormSchema, RegisterFormType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const RegisterScreen = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (formData: RegisterFormType) => {
    try {
      setIsLoading(true);
      const { email, name, password } = formData;

      const registerResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: name },
        },
      });

      if (registerResponse.error) {
        throw new Error(registerResponse.error.message);
      }

      const createWalletResponse = await supabase.from("wallets").insert([
        {
          amount: 0,
          user_id: registerResponse.data.user?.id,
        },
      ]);

      if (createWalletResponse.error) {
        throw new Error(createWalletResponse.error.message);
      }

      Toast.show({
        type: "success",
        text1: "Successfully registered the account",
      });

      router.push("/");
    } catch (error) {
      console.error("Error while registering: ", error);
      Toast.show({
        type: "error",
        text1: (error as Error).message || "Failed to register the account",
      });
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
          Create an account!
        </CText>

        <View style={styles.form}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field, fieldState }) => (
              <CInput
                label="Name"
                placeholder="John Doe"
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
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <CInput
                label="Confirm Password"
                placeholder="*********"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
                value={field.value}
              />
            )}
          />

          <CButton onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
            Submit
          </CButton>
        </View>

        <CText style={[styles.bottomText, { color: colors.text.secondary }]}>
          Already have an account?{" "}
          <Link
            href={"/login"}
            style={[styles.registerLink, { color: colors.primary.main }]}
          >
            Login Here
          </Link>
        </CText>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
