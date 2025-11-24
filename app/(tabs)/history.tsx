import EntryItem from "@/components/home/entry-item";
import EntryItemSkeleton from "@/components/home/entry-item-skeleton";
import CText from "@/components/shared/c-text";
import CInput from "@/components/shared/form/c-input";
import { Colors } from "@/constants/colors";
import { getRecords } from "@/services/supabase.services";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryScreen = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["my-records"],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => getRecords({ page: pageParam, limit: 10 }),
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length < 10) {
          return undefined;
        }
        return lastPage.nextPage;
      },
    });

  const records = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data]
  );

  return (
    <SafeAreaView style={styles.container}>
      <CText style={[styles.header, styles.padContainer]}>Record History</CText>
      <CInput
        placeholder="Search by the title"
        inputStyle={{ marginTop: 20, marginHorizontal: 20 }}
      />
      {isLoading && records.length == 0 ? (
        <View
          style={[
            styles.listContainer,
            styles.skeletonContainer,
            styles.padContainer,
          ]}
        >
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
        </View>
      ) : (
        <FlatList
          style={[styles.listContainer, styles.padContainer]}
          data={records || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EntryItem item={item} />}
          onEndReachedThreshold={0.2}
          onEndReached={() =>
            hasNextPage && !isFetchingNextPage && fetchNextPage()
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                color={Colors.primary}
                size="small"
                style={{ marginBottom: 5 }}
              />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  skeletonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  padContainer: {
    paddingHorizontal: 20,
  },
  container: {
    paddingTop: 20,
    paddingBottom: 60,
  },
  header: {
    fontSize: 20,
    fontFamily: "StackSans-Bold",
    color: Colors.primaryDark,
  },
  listContainer: {
    marginTop: 20,
    minHeight: 100,
  },
});
