import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import CText from "../c-text";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  textColor?: string;
}

const CButton = ({ children, style, textColor = "white" }: Props) => {
  return (
    <TouchableOpacity style={[styles.button, style]}>
      <CText style={{ color: textColor }}>{children}</CText>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});
