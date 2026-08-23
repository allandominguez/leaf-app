import { StatusBar } from "expo-status-bar";
import { SQLiteProvider } from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";

import { DATABASE_NAME, migrateDbIfNeeded } from "./lib/db/migrations";

export default function App() {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
