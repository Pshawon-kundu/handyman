import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ContactPage() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];
  const [comment, setComment] = useState("");

  const phone = "01717-52xx xx";
  const email = "support@handyconnect.com";
  const website = "https://handyconnect.com";

  const openPhone = () => Linking.openURL(`tel:${phone}`);
  const openEmail = () => Linking.openURL(`mailto:${email}`);
  const openWebsite = () => Linking.openURL(website);

  const submitComment = () => {
    if (!comment.trim()) {
      Alert.alert("Please enter a comment");
      return;
    }
    // Placeholder - no backend. Show confirmation.
    Alert.alert("Thanks", "Your comment was submitted.");
    setComment("");
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: palette.tint }]}>
          <ThemedText style={[styles.headerTitle, { color: palette.card }]}>
            Contact Us
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: palette.badge }]}>
            We&apos;d love to hear from you
          </ThemedText>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <Pressable style={styles.contactRow} onPress={openPhone}>
            <MaterialIcons name="phone" size={20} color={palette.tint} />
            <ThemedText style={[styles.contactText, { color: palette.text }]}>
              {phone}
            </ThemedText>
          </Pressable>

          <Pressable style={styles.contactRow} onPress={openEmail}>
            <MaterialIcons name="email" size={20} color={palette.tint} />
            <ThemedText style={[styles.contactText, { color: palette.text }]}>
              {email}
            </ThemedText>
          </Pressable>

          <Pressable style={styles.contactRow} onPress={openWebsite}>
            <MaterialIcons name="language" size={20} color={palette.tint} />
            <ThemedText style={[styles.contactText, { color: palette.text }]}>
              {website}
            </ThemedText>
          </Pressable>

          <ThemedText
            style={[styles.sectionTitle, { color: palette.text, marginTop: 8 }]}
          >
            Comments
          </ThemedText>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Write your message..."
            placeholderTextColor={palette.muted}
            style={[
              styles.input,
              {
                borderColor: palette.border,
                backgroundColor: palette.background,
                color: palette.text,
              },
            ]}
            multiline
            numberOfLines={4}
          />
          <Pressable
            onPress={submitComment}
            style={({ pressed }) => [
              {
                backgroundColor: palette.tint,
                paddingVertical: 12,
                alignItems: "center",
                borderRadius: 10,
                marginTop: 8,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <ThemedText style={{ color: palette.card, fontWeight: "700" }}>
              Send
            </ThemedText>
          </Pressable>

          <Link href="/" asChild>
            <ThemedText type="link" style={{ marginTop: 12 }}>
              Back to Home
            </ThemedText>
          </Link>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 18 },
  header: { padding: 18, borderRadius: 12 },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  headerSubtitle: { fontSize: 13, marginTop: 6 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 12 },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  contactText: { fontSize: 15 },
  sectionTitle: { fontSize: 15, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
  },
});
