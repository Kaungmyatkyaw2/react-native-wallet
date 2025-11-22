import { Colors } from "@/constants/colors";
import { formatAmount } from "@/lib/utils";
import { getMyWallet } from "@/services/supabase.services";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { History, Inbox, LucideIcon, ShoppingBag } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";

const QuickLink = (info: { href: string; title: string; icon: LucideIcon }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(info.href as any);
      }}
      style={styles.quickLink}
    >
      <info.icon color={Colors.bg} size={20} />
      <CText style={styles.quickLinkText}>{info.title}</CText>
    </TouchableOpacity>
  );
};

const BalanceCard = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["my-wallet"],
    queryFn: () => getMyWallet(),
  });

  return (
    <View style={styles.balanceCard}>
      <View style={styles.amountCard}>
        <CText style={styles.balanceHeader}>Your available balance</CText>

        {isLoading ? (
          <View style={styles.skeletonContainer}>
            <View style={[styles.skeletonLine, styles.skeletonBalance]} />
          </View>
        ) : isError ? (
          <CText style={styles.errText}>{error?.message}</CText>
        ) : (
          <CText style={styles.balanceText}>
            {formatAmount(data?.amount, data?.currency)}
          </CText>
        )}
      </View>

      <View style={styles.quickLinkCard}>
        <QuickLink title="Income" icon={Inbox} href="/create?type=INCOME" />
        <QuickLink
          title="Expense"
          icon={ShoppingBag}
          href="/create?type=EXPENSE"
        />
        <QuickLink title="History" icon={History} href="/history" />
      </View>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  balanceCard: {
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: Colors.primaryDark,
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
    marginBottom: 40,
  },

  amountCard: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },

  balanceHeader: {
    color: Colors.textWhite,
    textAlign: "center",
    fontSize: 13,
  },

  balanceText: {
    color: Colors.white,
    fontFamily: "StackSans-Bold",
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
  errText: {
    color: Colors.red,
    fontFamily: "StackSans-Bold",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
  },

  // Skeleton styles
  skeletonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },

  skeletonLine: {
    backgroundColor: Colors.textWhite,
    borderRadius: 4,
  },

  skeletonBalance: {
    height: 36, // Similar height to your balance text
    width: 200, // Approximate width for the balance amount
    opacity: 0.3,
  },

  quickLinkCard: {
    paddingHorizontal: 10,
    paddingVertical: 35,
    backgroundColor: Colors.primaryDark,
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quickLink: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
  },

  quickLinkText: {
    color: Colors.textWhite,
    marginTop: 3,
    fontSize: 12,
  },
});
