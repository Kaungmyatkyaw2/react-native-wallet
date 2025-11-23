import EntryItem from "@/components/home/entry-item";
import EntryItemSkeleton from "@/components/home/entry-item-skeleton";
import CText from "@/components/shared/c-text";
import CInput from "@/components/shared/form/c-input";
import { Colors } from "@/constants/colors";
import { getRecords } from "@/services/supabase.services";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryScreen = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["my-records"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getRecords({ page: pageParam }),
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
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <CText style={styles.header}>Record History</CText>
        <CInput
          placeholder="Search by the title"
          inputStyle={{ marginTop: 20 }}
        />
        {isLoading && records.length == 0 ? (
          <View style={[styles.listContainer, styles.skeletonContainer]}>
            <EntryItemSkeleton />
            <EntryItemSkeleton />
            <EntryItemSkeleton />
            <EntryItemSkeleton />
            <EntryItemSkeleton />
          </View>
        ) : (
          <FlatList
            style={styles.listContainer}
            data={records || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <EntryItem item={item} />}
            scrollEnabled={false}
            onEndReachedThreshold={0.2}
            onEndReached={() =>
              hasNextPage && !isFetchingNextPage && fetchNextPage()
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator
                  color="blue"
                  size="small"
                  style={{ marginBottom: 5 }}
                />
              ) : null
            }
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  skeletonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: "StackSans-Bold",
    color: Colors.primaryDark,
  },
  listContainer: {
    marginTop: 20,
  },
});
