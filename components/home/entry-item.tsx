import { Colors } from "@/constants/colors";
import { formatDate, getCategoryIcon } from "@/lib/utils";
import { IRecord } from "@/types/interfaces";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";

const EntryItem = ({ item }: { item: IRecord }) => {
  const Icon = getCategoryIcon(item?.category?.name!);

  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftPartWrapper}>
        <View style={styles.icon}>
          <Icon color={Colors.text} />
        </View>
        <View style={styles.iconTextWrapper}>
          <CText style={styles.title}>{item.title}</CText>
          <CText style={styles.description}>
            {formatDate(new Date(item.created_at))}
          </CText>
        </View>
      </View>
      <View style={styles.amountTextWrapper}>
        <CText
          style={[
            styles.title,
            { color: item.type == "EXPENSE" ? Colors.red : Colors.green },
          ]}
        >
          {item.type == "EXPENSE" ? "- " : "+ "}${item.amount}
        </CText>
        <CText style={styles.description}>{item.payment_method?.name}</CText>
      </View>
    </TouchableOpacity>
  );
};

export default EntryItem;

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
