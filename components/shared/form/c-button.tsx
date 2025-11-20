import { Colors } from "@/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import CText from "../c-text";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  textColor?: string;
  onPress?: (e: GestureResponderEvent) => void;
  isLoading?: boolean;
}

const CButton = ({
  children,
  style,
  onPress,
  isLoading,
  textColor = "white",
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading ? styles.disabledButton : {}, style]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading && <ActivityIndicator color={textColor} />}
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
    flexDirection: "row",
    gap: "10",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
