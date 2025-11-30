import { useTheme } from "@/contexts/theme.context";
import { getLatestRecords } from "@/services/supabase.services";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ArrowRight, BarChart3 } from "lucide-react-native";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";
import EntryItem from "./entry-item";
import EntryItemSkeleton from "./entry-item-skeleton";

const LatestEntriesList = () => {
  const { colors } = useTheme();
  const { isLoading, data } = useQuery({
    queryKey: ["latest-records"],
    queryFn: () => getLatestRecords(5),
  });

  const noData = !isLoading && (!data || data.length === 0);

  return (
    <View>
      <View style={styles.headerContainer}>
        <CText style={[styles.headerText, { color: colors.text.primary }]}>
          Latest Entries
        </CText>
        <TouchableOpacity
          style={[
            styles.toHistoryButton,
            { backgroundColor: colors.background.muted },
          ]}
          onPress={() => {
            router.push("/history");
          }}
        >
          <ArrowRight color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {noData && (
        <View style={styles.noDataContainer}>
          <BarChart3 color={colors.text.secondary} size={30} />
          <CText style={[styles.noDataText, { color: colors.text.secondary }]}>
            No entries are recorded yet
          </CText>
        </View>
      )}

      {isLoading ? (
        <View style={[styles.listContainer, styles.skeletonContainer]}>
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
        </View>
      ) : (
        !noData && (
          <FlatList
            data={data || []}
            keyExtractor={(item) => item.id.toString()}
            style={styles.listContainer}
            renderItem={({ item }) => <EntryItem item={item} />}
            scrollEnabled={false}
          />
        )
      )}
    </View>
  );
};

export default LatestEntriesList;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "StackSans-Bold",
    fontSize: 18,
  },
  toHistoryButton: {
    padding: 8,
    borderRadius: 15,
  },

  noDataContainer: {
    marginTop: 45,
    alignItems: "center",
    gap: 10,
  },
  noDataText: {
    fontFamily: "StackSans-Regular",
    fontSize: 16,
  },

  listContainer: {
    marginTop: 25,
  },
  skeletonContainer: {
    flexDirection: "column",
    gap: 10,
  },
});
