import CText from "@/components/shared/c-text";
import CButton from "@/components/shared/form/c-button";
import CInput from "@/components/shared/form/c-input";
import { Colors } from "@/constants/colors";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formWrapper}>
        <CText style={styles.headerText}>Login to your account!</CText>

        <View style={styles.form}>
          <CInput label="Email" placeholder="johndoe@example.com" />

          <CInput label="Password" placeholder="*********" />

          <CButton>Login</CButton>
        </View>

        <CText style={styles.bottomText}>
          Don't you have an account?{" "}
          <Link href={"/register"} style={styles.registerLink}>
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
    backgroundColor: Colors.bg,
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
    color: Colors.textSecondary,
  },
  registerLink: {
    textDecorationLine: "underline",
  },
});
