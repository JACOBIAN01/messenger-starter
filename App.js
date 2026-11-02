import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ME = "Newton";
const SERVER_URL = "https://messenger-yzgf.onrender.com";

export default function App() {
  const [messages, setMessages] = useState([]);

  const loadMessage = async () => {
    const response = await fetch(SERVER_URL + "/messages");
    const result = await response.json();
    setMessages(result);
  };

  useEffect(() => {
    loadMessage();
    const interval = setInterval(loadMessage, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scaler</Text>
      </View>
      <KeyboardAvoidingView style={styles.flex}>
        <FlatList
          style={styles.flex}
          contentContainerStyle={styles.list}
          data={messages}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            const isMine = item.user === ME;
            return (
              <View
                style={[styles.bubble, isMine ? styles.mine : styles.others]}
              >
                <Text style={isMine ? styles.mineText : styles.othersText}>
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
        <View style={styles.inputRow}>
          <TextInput style={styles.input} />
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 14,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: { fontSize: 18, fontWeight: "600" },
  list: { padding: 12 },
  bubble: {
    maxWidth: "75%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 3,
  },
  mine: { backgroundColor: "#39b7f6", alignSelf: "flex-end" },
  others: { backgroundColor: "#eee", alignSelf: "flex-start" },
  mineText: { color: "#fff", fontSize: 16 },
  othersText: { color: "#111", fontSize: 16 },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#39b7f6",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginLeft: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
