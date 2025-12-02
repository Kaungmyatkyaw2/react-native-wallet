import { useTheme } from "@/contexts/theme.context";
import { getCategoryIcon } from "@/lib/icons";
import { formatDate } from "@/lib/utils";
import { getMyWallet } from "@/services/supabase.services";
import { IRecord } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";

const EntryItem = ({ item }: { item: IRecord }) => {
  const { colors } = useTheme();
  const Icon = getCategoryIcon(item?.category?.name!);
  const { data: myWallet } = useQuery({
    queryKey: ["my-wallet"],
    queryFn: () => getMyWallet(),
  });

  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftPartWrapper}>
        <View
          style={[styles.icon, { backgroundColor: colors.background.muted }]}
        >
          <Icon color={colors.text.primary} />
        </View>
        <View style={styles.iconTextWrapper}>
          <CText style={[styles.title, { color: colors.text.primary }]}>
            {item.title}
          </CText>
          <CText style={[styles.description, { color: colors.text.muted }]}>
            {formatDate(new Date(item.created_at))}
          </CText>
        </View>
      </View>
      <View style={styles.amountTextWrapper}>
        <CText
          style={[
            styles.title,
            {
              color:
                item.type == "EXPENSE"
                  ? colors.status.red
                  : colors.status.green,
            },
          ]}
        >
          {item.type == "EXPENSE" ? "- " : "+ "}
          {item.amount} {myWallet?.currency}
        </CText>
        <CText style={[styles.description, { color: colors.text.muted }]}>
          {item.payment_method?.name}
        </CText>
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
