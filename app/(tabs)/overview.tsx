import CategoryList from "@/components/overview/category-list";
import OverviewPieChart from "@/components/overview/overview-piechart";
import CText from "@/components/shared/c-text";
import { useTheme } from "@/contexts/theme.context";
import { getMyWallet } from "@/services/supabase.services";
import { RecordType } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OverviewScreen = () => {
  const { colors } = useTheme();
  const [type, setType] = useState<RecordType>("EXPENSE");

  const { data: myWallet } = useQuery({
    queryKey: ["my-wallet"],
    queryFn: () => getMyWallet(),
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background.primary }]}
    >
      <SafeAreaView>
        <View style={styles.tabContainer}>
          <View
            style={[
              styles.tabBox,
              { backgroundColor: colors.background.muted },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                type == "INCOME" && [
                  styles.activeTab,
                  { backgroundColor: colors.background.primary },
                ],
              ]}
              onPress={() => {
                setType("INCOME");
              }}
            >
              <CText style={[styles.tabText, { color: colors.text.primary }]}>
                Income
              </CText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                type == "EXPENSE" && [
                  styles.activeTab,
                  { backgroundColor: colors.background.primary },
                ],
              ]}
              onPress={() => {
                setType("EXPENSE");
              }}
            >
              <CText style={[styles.tabText, { color: colors.text.primary }]}>
                Expense
              </CText>
            </TouchableOpacity>
          </View>
        </View>

        <OverviewPieChart type={type} wallet={myWallet!} />

        <CategoryList type={type} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    minHeight: "100%",
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
    // Background color moved to inline style
  },
  tabText: {
    textAlign: "center",
  },
});
