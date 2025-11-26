import CategoryList from "@/components/overview/category-list";
import OverviewPieChart from "@/components/overview/overview-piechart";
import CText from "@/components/shared/c-text";
import { Colors } from "@/constants/colors";
import { getMyWallet } from "@/services/supabase.services";
import { RecordType } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OverviewScreen = () => {
  const [type, setType] = useState<RecordType>("EXPENSE");

  const { isLoading, data: myWallet } = useQuery({
    queryKey: ["my-wallet"],
    queryFn: () => getMyWallet(),
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <View style={styles.tabBox}>
          <TouchableOpacity
            style={[styles.tab, type == "EXPENSE" && styles.activeTab]}
            onPress={() => {
              setType("EXPENSE");
            }}
          >
            <CText style={{ textAlign: "center" }}>Income</CText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, type == "INCOME" && styles.activeTab]}
            onPress={() => {
              setType("INCOME");
            }}
          >
            <CText style={{ textAlign: "center" }}>Expense</CText>
          </TouchableOpacity>
        </View>
      </View>

      <OverviewPieChart type={type} wallet={myWallet!} />

      <CategoryList type={type} />
    </SafeAreaView>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tabContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tabBox: {
    width: "80%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.muteBg,
    display: "flex",
    flexDirection: "row",
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    width: "50%",
    display: "flex",
  },
  activeTab: {
    backgroundColor: Colors.bg,
  },
});
