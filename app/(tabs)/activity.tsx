import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ActivityScreen() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];

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
            Activity
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: palette.badge }]}>
            Recent bookings and notifications
          </ThemedText>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <ThemedText style={[styles.title, { color: palette.text }]}>
            Recent Activity
          </ThemedText>
          <ThemedText style={[styles.paragraph, { color: palette.muted }]}>
            No recent activity. Book a service or check notifications.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 16 },
  header: { padding: 18, borderRadius: 12 },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  headerSubtitle: { fontSize: 13, marginTop: 6 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16, gap: 12 },
  title: { fontSize: 16, fontWeight: "700", marginTop: 8 },
  paragraph: { fontSize: 14, lineHeight: 20 },
});
