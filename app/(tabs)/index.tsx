import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
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

const { width: screenWidth } = Dimensions.get("window");

type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type ServiceProvider = {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  verified: boolean;
};

const categories: ServiceCategory[] = [
  { id: "1", name: "Repair", icon: "build", color: "#6366f1" },
  { id: "2", name: "Cleaning", icon: "cleaning-services", color: "#06b6d4" },
  { id: "3", name: "Health", icon: "health-and-safety", color: "#10b981" },
  { id: "4", name: "Moving", icon: "local-shipping", color: "#f97316" },
  { id: "5", name: "Events", icon: "celebration", color: "#ec4899" },
  { id: "6", name: "Decor", icon: "home", color: "#f59e0b" },
  { id: "7", name: "Insurance", icon: "verified", color: "#8b5cf6" },
  { id: "8", name: "Manpower", icon: "people", color: "#3b82f6" },
];

const providers: ServiceProvider[] = [
  {
    id: "1",
    name: "Excellent Care",
    service: "Washing Machine repair",
    rating: 4.8,
    reviews: 245,
    price: "৳ 250/Hr",
    image: "",
    verified: true,
  },
  {
    id: "2",
    name: "VIP Service Center",
    service: "Handyman",
    rating: 4.8,
    reviews: 189,
    price: "৳ 200/Hr",
    image: "",
    verified: true,
  },
  {
    id: "3",
    name: "Smart Housing",
    service: "Carpentry",
    rating: 4.9,
    reviews: 312,
    price: "৳ 300/Hr",
    image: "",
    verified: true,
  },
  {
    id: "4",
    name: "Pro Cleaners",
    service: "House Cleaning",
    rating: 4.7,
    reviews: 567,
    price: "৳ 180/Hr",
    image: "",
    verified: true,
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const catSlide = useRef(new Animated.Value(30)).current;
  const catFade = useRef(new Animated.Value(0)).current;
  const filterSlide = useRef(new Animated.Value(30)).current;
  const filterFade = useRef(new Animated.Value(0)).current;
  const popularSlide = useRef(new Animated.Value(30)).current;
  const popularFade = useRef(new Animated.Value(0)).current;
  const categoryTranslate = useRef(
    categories.map(() => new Animated.Value(24))
  ).current;
  const categoryOpacity = useRef(
    categories.map(() => new Animated.Value(0))
  ).current;
  const categoryScale = useRef(
    categories.map(() => new Animated.Value(0.96))
  ).current;
  const popularTranslate = useRef(
    [1, 2, 3, 4].map(() => new Animated.Value(40))
  ).current;
  const popularOpacity = useRef(
    [1, 2, 3, 4].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(catSlide, {
        toValue: 0,
        duration: 420,
        delay: 340,
        useNativeDriver: true,
      }),
      Animated.timing(catFade, {
        toValue: 1,
        duration: 420,
        delay: 340,
        useNativeDriver: true,
      }),
      Animated.timing(filterSlide, {
        toValue: 0,
        duration: 420,
        delay: 520,
        useNativeDriver: true,
      }),
      Animated.timing(filterFade, {
        toValue: 1,
        duration: 420,
        delay: 520,
        useNativeDriver: true,
      }),
      Animated.timing(popularSlide, {
        toValue: 0,
        duration: 420,
        delay: 800,
        useNativeDriver: true,
      }),
      Animated.timing(popularFade, {
        toValue: 1,
        duration: 420,
        delay: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const perTileAnimations = categories.map((_, i) =>
      Animated.parallel([
        Animated.timing(categoryTranslate[i], {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(categoryOpacity[i], {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(categoryScale[i], {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(80, perTileAnimations).start();

    const popularAnimations = [1, 2, 3, 4].map((_, i) =>
      Animated.parallel([
        Animated.timing(popularTranslate[i], {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(popularOpacity[i], {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ])
    );

    setTimeout(() => {
      Animated.stagger(60, popularAnimations).start();
    }, 900);
  }, [
    fadeAnim,
    slideAnim,
    catFade,
    catSlide,
    filterSlide,
    filterFade,
    popularSlide,
    popularFade,
    categoryTranslate,
    categoryOpacity,
    categoryScale,
    popularTranslate,
    popularOpacity,
  ]);

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: palette.background }]}
    >
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: palette.tint,
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View style={styles.locationSection}>
            <MaterialIcons name="location-on" size={20} color="#ffffff" />
            <ThemedText style={styles.locationText} numberOfLines={1}>
              Dhaka, Bangladesh
            </ThemedText>
          </View>
          <Pressable style={styles.menuIcon}>
            <MaterialIcons name="menu" size={24} color="#ffffff" />
          </Pressable>
        </View>

        <View style={styles.headerTitleSection}>
          <ThemedText style={styles.headerTitle}>HandyConnect</ThemedText>
          <View style={styles.headerActions}>
            <Pressable style={styles.notificationIcon}>
              <MaterialIcons name="notifications" size={20} color="#ffffff" />
              <View style={styles.notificationBadge} />
            </Pressable>
            <Link href="/profile" asChild>
              <Pressable style={styles.profileIcon}>
                <MaterialIcons
                  name="account-circle"
                  size={24}
                  color="#ffffff"
                />
              </Pressable>
            </Link>
          </View>
        </View>

        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
              borderWidth: isSearchFocused ? 2 : 1,
            },
          ]}
        >
          <MaterialIcons
            name="search"
            size={20}
            color={palette.muted}
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={[styles.searchInput, { color: palette.text }]}
            placeholder="Search services, pros..."
            placeholderTextColor={palette.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <MaterialIcons name="close" size={20} color={palette.muted} />
            </Pressable>
          )}
        </View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <Animated.View
          style={[
            styles.section,
            { paddingTop: 20 },
            { transform: [{ translateX: catSlide }], opacity: catFade },
          ]}
        >
          <ThemedText
            style={[
              styles.sectionTitle,
              { color: palette.text, paddingHorizontal: 16 },
            ]}
          >
            Get instant access to reliable services
          </ThemedText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category, i) => (
              <Animated.View
                key={category.id}
                style={{
                  transform: [
                    { translateY: categoryTranslate[i] },
                    { scale: categoryScale[i] },
                  ],
                  opacity: categoryOpacity[i],
                }}
              >
                <Pressable
                  onPress={() => setSelectedCategory(category.id)}
                  onPressIn={() =>
                    Animated.spring(categoryScale[i], {
                      toValue: 0.92,
                      useNativeDriver: true,
                    }).start()
                  }
                  onPressOut={() =>
                    Animated.spring(categoryScale[i], {
                      toValue: 1,
                      useNativeDriver: true,
                    }).start()
                  }
                  style={[
                    styles.categoryItem,
                    {
                      backgroundColor:
                        selectedCategory === category.id
                          ? category.color
                          : palette.card,
                      borderColor: palette.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.categoryIconBox,
                      {
                        backgroundColor:
                          selectedCategory === category.id
                            ? "rgba(255,255,255,0.2)"
                            : palette.badge,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name={category.icon as any}
                      size={28}
                      color={
                        selectedCategory === category.id
                          ? "#ffffff"
                          : category.color
                      }
                    />
                  </View>
                  <ThemedText
                    style={[
                      styles.categoryName,
                      {
                        color:
                          selectedCategory === category.id
                            ? "#ffffff"
                            : palette.text,
                        fontSize: 12,
                      },
                    ]}
                  >
                    {category.name}
                  </ThemedText>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View
          style={[
            styles.filterBar,
            {
              transform: [{ translateY: filterSlide }],
              opacity: filterFade,
            },
          ]}
        >
          <ThemedText
            style={[
              styles.resultCount,
              { color: palette.text, paddingHorizontal: 16 },
            ]}
          >
            8 Service Providers
          </ThemedText>
          <Pressable
            style={[
              styles.filterBtn,
              {
                backgroundColor: palette.badge,
                borderColor: palette.border,
              },
            ]}
          >
            <MaterialIcons
              name="tune"
              size={20}
              color={palette.tint}
              style={{ marginRight: 6 }}
            />
            <ThemedText style={[styles.filterBtnText, { color: palette.tint }]}>
              Filter
            </ThemedText>
          </Pressable>
        </Animated.View>

        <View style={[styles.section, { paddingHorizontal: 16 }]}>
          <ThemedText
            style={[styles.sectionSubtitle, { color: palette.muted }]}
          >
            Recommended for you
          </ThemedText>

          <View style={styles.providersContainer}>
            {providers.map((provider, index) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                palette={palette}
                delay={100 + index * 80}
                index={index}
              />
            ))}
          </View>
        </View>

        <Animated.View
          style={[
            styles.section,
            {
              paddingHorizontal: 16,
              paddingBottom: 80,
              transform: [{ translateY: popularSlide }],
              opacity: popularFade,
            },
          ]}
        >
          <View style={styles.popularHeader}>
            <ThemedText
              style={[styles.sectionTitle, { color: palette.text, flex: 1 }]}
            >
              Most Popular Services
            </ThemedText>
            <Pressable>
              <ThemedText style={[styles.viewAll, { color: palette.tint }]}>
                view all
              </ThemedText>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularContent}
          >
            {[1, 2, 3, 4].map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.popularCard,
                  {
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                    transform: [{ translateX: popularTranslate[i - 1] }],
                    opacity: popularOpacity[i - 1],
                  },
                ]}
              >
                <View
                  style={[
                    styles.popularImageBox,
                    { backgroundColor: palette.badge },
                  ]}
                >
                  <ThemedText style={styles.imagePlaceholder}>
                    {["🔧", "🧹", "🏥", "📦"][i - 1]}
                  </ThemedText>
                </View>
                <ThemedText
                  style={[styles.popularTitle, { color: palette.text }]}
                  numberOfLines={2}
                >
                  {
                    ["Quick Repair", "Deep Clean", "Health Check", "Moving"][
                      i - 1
                    ]
                  }
                </ThemedText>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

function ProviderCard({
  provider,
  palette,
  delay,
  index,
}: {
  provider: ServiceProvider;
  palette: (typeof Colors)["light"];
  delay: number;
  index: number;
}) {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const panX = useRef(new Animated.Value(0)).current;
  const [swiped, setSwiped] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: panX }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt: any, gestureState: any) => {
        if (gestureState.dx < -50) {
          Animated.sequence([
            Animated.parallel([
              Animated.timing(panX, {
                toValue: -screenWidth,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ]).start(() => setSwiped(true));
        } else {
          Animated.spring(panX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [delay, slideAnim, fadeAnim, scaleAnim]);

  if (swiped) return null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.providerCard,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
          transform: [
            { translateY: slideAnim },
            { translateX: panX },
            { scale: scaleAnim },
          ],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.providerImageBox}>
        <View
          style={[styles.providerImage, { backgroundColor: palette.badge }]}
        >
          <ThemedText style={styles.providerImageText}>
            {["👨‍🔧", "🔧", "🛠️", "🧹"][Math.floor(Math.random() * 4)]}
          </ThemedText>
        </View>
        {provider.verified && (
          <View style={styles.verifiedBadge}>
            <MaterialIcons name="verified" size={16} color="#ffffff" />
          </View>
        )}
      </View>

      <View style={styles.providerInfo}>
        <ThemedText style={[styles.providerName, { color: palette.text }]}>
          {provider.name}
        </ThemedText>
        <ThemedText style={[styles.providerService, { color: palette.muted }]}>
          {provider.service}
        </ThemedText>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <MaterialIcons name="star" size={14} color="#fbbf24" />
            <ThemedText style={[styles.ratingNumber, { color: palette.text }]}>
              {provider.rating}
            </ThemedText>
          </View>
          <ThemedText style={[styles.reviews, { color: palette.muted }]}>
            ({provider.reviews})
          </ThemedText>
        </View>

        <ThemedText style={[styles.price, { color: palette.tint }]}>
          {provider.price}
        </ThemedText>
      </View>

      <Pressable style={[styles.ctaButton, { backgroundColor: palette.tint }]}>
        <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    gap: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  locationText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
  },
  menuIcon: {
    padding: 8,
  },
  headerTitleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationIcon: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: "#ef4444",
  },
  profileIcon: {
    padding: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 10,
  },

  section: {
    paddingVertical: 16,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },

  categoriesScroll: {
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryItem: {
    width: 90,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  categoryIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontWeight: "600",
    textAlign: "center",
  },

  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  resultCount: {
    fontSize: 14,
    fontWeight: "600",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: "600",
  },

  providersContainer: {
    gap: 14,
    marginTop: 10,
  },
  providerCard: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
    alignItems: "center",
  },
  providerImageBox: {
    position: "relative",
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  providerImageText: {
    fontSize: 40,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  providerInfo: {
    flex: 1,
    gap: 6,
  },
  providerName: {
    fontSize: 15,
    fontWeight: "700",
  },
  providerService: {
    fontSize: 13,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingNumber: {
    fontSize: 13,
    fontWeight: "600",
  },
  reviews: {
    fontSize: 12,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  ctaButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: "600",
  },
  popularContent: {
    paddingRight: 16,
    gap: 12,
  },
  popularCard: {
    width: 110,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  popularImageBox: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    fontSize: 36,
  },
  popularTitle: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
  },
});
