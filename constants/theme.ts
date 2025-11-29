/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#1a1a2e",
    background: "#f8f9fa",
    tint: "#6366f1",
    icon: "#64748b",
    tabIconDefault: "#cbd5e1",
    tabIconSelected: "#6366f1",
    card: "#ffffff",
    muted: "#94a3b8",
    border: "#e2e8f0",
    accent: "#06b6d4",
    warning: "#f59e0b",
    badge: "#e0e7ff",
    joss: "#ec4899",
    success: "#10b981",
    secondary: "#f97316",
  },
  dark: {
    text: "#ecedee",
    background: "#0f172a",
    tint: "#818cf8",
    icon: "#cbd5e1",
    tabIconDefault: "#475569",
    tabIconSelected: "#818cf8",
    card: "#1e293b",
    muted: "#94a3b8",
    border: "#334155",
    accent: "#06b6d4",
    warning: "#f59e0b",
    badge: "#312e81",
    joss: "#ec4899",
    success: "#10b981",
    secondary: "#f97316",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
