import { useTheme } from "@/contexts/theme.context";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const EntryItemSkeleton = () => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.leftPartWrapper}>
        <View
          style={[
            styles.icon,
            styles.skeleton,
            { backgroundColor: colors.background.muted },
          ]}
        />
        <View style={styles.iconTextWrapper}>
          <View
            style={[
              styles.skeleton,
              styles.textLine,
              { backgroundColor: colors.background.muted },
            ]}
          />
          <View
            style={[
              styles.skeleton,
              styles.textLineShort,
              { backgroundColor: colors.background.muted },
            ]}
          />
        </View>
      </View>
      <View style={styles.amountTextWrapper}>
        <View
          style={[
            styles.skeleton,
            styles.textLine,
            { backgroundColor: colors.background.muted },
          ]}
        />
        <View
          style={[
            styles.skeleton,
            styles.textLineShort,
            { backgroundColor: colors.background.muted },
          ]}
        />
      </View>

      {/* Shimmer overlay */}
      <View
        style={[
          styles.shimmerOverlay,
          { backgroundColor: colors.background.muted },
        ]}
      />
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
