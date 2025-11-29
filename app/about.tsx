import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function AboutPage() {
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
            About HandyConnect
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: palette.badge }]}>
            Our mission, values and impact
          </ThemedText>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <ThemedText style={[styles.title, { color: palette.text }]}>
            Our Mission
          </ThemedText>
          <ThemedText style={[styles.paragraph, { color: palette.muted }]}>
            We connect homeowners with verified professionals through a
            transparent, secure, and efficient platform. Our goal is to simplify
            booking, protect payments, and improve trust between customers and
            service providers.
          </ThemedText>

          <ThemedText style={[styles.title, { color: palette.text }]}>
            Global Impact
          </ThemedText>
          <ThemedText style={[styles.paragraph, { color: palette.muted }]}>
            Serving hundreds of thousands of users and thousands of verified
            professionals, HandyConnect helps local businesses grow while
            helping homeowners find reliable help fast.
          </ThemedText>

          <ThemedText style={[styles.title, { color: palette.text }]}>
            Trust & Safety
          </ThemedText>
          <ThemedText style={[styles.paragraph, { color: palette.muted }]}>
            We use escrow-backed payments, identity verification, and secure
            messaging to keep both sides protected. Reviews and transparent
            pricing ensure accountability.
          </ThemedText>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialIcons name="people" size={22} color={palette.tint} />
              <ThemedText style={[styles.metaLabel, { color: palette.text }]}>
                500K+ users
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons
                name="verified-user"
                size={22}
                color={palette.tint}
              />
              <ThemedText style={[styles.metaLabel, { color: palette.text }]}>
                2.1K+ pros
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="security" size={22} color={palette.tint} />
              <ThemedText style={[styles.metaLabel, { color: palette.text }]}>
                $12.4M protected
              </ThemedText>
            </View>
          </View>

          <Link href="/" asChild>
            <ThemedText type="link" style={styles.backLink}>
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
  title: { fontSize: 16, fontWeight: "700", marginTop: 8 },
  paragraph: { fontSize: 14, lineHeight: 20 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  metaLabel: { fontSize: 13, fontWeight: "600" },
  backLink: { marginTop: 12 },
});
