import { getLatestRecords } from "@/services/supabase.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
      <CText style={styles.headerText}>Latest Entries</CText>
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
  headerText: {
    fontFamily: "StackSans-Bold",
    fontSize: 18,
  },
  listContainer: {
    marginTop: 20,
  },
  skeletonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
