import { useTheme } from "@/contexts/theme.context";
import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import CText from "../c-text";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  textColor?: string;
  onPress?: (e: GestureResponderEvent) => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

const CButton = ({
  children,
  style,
  textStyle,
  onPress,
  isLoading,
  textColor,
  variant = "primary",
}: Props) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case "secondary":
        return colors.background.muted;
      case "outline":
        return "transparent";
      default:
        return colors.primary.main;
    }
  };

  const getBorderColor = () => {
    if (variant === "outline") {
      return colors.border.primary;
    }
    return "transparent";
  };

  const getTextColor = () => {
    if (textColor) return textColor;

    switch (variant) {
      case "secondary":
        return colors.text.primary;
      case "outline":
        return colors.text.primary;
      default:
        return colors.text.white;
    }
  };

  const getBorderWidth = () => {
    return variant === "outline" ? 1 : 0;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: getBorderWidth(),
        },
        isLoading ? styles.disabledButton : {},
        style,
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading && <ActivityIndicator color={getTextColor()} />}
      <CText style={[{ color: getTextColor() }, textStyle]}>{children}</CText>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
