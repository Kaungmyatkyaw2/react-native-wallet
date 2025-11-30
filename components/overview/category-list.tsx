import { useTheme } from "@/contexts/theme.context";
import { getCategoriesWithStats } from "@/services/supabase.services";
import { RecordType } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View } from "react-native";
import EntryItemSkeleton from "../home/entry-item-skeleton";
import CText from "../shared/c-text";
import CategoryCard from "./category-card";

const CategoryList = ({ type }: { type: RecordType }) => {
  const { colors } = useTheme();
  const { isLoading, data } = useQuery({
    queryKey: ["category-stats", type],
    queryFn: () => getCategoriesWithStats(type),
  });

  return (
    <View style={styles.container}>
      <CText style={[styles.title, { color: colors.primary.dark }]}>
        Categories For {type == "EXPENSE" ? "Expense" : "Income"}
      </CText>
      {isLoading ? (
        <View>
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
          <EntryItemSkeleton />
        </View>
      ) : (
        data?.data.map((el) => <CategoryCard key={el.id} category={el} />)
      )}
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    marginBottom: 20,
    fontFamily: "StackSans-Bold",
    fontSize: 15,
  },
});
