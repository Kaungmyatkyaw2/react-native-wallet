import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const EntryItemSkeleton = () => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftPartWrapper}>
        <View style={[styles.icon, styles.skeleton]} />
        <View style={styles.iconTextWrapper}>
          <View style={[styles.skeleton, styles.textLine]} />
          <View style={[styles.skeleton, styles.textLineShort]} />
        </View>
      </View>
      <View style={styles.amountTextWrapper}>
        <View style={[styles.skeleton, styles.textLine]} />
        <View style={[styles.skeleton, styles.textLineShort]} />
      </View>

      {/* Shimmer overlay */}
      <View style={styles.shimmerOverlay} />
    </TouchableOpacity>
  );
};

export default EntryItemSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  leftPartWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    width: 40,
    height: 40,
  },

  amountTextWrapper: {
    flexDirection: "column",
    gap: 5,
    alignItems: "flex-end",
  },
  iconTextWrapper: {
    flexDirection: "column",
    gap: 5,
    flex: 1,
  },

  // Skeleton styles
  skeleton: {
    backgroundColor: Colors.muteBg,
    borderRadius: 4,
  },

  textLine: {
    height: 16,
    width: 120,
  },

  textLineShort: {
    height: 12,
    width: 80,
  },

  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ skewX: "-20deg" }],
  },
});
