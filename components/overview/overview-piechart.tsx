import CText from "@/components/shared/c-text";
import { useTheme } from "@/contexts/theme.context";
import { getCategoryExpensesForPieChart } from "@/services/supabase.services";
import { RecordType, Wallet } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart as RNPieChart } from "react-native-gifted-charts";

const ChartSkeleton = ({ colors }: { colors: any }) => (
  <View style={styles.skeletonContainer}>
    <View
      style={[styles.skeletonChart, { backgroundColor: colors.border.primary }]}
    />
    <View style={styles.skeletonLabels}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.skeletonLabelItem}>
          <View
            style={[
              styles.skeletonColorBox,
              { backgroundColor: colors.border.primary },
            ]}
          />
          <View
            style={[
              styles.skeletonText,
              { backgroundColor: colors.border.primary },
            ]}
          />
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
  const { colors } = useTheme();
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
    return <ChartSkeleton colors={colors} />;
  }

  if (!data?.data.length) {
    return (
      <View
        style={[
          styles.noDataBox,
          {
            borderColor: colors.border.primary,
            backgroundColor: colors.background.primary,
          },
        ]}
      >
        <View
          style={[
            styles.noDataIcon,
            { backgroundColor: colors.border.primary },
          ]}
        />
        <CText style={[styles.noDataTitle, { color: colors.text.primary }]}>
          No Data Found
        </CText>
        <CText
          style={[styles.noDataSubtitle, { color: colors.text.secondary }]}
        >
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
          innerCircleColor={colors.background.primary}
        />
        <CText
          style={{
            textAlign: "center",
            color: colors.text.secondary,
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
              <CText style={[{ fontSize: 10 }, { color: colors.text.primary }]}>
                {el.name}
              </CText>
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
  },
  skeletonText: {
    width: 60,
    height: 12,
    borderRadius: 4,
  },
  // No Data UI
  noDataBox: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  noDataIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.6,
    marginBottom: 5,
  },

  noDataTitle: {
    fontSize: 16,
    fontFamily: "StackSans-SemiBold",
    marginTop: 8,
  },

  noDataSubtitle: {
    fontSize: 12,
    textAlign: "center",
    width: "80%",
    marginTop: 4,
  },
});
