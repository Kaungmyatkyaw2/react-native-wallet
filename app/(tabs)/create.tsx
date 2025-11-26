import CreateRecordForm from "@/components/create-record/create-record-form";
import CText from "@/components/shared/c-text";
import { Colors } from "@/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const CreateScreen = () => {
  const { type } = useLocalSearchParams();

  return (
    <View>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.backButton}
        >
          <ChevronLeft />
        </TouchableOpacity>
        <CText style={styles.headerTitleText}>
          Add {(type as string)?.toLocaleLowerCase() || "Record"}
        </CText>
      </View>

      <CreateRecordForm />
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%",
    backgroundColor: Colors.bg,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleText: {
    fontFamily: "StackSans-SemiBold",
    fontSize: 18,
    textAlign: "center",
    position: "relative",
    width: "100%",
    textTransform: "capitalize",
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: "flex-start",
    position: "absolute",
    left: 20,
    top: 50,
  },
});
