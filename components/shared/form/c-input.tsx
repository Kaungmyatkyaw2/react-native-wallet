import { useTheme } from "@/contexts/theme.context";
import React from "react";
import {
  BlurEvent,
  KeyboardType,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import CText from "../c-text";

interface Props {
  placeholder?: string;
  label?: string;
  required?: boolean;
  labelStyle?: TextStyle | TextStyle[];
  inputStyle?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
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
  containerStyle,
  onChangeText,
  onBlur,
  value,
  error,
  keyboardType = "default",
}: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[containerStyle]}>
      {!!label && (
        <CText
          style={[styles.label, { color: colors.text.secondary }, labelStyle]}
        >
          {label}
        </CText>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border.primary,
            color: colors.text.primary,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={colors.text.muted}
        onBlur={onBlur}
        value={value}
        keyboardType={keyboardType}
      />
      {error && (
        <CText style={[styles.error, { color: colors.status.red }]}>
          {error}
        </CText>
      )}
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({
  label: {
    fontWeight: "semibold",
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "StackSans-Regular",
    paddingVertical: 12,
  },
  error: {
    paddingVertical: 10,
    fontSize: 13,
  },
});
