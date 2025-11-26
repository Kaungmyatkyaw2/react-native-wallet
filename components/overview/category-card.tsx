import { Colors } from "@/constants/colors";
import { getCategoryIcon } from "@/lib/utils";
import { CategoryStats } from "@/services/supabase.services";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";

const CategoryCard = ({ category }: { category: CategoryStats }) => {
  const Icon = getCategoryIcon(category.name);

  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftPartWrapper}>
        <View style={styles.icon}>
          <Icon color={Colors.text} />
        </View>
        <View style={styles.iconTextWrapper}>
          <CText style={styles.title}>{category.name}</CText>
          <CText style={styles.description}>{category.percentage}%</CText>
        </View>
      </View>
      <View style={styles.amountTextWrapper}>
        <CText style={[styles.title]}>${category.total_amount}</CText>
        <CText style={styles.description}>
          {category.record_count} records
        </CText>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftPartWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    backgroundColor: Colors.muteBg,
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  title: {
    fontFamily: "StackSans-Bold",
    fontSize: 15,
  },
  description: {
    fontSize: 12,
    color: Colors.mute,
  },

  amountTextWrapper: {
    flexDirection: "column",
    gap: 5,
    alignItems: "flex-end",
  },
  iconTextWrapper: {
    flexDirection: "column",
    gap: 5,
  },
});
