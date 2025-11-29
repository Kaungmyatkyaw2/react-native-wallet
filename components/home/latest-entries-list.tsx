import { Colors } from "@/constants/colors";
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
  const { isLoading, data } = useQuery({
    queryKey: ["latest-records"],
    queryFn: () => getLatestRecords(5),
  });

  const noData = !isLoading && (!data || data.length === 0);

  return (
    <View>
      <View style={styles.headerContainer}>
        <CText style={styles.headerText}>Latest Entries</CText>
        <TouchableOpacity
          style={styles.toHistoryButton}
          onPress={() => {
            router.push("/history");
          }}
        >
          <ArrowRight />
        </TouchableOpacity>
      </View>

      {noData && (
        <View style={styles.noDataContainer}>
          <BarChart3 color={Colors.textSecondary} size={30} />
          <CText style={styles.noDataText}>No entries are recorded yet</CText>
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
    backgroundColor: Colors.muteBg,
  },

  noDataContainer: {
    marginTop: 45,
    alignItems: "center",
    gap: 10,
  },
  noDataText: {
    fontFamily: "StackSans-Regular",
    fontSize: 16,
    color: Colors.textSecondary,
  },

  listContainer: {
    marginTop: 25,
  },
  skeletonContainer: {
    flexDirection: "column",
    gap: 10,
  },
});
