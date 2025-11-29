import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

const pillars: { title: string; detail: string; icon: IconName }[] = [
  {
    title: "Instant booking",
    detail:
      "Live calendars, travel buffers, and confirmations without phone tag.",
    icon: "flash-on",
  },
  {
    title: "Transparent pricing",
    detail: "Flat-rate tasks, material markups, and clear start/stop times.",
    icon: "price-check",
  },
  {
    title: "Secure payments",
    detail: "Payout protection, receipts, and dispute workflows built in.",
    icon: "shield",
  },
];

const homeownerFlow = [
  "Describe the repair with photos and urgency.",
  "Approve upfront estimates before anyone rolls.",
  "Track arrival, work notes, and proof-of-completion shots.",
  "Release payment only when the job looks right.",
];

const proPlaybook = [
  "Auto-hold time blocks from accepted requests.",
  "Smart reminders for parts runs and return visits.",
  "Marketing boosts to homeowners who saved you as a favorite.",
  "Instant invoices with payment protection toggled by default.",
];

const pricing = [
  {
    name: "Flat-rate kits",
    description:
      "Perfect for recurring chores like mounting, assembly, or filter swaps.",
  },
  {
    name: "Time & materials",
    description: "Track clock-in/out with photos to back up hourly work.",
  },
  {
    name: "Safety buffer",
    description:
      "Add contingency approvals so surprises are priced with consent.",
  },
];

const safeguards: { icon: IconName; label: string }[] = [
  { icon: "verified", label: "ID-verified pros" },
  { icon: "photo-library", label: "Before/after proof" },
  { icon: "forum", label: "In-app messaging & logs" },
  { icon: "lock", label: "PCI-compliant payments" },
];

const mvpFeatures: { title: string; detail: string; icon: IconName }[] = [
  {
    title: "Geo-search",
    detail:
      "Location-based querying with Firebase GeoFire to surface the nearest available pros.",
    icon: "my-location",
  },
  {
    title: "Scheduling sync",
    detail:
      "Real-time availability sync to prevent double-booking and reduce friction.",
    icon: "schedule",
  },
  {
    title: "In-app chat",
    detail: "Secure Firestore messaging to clarify job details before arrival.",
    icon: "chat",
  },
];

const customerFlowCards: { title: string; detail: string; icon: IconName }[] = [
  {
    title: "Search & filter",
    detail:
      "Browse by service type, ratings, and distance to find the right fit fast.",
    icon: "search",
  },
  {
    title: "Instant booking",
    detail:
      "Pick a slot that syncs directly to the pro’s calendar—no callbacks needed.",
    icon: "event-available",
  },
  {
    title: "Live tracking",
    detail:
      "Track arrival ETA and route in real time until your handyman knocks.",
    icon: "near-me",
  },
];

