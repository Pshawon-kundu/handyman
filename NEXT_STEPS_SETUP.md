# Quick Start: Run HandyConnect Frontend + Backend

## Step 1: Install Frontend Dependencies ✅ DONE

Already completed. You've installed:

- AsyncStorage for token management
- All Expo packages

## Step 2: Add Environment Configuration

Create a `.env` file in your mobile app root:

```bash
cd c:\Users\PK\mobileapp
```

Create `.env`:

```
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

For production, change to your deployed backend URL.

## Step 3: Update Auth Screens with Backend Integration

**Files to update:**

- `app/auth/login.tsx`
- `app/auth/signup.tsx`

Replace the entire file contents with the code below:

### Updated login.tsx

```typescript
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { authService } from "@/services/authService";

const featureBadges = [
  { icon: "my-location", label: "Geo-search" },
  { icon: "schedule", label: "Live scheduling" },
  { icon: "chat-bubble-outline", label: "Secure chat" },
];

export default function LoginScreen() {
  const scheme = useColorScheme() ?? "light";
  const palette = Colors[scheme];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
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
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              palette={palette}
            />
            <Field
              label="Password"
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              palette={palette}
            />
          </View>
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [
              styles.primaryAction,
              {
                backgroundColor: palette.tint,
                opacity: pressed || loading ? 0.7 : 1,
              },
            ]}
          >
            <MaterialIcons name="login" size={18} color={palette.card} />
            <ThemedText
              style={[styles.primaryActionText, { color: palette.card }]}
            >
              {loading ? "Signing in..." : "Continue"}
            </ThemedText>
          </Pressable>
          <View style={styles.footerRow}>
            <ThemedText style={[styles.footerText, { color: palette.muted }]}>
              New to HandyConnect?
            </ThemedText>
            <Link href="/auth/signup" style={styles.linkWrap}>
              <ThemedText type="link">Create account</ThemedText>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function Field({
  label,
  palette,
  ...inputProps
}: {
  label: string;
  palette: (typeof Colors)["light"];
} & ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <ThemedText style={[styles.fieldLabel, { color: palette.text }]}>
        {label}
      </ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: palette.border,
            backgroundColor: palette.background,
            color: palette.text,
          },
        ]}
        placeholderTextColor={palette.muted}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 16 },
  hero: { borderWidth: 1, borderRadius: 22, padding: 20, gap: 10 },
  heroHeader: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroHeaderText: { fontSize: 13, fontWeight: "700" },
  heroTitle: { maxWidth: "90%" },
  heroCopy: { fontSize: 15, lineHeight: 22 },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  badgeText: { fontSize: 13, fontWeight: "600" },
  card: { borderWidth: 1, borderRadius: 18, padding: 18, gap: 14 },
  cardTitle: { fontSize: 20, lineHeight: 26 },
  cardSubtitle: { fontSize: 14, lineHeight: 20 },
  fieldGroup: { gap: 12 },
  field: { gap: 6 },
  fieldLabel: { fontSize: 14, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
  },
  primaryAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryActionText: { fontSize: 16, fontWeight: "700" },
  footerRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  footerText: { fontSize: 14 },
  linkWrap: { paddingVertical: 6 },
});
```

### Updated signup.tsx

Replace entire file with code from BACKEND_INTEGRATION_GUIDE.md section "3. UPDATE SIGNUP SCREEN"

## Step 4: Setup Firebase Project (REQUIRED)

1. Go to https://console.firebase.google.com
2. Create a new project named "HandyConnect"
3. Enable these services:

   - Firestore Database (production mode)
   - Authentication (Email/Password)
   - Cloud Messaging
   - Storage

4. Get your credentials:

   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download JSON file

5. Convert to Base64:

   ```bash
   certutil -encode serviceAccountKey.json serviceAccountKey.b64
   ```

6. Copy the content and save it

## Step 5: Setup Backend .env File

In `c:\Users\PK\handyconnect-backend`, create `.env`:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:8081,http://localhost:3000

# Firebase (from step 4)
FIREBASE_SERVICE_ACCOUNT_KEY=<base64_encoded_key_from_step_5>
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Stripe (get from stripe.com/dashboard)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

# JWT Secret (create a random string)
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Optional: Email Services
TWILIO_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=

SENDGRID_API_KEY=
```

## Step 6: Install and Start Backend

```bash
cd c:\Users\PK\handyconnect-backend

# Install dependencies
npm install

# Start development server
npm run dev
```

Expected output:

```
Server running on http://localhost:5000
Health check: GET http://localhost:5000/health
```

## Step 7: Start Frontend Dev Server

In another terminal:

```bash
cd c:\Users\PK\mobileapp

# Start Expo dev server
npm run web
```

Visit: http://localhost:8081

## Step 8: Test Authentication Flow

### Create Test Account

1. Open http://localhost:8081 in your browser
2. Click "Create account" (or go to `/auth/signup`)
3. Sign up with:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123456

Expected: Redirects to home screen

### Login

1. Go to `/auth/login`
2. Enter test@example.com / Test123456
3. Click "Continue"

Expected: Redirects to home screen, token saved

## Step 9: Verify Integration

Check browser DevTools → Network tab:

- POST to `http://localhost:5000/api/auth/signup` (status 201)
- POST to `http://localhost:5000/api/auth/login` (status 200)
- Token stored in AsyncStorage

## Step 10: Next Features to Implement

Once auth is working:

1. **Browse Providers** - Add provider listing to home screen

   - Call `GET /api/service-providers` in `index.tsx`
   - Display real provider data from Firestore

2. **Create Bookings** - Add booking flow

   - POST `/api/bookings` with selected provider

3. **Payment Integration** - Connect Stripe

   - POST `/api/payments/create-intent`
   - Confirm payment after card charge

4. **Real-time Features**

   - Register FCM token: POST `/api/notifications/register-token`
   - Listen to Firestore for booking updates
   - Handle push notifications

5. **User Profile** - Load actual user data
   - GET `/api/users/profile`
   - PUT to update profile info

---

## Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <PID> /F
```

### Auth not working

- Check `.env` file has Firebase credentials
- Check backend console for error messages
- Verify Firestore is enabled in Firebase

### Network errors

- Ensure backend server is running (check terminal for "Server running...")
- Check FRONTEND_URL in backend .env matches your frontend URL
- Check CORS settings in server.js

### Firebase errors

- Verify service account key is correctly formatted
- Check Firestore has no security rules blocking writes
- Go to Firebase Console → Firestore → check permission rules

---

## File Checklist

Frontend service layer created:

- ✅ `app/services/api.ts` - Base API caller
- ✅ `app/services/authService.ts` - Auth methods
- ✅ `app/services/userService.ts` - User profile
- ✅ `app/services/providerService.ts` - Browse providers
- ✅ `app/services/bookingService.ts` - Booking management

Backend ready:

- ✅ 11 files created with all routes
- ✅ 30+ endpoints implemented
- ✅ Firebase & Stripe integration

Next: Update UI screens to use these services.
