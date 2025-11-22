import { Colors } from "@/constants/colors";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";

interface Props {
  onSelect: (item: { label: string; value: string }) => void;
  error?: string;
  value?: string;
  data: { label: string; value: string }[];
}

const SelectCategoryList = ({ onSelect, value, error, data }: Props) => {
  return (
    <View>
      <CText style={styles.label}>Category</CText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.value}
        contentContainerStyle={{
          display: "flex",
          gap: 10,
          paddingVertical: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              item.value == value && styles.selectedItem,
            ]}
            onPress={() => {
              onSelect(item);
            }}
          >
            <CText
              style={{
                color: item.value == value ? Colors.white : Colors.text,
              }}
            >
              {item.label}
            </CText>
          </TouchableOpacity>
        )}
        horizontal
      />
      {error && <CText style={styles.error}>{error}</CText>}
    </View>
  );
};

export default SelectCategoryList;

const styles = StyleSheet.create({
  label: {
    fontFamily: "StackSans-SemiBold",
    color: Colors.textSecondary,
    fontSize: 16,
  },

  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,

    backgroundColor: Colors.white,
  },
  selectedItem: {
    backgroundColor: Colors.primary,
  },
  error: {
    color: Colors.red,
    paddingVertical: 10,
    fontSize: 13,
  },
});