const proFlowCards: { title: string; detail: string; icon: IconName }[] = [
  {
    title: "Profile management",
    detail: "Showcase skills, certifications, and proof-of-work galleries.",
    icon: "badge",
  },
  {
    title: "Job queue",
    detail: "Accept or decline requests instantly with smart travel buffers.",
    icon: "playlist-add-check",
  },
  {
    title: "Earnings tracker",
    detail: "Monitor daily, weekly, and monthly revenue with payout status.",
    icon: "query-stats",
  },
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View
            style={[styles.headerIconWrap, { backgroundColor: palette.badge }]}
          >
            <MaterialIcons name="build" size={22} color={palette.tint} />
          </View>
          <View style={styles.headerText}>
            <ThemedText
              type="title"
              style={[styles.headerTitle, { color: palette.text }]}
            >
              HandyConnect in detail
            </ThemedText>
            <ThemedText
              style={[styles.headerSubtitle, { color: palette.muted }]}
            >
              The blueprint for booking, billing, and building trust between
              homeowners and handymen.
            </ThemedText>
          </View>
        </View>

        <View style={[styles.headerActions, { paddingHorizontal: 20 }]}>
          <Link href="/contact" asChild>
            <Pressable
              style={[
                styles.actionBtn,
                { backgroundColor: palette.card, borderColor: palette.border },
              ]}
              accessibilityRole="button"
            >
              <MaterialIcons name="email" size={18} color={palette.tint} />
              <ThemedText style={[styles.actionText, { color: palette.text }]}>
                Contact
              </ThemedText>
            </Pressable>
          </Link>

          <Link href="/about" asChild>
            <Pressable
              style={[
                styles.actionBtn,
                { backgroundColor: palette.card, borderColor: palette.border },
              ]}
              accessibilityRole="button"
            >
              <MaterialIcons name="info" size={18} color={palette.tint} />
              <ThemedText style={[styles.actionText, { color: palette.text }]}>
                About us
              </ThemedText>
            </Pressable>
          </Link>
        </View>

        <Section title="Product pillars" palette={palette}>
          <View style={styles.cardGrid}>
            {pillars.map((item) => (
              <Card key={item.title} item={item} palette={palette} />
            ))}
          </View>
        </Section>

        <Section title="Core MVP features" palette={palette}>
          <ThemedText
            style={[styles.sectionSubtitle, { color: palette.muted }]}
          >
            The essentials we ship first to prove value quickly.
          </ThemedText>
          <View style={styles.cardGrid}>
            {mvpFeatures.map((item) => (
              <Card key={item.title} item={item} palette={palette} />
            ))}
          </View>
        </Section>

        <Section title="Effortless booking (customer flow)" palette={palette}>
          <ThemedText
            style={[styles.sectionSubtitle, { color: palette.muted }]}
          >
            We ensure homeowners can book without friction—search, slot
            selection, and live tracking in one flow.
          </ThemedText>
          <View style={styles.cardGrid}>
            {customerFlowCards.map((item) => (
              <Card key={item.title} item={item} palette={palette} />
            ))}
          </View>
        </Section>

        <Section title="Homeowner journey" palette={palette}>
          <View
            style={[
              styles.timeline,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            {homeownerFlow.map((step, index) => (
              <View key={step} style={styles.timelineRow}>
                <View
                  style={[
                    styles.timelineBadge,
                    {
                      backgroundColor: palette.badge,
                      borderColor: palette.border,
                    },
                  ]}
                >
                  <ThemedText
                    style={[styles.timelineNumber, { color: palette.text }]}
                  >
                    {index + 1}
                  </ThemedText>
                </View>
                <ThemedText
                  style={[styles.timelineText, { color: palette.muted }]}
                >
                  {step}
                </ThemedText>
              </View>
            ))}
          </View>
        </Section>

        <Section
          title="Business on autopilot (handyman flow)"
          palette={palette}
        >
          <ThemedText
            style={[styles.sectionSubtitle, { color: palette.muted }]}
          >
            Help pros lock in more revenue with less admin—profiles, job queues,
            and earnings in one hub.
          </ThemedText>
          <View style={styles.cardGrid}>
            {proFlowCards.map((item) => (
              <Card key={item.title} item={item} palette={palette} />
            ))}
          </View>
        </Section>

        <Section title="Pro operating system" palette={palette}>
          <View
            style={[
              styles.listCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            {proPlaybook.map((item) => (
              <View key={item} style={styles.listRow}>
                <MaterialIcons
                  name="task-alt"
                  size={18}
                  color={palette.accent}
                />
                <ThemedText style={[styles.listText, { color: palette.text }]}>
                  {item}
                </ThemedText>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Pricing that removes guesswork" palette={palette}>
          <View style={styles.cardGrid}>
            {pricing.map((option) => (
              <PricingCard
                key={option.name}
                option={option}
                palette={palette}
              />
            ))}
          </View>
        </Section>

        <Section title="Trust & safety" palette={palette}>
          <View style={styles.safeguardGrid}>
            {safeguards.map((item) => (
              <SafeguardCard key={item.label} item={item} palette={palette} />
            ))}
          </View>
        </Section>
      </ScrollView>
    </ThemedView>
  );
}

function Card({
  item,
  palette,
}: {
  item: { title: string; detail: string; icon: IconName };
  palette: (typeof Colors)["light"];
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: palette.card, borderColor: palette.border },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: palette.badge }]}>
        <MaterialIcons name={item.icon} size={22} color={palette.tint} />
      </View>
      <ThemedText style={[styles.cardTitle, { color: palette.text }]}>
        {item.title}
      </ThemedText>
      <ThemedText style={[styles.cardDetail, { color: palette.muted }]}>
        {item.detail}
      </ThemedText>
    </View>
  );
}

function PricingCard({
  option,
  palette,
}: {
  option: { name: string; description: string };
  palette: (typeof Colors)["light"];
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: palette.card, borderColor: palette.border },
      ]}
    >
      <ThemedText style={[styles.cardTitle, { color: palette.text }]}>
        {option.name}
      </ThemedText>
      <ThemedText style={[styles.cardDetail, { color: palette.muted }]}>
        {option.description}
      </ThemedText>
    </View>
  );
}

function SafeguardCard({
  item,
  palette,
}: {
  item: { icon: IconName; label: string };
  palette: (typeof Colors)["light"];
}) {
  return (
    <View
      style={[
        styles.safeguardCard,
        { backgroundColor: palette.card, borderColor: palette.border },
      ]}
    >
      <MaterialIcons name={item.icon} size={18} color={palette.tint} />
      <ThemedText style={[styles.safeguardText, { color: palette.text }]}>
        {item.label}
      </ThemedText>
    </View>
  );
}

function Section({
  title,
  palette,
  children,
}: {
  title: string;
  palette: (typeof Colors)["light"];
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={[styles.sectionTitleWrap, { borderColor: palette.border }]}>
        <View style={[styles.sectionDot, { backgroundColor: palette.tint }]} />
        <ThemedText style={[styles.sectionTitle, { color: palette.text }]}>
          {title}
        </ThemedText>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  headerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "800",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "700",
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerSubtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  section: {
    gap: 12,
  },
  sectionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    flex: 1,
    minWidth: 160,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardDetail: {
    fontSize: 14,
    lineHeight: 20,
  },
  timeline: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timelineBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  timelineNumber: {
    fontSize: 15,
    fontWeight: "700",
  },
  timelineText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  listCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  safeguardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  safeguardCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  safeguardText: {
    fontSize: 14,
  },
});
