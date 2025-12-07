import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authService } from "@/lib/services/authService";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function AccountScreen() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      setIsLoggedIn(isAuth);

      if (isAuth) {
        const user = await authService.getCurrentUser();
        setUserData(user);
      }
    } catch (error) {
      console.error("Failed to check auth status:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await authService.logout();
            router.replace("/(auth)/login");
          } catch (error) {
            Alert.alert("Error", "Failed to logout. Please try again.");
            console.error("Logout error:", error);
          }
        },
        style: "destructive",
      },
    ]);
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
            Account
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: palette.badge }]}>
            Manage profile, payment and settings
          </ThemedText>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
              <ThemedText style={[styles.title, { color: palette.text }]}>
                You&apos;re not signed in
              </ThemedText>
              <ThemedText style={[styles.paragraph, { color: palette.muted }]}>
                Sign in to access your bookings and account details.
              </ThemedText>

              <View style={{ marginTop: 12 }}>
                <Link href="/(auth)/login" asChild>
                  <Pressable
                    style={[styles.btn, { backgroundColor: palette.tint }]}
                  >
                    <ThemedText
                      style={{ color: palette.card, fontWeight: "700" }}
                    >
                      Sign in
                    </ThemedText>
                  </Pressable>
                </Link>
                <Link href="/(auth)/signup" asChild>
                  <Pressable
                    style={[
                      styles.btnOutline,
                      { borderColor: palette.border, marginTop: 8 },
                    ]}
                  >
                    <ThemedText
                      style={{ color: palette.text, fontWeight: "700" }}
                    >
                      Create account
                    </ThemedText>
                  </Pressable>
                </Link>
              </View>
            </View>
        
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  // use explicit margins instead of `gap` for web compatibility
  content: { padding: 20 },
  header: { padding: 16, borderRadius: 12, marginBottom: 12 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  headerSubtitle: { fontSize: 13, marginTop: 6 },
  card: { borderWidth: 1, borderRadius: 14, padding: 16 },
  title: { fontSize: 16, fontWeight: "700", marginTop: 8, marginBottom: 6 },
  paragraph: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  btnOutline: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
  },
});
