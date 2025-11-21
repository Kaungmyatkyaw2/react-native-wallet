import BalanceCard from "@/components/home/balance-card";
import LatestEntriesList from "@/components/home/latest-entries-list";
import CText from "@/components/shared/c-text";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth.context";
import { getGreetingText } from "@/lib/utils";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { session } = useAuth();

  const displayName = session?.user.user_metadata?.display_name;
  const firstName = displayName.split(" ").slice(0, 2).join(" ");

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.greetingContainer}>
          <CText style={styles.greetingHeader}>Welcome {firstName}</CText>
          <CText style={styles.greetingText}>{getGreetingText()}</CText>
        </View>
        <BalanceCard />
        <LatestEntriesList />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greetingContainer: {
    marginBottom: 25,
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
});
