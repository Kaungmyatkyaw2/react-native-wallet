import { Colors } from "@/constants/colors";
import React from "react";
import {
  BlurEvent,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import CText from "../c-text";

interface Props {
  placeholder?: string;
  label: string;
  required?: boolean;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  onChangeText?: (value: string) => void;
  onBlur?: (e: BlurEvent) => void;
  value?: string;
  error?: string;
}

const CInput = ({
  placeholder,
  label,
  required,
  inputStyle,
  labelStyle,
  onChangeText,
  onBlur,
  value,
  error,
}: Props) => {
  return (
    <View>
      <CText style={[styles.label, labelStyle]}>{label}</CText>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      {error && <CText style={styles.error}>{error}</CText>}
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
  error: {
    color: Colors.red,
    paddingVertical: 10,
    fontSize: 13,
  },
});
