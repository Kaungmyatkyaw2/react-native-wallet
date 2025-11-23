import { Colors } from "@/constants/colors";
import React from "react";
import {
  BlurEvent,
  KeyboardType,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import CText from "../c-text";

interface Props {
  placeholder?: string;
  label?: string;
  required?: boolean;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  onChangeText?: (value: string) => void;
  onBlur?: (e: BlurEvent) => void;
  value?: string;
  error?: string;
  keyboardType?: KeyboardType;
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
  keyboardType = "default",
}: Props) => {
  return (
    <View>
      {!!label && <CText style={[styles.label, labelStyle]}>{label}</CText>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.mute}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
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
