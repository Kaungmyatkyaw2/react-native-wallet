import { useTheme } from "@/contexts/theme.context";
import { Eye, EyeOff } from "lucide-react-native"; // Assuming you're using lucide-react-native for icons
import React, { useState } from "react";
import {
  BlurEvent,
  KeyboardType,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
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
  isPassword?: boolean;
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
  isPassword = false,
  keyboardType = "default",
}: Props) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[containerStyle]}>
      {!!label && (
        <CText
          style={[styles.label, { color: colors.text.secondary }, labelStyle]}
        >
          {label}
        </CText>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border.primary,
              color: colors.text.primary,
              paddingRight: isPassword ? 50 : 10, // Extra padding for eye icon
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={colors.text.muted}
          onBlur={onBlur}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={colors.text.muted} />
            ) : (
              <Eye size={20} color={colors.text.muted} />
            )}
          </TouchableOpacity>
        )}
      </View>
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
    marginBottom: 10,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "StackSans-Regular",
    paddingVertical: 12,
    width: "100%",
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: "-50%" }],
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    paddingVertical: 10,
    fontSize: 13,
  },
});
