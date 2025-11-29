import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import { authService } from "@/lib/services/authService";

const highlights = [
  { icon: "my-location", label: "Geo-search nearby pros" },
  { icon: "event-available", label: "Live scheduling sync" },
  { icon: "chat", label: "Secure in-app chat" },
];

export default function SignupScreen() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreateAccount = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Missing fields", "Please fill name, email and password.");
      return;
    }

    setLoading(true);
    try {
      await authService.signup(email.trim(), password, fullName.trim());
      router.replace("/(tabs)");
    } catch (err: any) {
      console.error("Signup failed", err);
      Alert.alert("Signup failed", err?.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 32 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { backgroundColor: palette.tint }]}>
          <View style={[styles.heroBadge, { backgroundColor: palette.card }]}>
            <MaterialIcons name="bolt" size={18} color={palette.tint} />
            <ThemedText style={[styles.heroBadgeText, { color: palette.text }]}>
              HandyConnect · Sign up
            </ThemedText>
          </View>
          <ThemedText
            type="title"
            style={[styles.heroTitle, { color: palette.card }]}
          >
            Create your account and book trusted pros instantly.
          </ThemedText>
          <ThemedText style={[styles.heroCopy, { color: palette.card }]}>
            One login for booking, scheduling, and protected payouts.
          </ThemedText>
          <View style={styles.heroStats}>
            {highlights.map((item) => (
              <View
                key={item.label}
                style={[styles.heroPill, { backgroundColor: palette.card }]}
              >
                <MaterialIcons
                  name={item.icon as never}
                  size={16}
                  color={palette.tint}
                />
                <ThemedText
                  style={[styles.heroPillText, { color: palette.text }]}
                >
                  {item.label}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <ThemedText
            type="subtitle"
            style={[styles.cardTitle, { color: palette.text }]}
          >
            Sign up
          </ThemedText>
          <ThemedText style={[styles.cardSubtitle, { color: palette.muted }]}>
            Start with your details. You can complete profile and services
            later.
          </ThemedText>
          <View style={styles.fieldGroup}>
            <Field
              label="Full name"
              icon="person"
              placeholder="Taylor Jenkins"
              value={fullName}
              onChangeText={setFullName}
              palette={palette}
            />
            <Field
              label="Email address"
              icon="email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              palette={palette}
            />
            <Field
              label="Password"
              icon="lock"
              placeholder="Minimum 8 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              palette={palette}
            />
          </View>
          <Pressable
            onPress={onCreateAccount}
            disabled={loading}
            style={({ pressed }) => [
              styles.primaryAction,
              {
                backgroundColor: palette.tint,
                opacity: pressed || loading ? 0.9 : 1,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color={palette.card} />
            ) : (
              <MaterialIcons
                name="arrow-forward"
                size={18}
                color={palette.card}
              />
            )}
            <ThemedText
              style={[styles.primaryActionText, { color: palette.card }]}
            >
              {loading ? "Creating..." : "Create account"}
            </ThemedText>
          </Pressable>
          <View style={styles.footerRow}>
            <ThemedText style={[styles.footerText, { color: palette.muted }]}>
              Already have an account?
            </ThemedText>
            <Link href="/auth/login" style={styles.linkWrap}>
              <ThemedText type="link">Log in</ThemedText>
            </Link>
          </View>
        </View>

        <View
          style={[
            styles.secondaryCard,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View style={[styles.sectionHeader, { borderColor: palette.border }]}>
            <MaterialIcons
              name="verified-user"
              size={18}
              color={palette.tint}
            />
            <ThemedText style={[styles.sectionTitle, { color: palette.text }]}>
              Why HandyConnect works
            </ThemedText>
          </View>
          <View style={styles.bulletRow}>
            <MaterialIcons
              name="my-location"
              size={16}
              color={palette.accent}
            />
            <ThemedText style={[styles.bulletText, { color: palette.muted }]}>
              GeoFire-powered proximity search so you see nearby pros first.
            </ThemedText>
          </View>
          <View style={styles.bulletRow}>
            <MaterialIcons
              name="event-available"
              size={16}
              color={palette.accent}
            />
            <ThemedText style={[styles.bulletText, { color: palette.muted }]}>
              Real-time scheduling sync to prevent double-booking.
            </ThemedText>
          </View>
          <View style={styles.bulletRow}>
            <MaterialIcons name="lock" size={16} color={palette.accent} />
            <ThemedText style={[styles.bulletText, { color: palette.muted }]}>
              Secure Firestore chat keeps job details aligned before arrival.
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function Field({
  label,
  icon,
  palette,
  ...inputProps
}: {
  label: string;
  icon?: string;
  palette: (typeof Colors)["light"];
} & ComponentProps<typeof TextInput>) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.field}>
      <ThemedText style={[styles.fieldLabel, { color: palette.text }]}>
        {label}
      </ThemedText>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: focused ? palette.tint : palette.border,
            backgroundColor: palette.card,
            borderWidth: focused ? 2 : 1,
          },
        ]}
      >
        {icon && (
          <MaterialIcons name={icon as any} size={18} color={palette.muted} />
        )}
        <TextInput
          style={[styles.input, { color: palette.text }]}
          placeholderTextColor={palette.muted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  hero: {
    borderRadius: 22,
    padding: 20,
    gap: 10,
  },
  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  heroTitle: {
    maxWidth: "90%",
  },
  heroCopy: {
    fontSize: 15,
    lineHeight: 22,
  },
  heroStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },
  heroPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  heroPillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    gap: 14,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  fieldGroup: {
    gap: 12,
  },
  field: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  primaryAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: "700",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 14,
  },
  linkWrap: {
    paddingVertical: 6,
  },
  secondaryCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
