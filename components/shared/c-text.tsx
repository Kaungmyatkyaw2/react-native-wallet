import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type CTextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const CText = (props: CTextProps) => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

export default CText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "StackSans-Regular",
  },
});
