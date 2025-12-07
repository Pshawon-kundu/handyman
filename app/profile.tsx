import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName] = useState("Ahmed Hassan");
  const [userEmail] = useState("ahmed@example.com");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Logout",
        onPress: () => {
          setIsLoggedIn(false);
          // Navigate to login - using window.location for now
          if (typeof window !== "undefined") {
            window.location.href = "/(auth)/login";
          }
        },
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
        {/* Header */}
        <View style={[styles.header, { backgroundColor: palette.tint }]}>
          <Link href="/(tabs)" asChild>
            <Pressable style={styles.backBtn}>
              <MaterialIcons name="arrow-back" size={24} color={palette.card} />
            </Pressable>
          </Link>
          <ThemedText style={[styles.headerTitle, { color: palette.card }]}>
            Profile
          </ThemedText>
          <View style={styles.spacer} />
        </View>

        {/* Profile Card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: palette.badge }]}>
            <MaterialIcons
              name="account-circle"
              size={64}
              color={palette.tint}
            />
          </View>
          <ThemedText style={[styles.name, { color: palette.text }]}>
            {userName}
          </ThemedText>
          <ThemedText style={[styles.email, { color: palette.muted }]}>
            {userEmail}
          </ThemedText>
          <View
            style={[styles.statusBadge, { backgroundColor: palette.badge }]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: palette.tint }]}
            />
            <ThemedText style={[styles.statusText, { color: palette.text }]}>
              Verified
            </ThemedText>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <MaterialIcons name="star" size={28} color={palette.tint} />
            <ThemedText style={[styles.statValue, { color: palette.text }]}>
              4.8
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: palette.muted }]}>
              Rating
            </ThemedText>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <MaterialIcons name="checklist" size={28} color={palette.tint} />
            <ThemedText style={[styles.statValue, { color: palette.text }]}>
              24
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: palette.muted }]}>
              Bookings
            </ThemedText>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <MaterialIcons name="favorite" size={28} color={palette.tint} />
            <ThemedText style={[styles.statValue, { color: palette.text }]}>
              12
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: palette.muted }]}>
              Favorites
            </ThemedText>
          </View>
        </View>

        {/* Menu Items */}
        <View
          style={[
            styles.menuCard,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <MenuItem
            icon="edit"
            label="Edit Profile"
            palette={palette}
            onPress={() =>
              Alert.alert("Coming Soon", "Edit profile feature coming soon")
            }
          />
          <MenuItem
            icon="location-on"
            label="Saved Addresses"
            palette={palette}
            onPress={() =>
              Alert.alert("Coming Soon", "Saved addresses feature coming soon")
            }
          />
          <MenuItem
            icon="history"
            label="Booking History"
            palette={palette}
            onPress={() =>
              Alert.alert("Coming Soon", "Booking history feature coming soon")
            }
          />
          <MenuItem
            icon="card-giftcard"
            label="My Discounts"
            palette={palette}
            onPress={() =>
              Alert.alert("Coming Soon", "Discounts feature coming soon")
            }
          />
          <MenuItem
            icon="help"
            label="Help & Support"
            palette={palette}
            onPress={() =>
              Alert.alert("Coming Soon", "Help & support feature coming soon")
            }
          />
          <MenuItem
            icon="settings"
            label="Settings"
            palette={palette}
            onPress={() =>
              Alert.alert("Coming Soon", "Settings feature coming soon")
            }
          />
        </View>

        {/* Logout Button */}
        <Pressable style={[styles.logoutBtn]} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#EF4444" />
          <ThemedText style={[styles.logoutBtnText]}>Logout</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

function MenuItem({
  icon,
  label,
  palette,
  onPress,
}: {
  icon: string;
  label: string;
  palette: (typeof Colors)["light"];
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        {
          backgroundColor: pressed ? palette.badge : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <MaterialIcons name={icon as never} size={20} color={palette.tint} />
      <ThemedText style={[styles.menuItemText, { color: palette.text }]}>
        {label}
      </ThemedText>
      <MaterialIcons name="chevron-right" size={20} color={palette.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 0, paddingBottom: 32 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  spacer: {
    width: 40,
  },
  profileCard: {
    margin: 16,
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
  },
  menuCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#EF4444",
  },
  logoutBtnText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
  },
});
