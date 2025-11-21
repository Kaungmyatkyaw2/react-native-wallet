import CText from "@/components/shared/c-text";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth.context";
import { getGreetingText } from "@/lib/utils";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { session } = useAuth();

  const displayName = session?.user.user_metadata?.display_name;
  const firstName = displayName.split(" ").slice(0, 2).join(" ");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingContainer}>
        <CText style={styles.greetingHeader}>Welcome {firstName}</CText>
        <CText style={styles.greetingText}>{getGreetingText()}</CText>
      </View>
      <View style={styles.amountCard}>
        <CText style={styles.balanceHeader}>Your available balance</CText>
        <CText style={styles.balanceText}>$ 230,000.00</CText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greetingContainer: {
    marginBottom: 40,
  },
  greetingHeader: {
    fontSize: 23,
    fontFamily: "StackSans-Bold",
    color: Colors.primaryDark,
  },
  greetingText: {
    color: Colors.mute,
    fontSize: 15,
    marginTop: 3,
  },

  amountCard: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },

  balanceHeader: {
    color: Colors.textWhite,
    textAlign: "center",
    fontSize: 13,
  },
  balanceText: {
    color: Colors.white,
    fontFamily: "StackSans-Bold",
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
});
