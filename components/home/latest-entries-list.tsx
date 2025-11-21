import { entriesDummy } from "@/constants/dummies";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CText from "../shared/c-text";
import EntryItem from "./entry-item";

const LatestEntriesList = () => {
  return (
    <View>
      <CText style={styles.headerText}>Latest Entries</CText>
      <FlatList
        data={entriesDummy}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        renderItem={({ item }) => <EntryItem item={item} />}
        scrollEnabled={false}
      />
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
});
