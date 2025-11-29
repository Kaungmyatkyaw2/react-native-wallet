import CText from "@/components/shared/c-text";
import { Colors } from "@/constants/colors";
import { getCategoryExpensesForPieChart } from "@/services/supabase.services";
import { RecordType, Wallet } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart as RNPieChart } from "react-native-gifted-charts";

const ChartSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonChart} />
    <View style={styles.skeletonLabels}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.skeletonLabelItem}>
          <View style={styles.skeletonColorBox} />
          <View style={styles.skeletonText} />
        </View>
      ))}
    </View>
  </View>
);

const OverviewPieChart = ({
  type,
  wallet,
}: {
  type: RecordType;
  wallet: Wallet;
}) => {
  const { isLoading, data } = useQuery({
    queryKey: ["overview-stats", type],
    queryFn: () => getCategoryExpensesForPieChart(type),
  });

  const pieData =
    data?.data?.map((el) => ({
      value: el.percentage,
      color: el.color,
      name: el.name,
      text: `${el.percentage}%`,
    })) || [];

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (!data?.data.length) {
    return (
      <View style={styles.noDataBox}>
        <View style={styles.noDataIcon} />
        <CText style={styles.noDataTitle}>No Data Found</CText>
        <CText style={styles.noDataSubtitle}>
          There are no records available for this category yet.
        </CText>
      </View>
    );
  }
  return (
    <>
      <View style={styles.chartContainer}>
        <RNPieChart
          showText
          textSize={13}
          textColor="white"
          data={pieData!}
          donut
          sectionAutoFocus
          innerCircleColor={Colors.bg}
        />
        <CText
          style={{
            textAlign: "center",
            color: Colors.textSecondary,
            marginVertical: 25,
          }}
        >
          You have {type == "EXPENSE" ? "spent" : "earned"} total of{" "}
          {data?.totalAmount} {wallet?.currency} this month
        </CText>
        <View style={styles.labelContainer}>
          {pieData?.map((el) => (
            <View
              key={el.name}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: el.color,
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                }}
              />
              <CText style={{ fontSize: 10 }}>{el.name}</CText>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default OverviewPieChart;

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    display: "flex",
    width: "80%",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  skeletonContainer: {
    marginTop: 24,
    alignItems: "center",
    minHeight: 300,
  },
  skeletonChart: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: Colors.border,
  },
  skeletonLabels: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  skeletonLabelItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  skeletonColorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  skeletonText: {
    width: 60,
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: 4,
  },
  // No Data UI
  noDataBox: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.bg,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  noDataIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.border,
    opacity: 0.6,
    marginBottom: 5,
  },

  noDataTitle: {
    fontSize: 16,
    fontFamily: "StackSans-SemiBold",
    color: Colors.text,
    marginTop: 8,
  },

  noDataSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    width: "80%",
    marginTop: 4,
  },
});
