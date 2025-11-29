import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function ServiceScreen() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];
  const { width } = Dimensions.get("window");
  const CARD_WIDTH = Math.min(300, width * 0.72);
  const SPACING = 16;

  const categories = [
    { key: "plumbing", title: "Plumbing", icon: "plumbing" },
    { key: "electrical", title: "Electrical", icon: "electrical-services" },
    { key: "carpentry", title: "Carpentry", icon: "construction" },
    { key: "painting", title: "Painting", icon: "format-paint" },
    { key: "cleaning", title: "Cleaning", icon: "cleaning-services" },
  ];

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollRef = React.useRef<any>(null);
  const indexRef = React.useRef(0);

  // autoplay carousel
  React.useEffect(() => {
    const id = setInterval(() => {
      const next = (indexRef.current + 1) % categories.length;
      indexRef.current = next;
      const x = next * (CARD_WIDTH + SPACING);
      if (scrollRef.current?.scrollTo) {
        scrollRef.current.scrollTo({ x, animated: true });
      } else if (scrollRef.current?.getNode) {
        scrollRef.current.getNode().scrollTo({ x, animated: true });
      }
    }, 3600);

    return () => clearInterval(id);
  }, [CARD_WIDTH, categories.length]);

  function AnimatedChip({
    children,
    style,
    onPress,
  }: {
    children: React.ReactNode;
    style?: any;
    onPress?: () => void;
  }) {
    const scale = React.useRef(new Animated.Value(1)).current;
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() =>
          Animated.spring(scale, {
            toValue: 0.96,
            useNativeDriver: true,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
        }
      >
        <Animated.View style={[{ transform: [{ scale }] }, style]}>
          {children}
        </Animated.View>
      </Pressable>
    );
  }

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
            Services
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: palette.badge }]}>
            Browse available service categories
          </ThemedText>
        </View>

        <View style={{ paddingVertical: 12 }}>
          <Animated.ScrollView
            horizontal
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ref={scrollRef}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(ev) => {
              const x = ev.nativeEvent.contentOffset.x;
              const idx = Math.round(x / (CARD_WIDTH + SPACING));
              indexRef.current = idx;
            }}
            scrollEventThrottle={16}
          >
            {categories.map((c, i) => {
              const inputRange = [
                (i - 1) * (CARD_WIDTH + SPACING),
                i * (CARD_WIDTH + SPACING),
                (i + 1) * (CARD_WIDTH + SPACING),
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.94, 1, 0.94],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={c.key}
                  style={[
                    styles.serviceCard,
                    {
                      width: CARD_WIDTH,
                      marginRight: SPACING,
                      backgroundColor: palette.card,
                      borderColor: palette.border,
                      transform: [{ scale }],
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.serviceIconWrap,
                      { backgroundColor: palette.badge },
                    ]}
                  >
                    <MaterialIcons
                      name={c.icon as any}
                      size={28}
                      color={palette.joss ?? palette.tint}
                    />
                  </View>
                  <ThemedText
                    style={[styles.serviceTitle, { color: palette.text }]}
                  >
                    {c.title}
                  </ThemedText>
                  <ThemedText
                    style={[styles.serviceDesc, { color: palette.muted }]}
                  >
                    Find trusted professionals for {c.title.toLowerCase()} work
                    near you.
                  </ThemedText>
                </Animated.View>
              );
            })}
          </Animated.ScrollView>

          <View style={styles.dotsRow}>
            {categories.map((_, i) => {
              const inputRange = [
                (i - 1) * (CARD_WIDTH + SPACING),
                i * (CARD_WIDTH + SPACING),
                (i + 1) * (CARD_WIDTH + SPACING),
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: "clamp",
              });
              return (
                <Pressable
                  key={i}
                  onPress={() => {
                    indexRef.current = i;
                    const x = i * (CARD_WIDTH + SPACING);
                    if (scrollRef.current?.scrollTo)
                      scrollRef.current.scrollTo({ x, animated: true });
                  }}
                >
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        opacity,
                        backgroundColor: palette.joss ?? palette.tint,
                      },
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Quick suggestion chips */}
        <View style={styles.suggestionsRow}>
          <AnimatedChip
            style={[
              styles.chip,
              { backgroundColor: palette.joss ?? palette.tint },
            ]}
            onPress={() => {
              /* navigate or search */
            }}
          >
            <ThemedText style={{ color: palette.card, fontWeight: "700" }}>
              Try Electrician
            </ThemedText>
          </AnimatedChip>

          <AnimatedChip
            style={[
              styles.chip,
              {
                backgroundColor: palette.badge,
                borderWidth: 1,
                borderColor: palette.border,
              },
            ]}
            onPress={() => {
              /* navigate or search */
            }}
          >
            <ThemedText style={{ color: palette.text }}>
              Try Water man
            </ThemedText>
          </AnimatedChip>

          <AnimatedChip
            style={[
              styles.chip,
              {
                backgroundColor: palette.badge,
                borderWidth: 1,
                borderColor: palette.border,
              },
            ]}
            onPress={() => {
              /* navigate or search */
            }}
          >
            <ThemedText style={{ color: palette.text }}>
              All Services
            </ThemedText>
          </AnimatedChip>
        </View>

        {/* Suggested categories */}
        <View
          style={[
            styles.suggestionSection,
            { paddingHorizontal: 20, paddingVertical: 12 },
          ]}
        >
          <ThemedText style={[styles.sectionTitle, { color: palette.text }]}>
            Suggested
          </ThemedText>
          <View style={styles.suggestionList}>
            {["Repair service", "Cleaning", "Shifting"].map((s) => (
              <View
                key={s}
                style={[
                  styles.suggestionItem,
                  {
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                  },
                ]}
              >
                <ThemedText style={{ color: palette.text }}>{s}</ThemedText>
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
          <ThemedText style={[styles.title, { color: palette.text }]}>
            Popular Services
          </ThemedText>
          <ThemedText style={[styles.paragraph, { color: palette.muted }]}>
            Plumbing, Electrical, Carpentry, Painting and more — tap a category
            to see professionals near you.
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
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  serviceCard: {
    borderRadius: 14,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    justifyContent: "center",
  },
  serviceIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: { fontSize: 18, fontWeight: "700", marginTop: 8 },
  serviceDesc: { fontSize: 13, lineHeight: 18 },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  dot: { width: 8, height: 8, borderRadius: 8, marginHorizontal: 6 },
  suggestionsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  suggestionSection: { marginTop: 12 },
  suggestionList: { flexDirection: "row", gap: 12, marginTop: 8 },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
});
