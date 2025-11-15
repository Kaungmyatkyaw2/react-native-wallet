import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, TextInput, TextStyle, View } from "react-native";
import CText from "../c-text";

interface Props {
  placeholder?: string;
  label: string;
  required?: boolean;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
}

const CInput = ({
  placeholder,
  label,
  required,
  inputStyle,
  labelStyle,
}: Props) => {
  return (
    <View>
      <CText style={[styles.label, labelStyle]}>{label}</CText>
      <TextInput style={[styles.input, inputStyle]} placeholder={placeholder} />
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({
  label: { fontWeight: "semibold", fontSize: 15 },
  input: {
    borderColor: Colors.border,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "StackSans-Regular",
  },
});
