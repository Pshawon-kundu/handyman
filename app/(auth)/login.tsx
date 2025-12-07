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

const featureBadges = [
  { icon: "my-location", label: "Geo-search" },
  { icon: "schedule", label: "Live scheduling" },
  { icon: "chat-bubble-outline", label: "Secure chat" },
];

export default function LoginScreen() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Demo accounts
  const demoAccounts = [
    { email: "pmahi@uiu.com", password: "password123", name: "Provat" },
    { email: "pk@handyman.com", password: "pk123", name: "PK" },
  ];

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // For demo purposes, auto-login with any credentials
      // In production, this would validate against backend
      await authService.login(email.trim(), password);
      router.replace("/(tabs)");
    } catch (err: any) {
      console.error("Login failed", err);
      // Auto-create account for demo
      try {
        const fullName = email.split("@")[0];
        await authService.signup(email.trim(), password, fullName);
        router.replace("/(tabs)");
      } catch (signupErr) {
        Alert.alert("Login failed", "Please try again with demo account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setLoading(true);
    try {
      await authService.login(demoEmail, demoPassword);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Demo login error:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
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
        <View
          style={[
            styles.hero,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View style={[styles.heroHeader, { backgroundColor: palette.badge }]}>
            <MaterialIcons name="handyman" size={20} color={palette.tint} />
            <ThemedText
              style={[styles.heroHeaderText, { color: palette.text }]}
            >
              Welcome back
            </ThemedText>
          </View>
          <ThemedText
            type="title"
            style={[styles.heroTitle, { color: palette.text }]}
          >
            Pick up where you left off.
          </ThemedText>
          <ThemedText style={[styles.heroCopy, { color: palette.muted }]}>
            Keep bookings, schedules, and chats in sync with your HandyConnect
            account.
          </ThemedText>
          <View style={styles.badgeRow}>
            {featureBadges.map((badge) => (
              <View
                key={badge.label}
                style={[styles.badge, { backgroundColor: palette.badge }]}
              >
                <MaterialIcons
                  name={badge.icon as never}
                  size={16}
                  color={palette.tint}
                />
                <ThemedText style={[styles.badgeText, { color: palette.text }]}>
                  {badge.label}
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
            Log in
          </ThemedText>
          <ThemedText style={[styles.cardSubtitle, { color: palette.muted }]}>
            Access your saved jobs, schedules, and protected payments.
          </ThemedText>
          <View style={styles.fieldGroup}>
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
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              palette={palette}
            />
          </View>

          <Pressable
            onPress={onSubmit}
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
              <MaterialIcons name="login" size={18} color={palette.card} />
            )}
            <ThemedText
              style={[styles.primaryActionText, { color: palette.card }]}
            >
              {loading ? "Signing in..." : "Continue"}
            </ThemedText>
          </Pressable>

          {/* Demo Accounts Section */}
          <View style={styles.demoSection}>
            <ThemedText style={[styles.demoTitle, { color: palette.muted }]}>
              Quick Login - Demo Accounts
            </ThemedText>
            <View style={styles.demoButtonsContainer}>
              {demoAccounts.map((account, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    handleDemoLogin(account.email, account.password)
                  }
                  disabled={loading}
                  style={[
                    styles.demoBtn,
                    {
                      backgroundColor: palette.badge,
                      opacity: loading ? 0.6 : 1,
                    },
                  ]}
                >
                  <MaterialIcons
                    name="person"
                    size={16}
                    color={palette.tint}
                    style={{ marginRight: 6 }}
                  />
                  <View style={{ flex: 1 }}>
                    <ThemedText
                      style={[styles.demoBtnName, { color: palette.text }]}
                    >
                      {account.name}
                    </ThemedText>
                    <ThemedText
                      style={[styles.demoBtnEmail, { color: palette.muted }]}
                    >
                      {account.email}
                    </ThemedText>
                  </View>
                  <MaterialIcons
                    name="arrow-forward"
                    size={18}
                    color={palette.tint}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.footerRow}>
            <ThemedText style={[styles.footerText, { color: palette.muted }]}>
              Don't have an account?
            </ThemedText>
            <Link href="/(auth)/signup" style={styles.linkWrap}>
              <ThemedText type="link">Sign up here</ThemedText>
            </Link>
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
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    gap: 10,
  },
  heroHeader: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroHeaderText: {
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
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  badgeText: {
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
  demoSection: {
    gap: 10,
    marginTop: 8,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  demoButtonsContainer: {
    gap: 8,
  },
  demoBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  demoBtnName: {
    fontSize: 14,
    fontWeight: "600",
  },
  demoBtnEmail: {
    fontSize: 12,
  },
});
