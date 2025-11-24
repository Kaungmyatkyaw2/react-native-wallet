import { Colors } from "@/constants/colors";
import { getLatestRecords } from "@/services/supabase.services";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";
import EntryItem from "./entry-item";
import EntryItemSkeleton from "./entry-item-skeleton";

const LatestEntriesList = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["latest-records"],
    queryFn: () => getLatestRecords(5),
  });

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
      {isLoading ? (
        <View style={[styles.listContainer, styles.skeletonContainer]}>
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
        </View>
      ) : (
        <FlatList
          data={data || []}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listContainer}
          renderItem={({ item }) => <EntryItem item={item} />}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default LatestEntriesList;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    display: "flex",
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
  listContainer: {
    marginTop: 25,
  },
  skeletonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
