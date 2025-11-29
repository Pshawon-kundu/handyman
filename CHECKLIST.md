# ✅ HandyConnect Setup Checklist

## Phase 1: Frontend Ready ✅ COMPLETE

- [x] Service layer created (5 files)

  - [x] api.ts - Base API caller
  - [x] authService.ts - Auth methods
  - [x] userService.ts - User profile
  - [x] providerService.ts - Browse providers
  - [x] bookingService.ts - Bookings

- [x] Packages installed

  - [x] @react-native-async-storage/async-storage

- [x] Dev server running

  - [x] Frontend: http://localhost:8081

- [x] Documentation created
  - [x] SETUP_COMPLETE.md
  - [x] README_INTEGRATION.md
  - [x] NEXT_STEPS_SETUP.md

---

## Phase 2: Update Auth Screens ⏳ TODO (5 min)

- [ ] Open `app/auth/login.tsx`
- [ ] Replace entire file with code from SETUP_COMPLETE.md section "Updated login.tsx"
- [ ] Open `app/auth/signup.tsx`
- [ ] Replace entire file with code from SETUP_COMPLETE.md section "Updated signup.tsx"

**Why:** Add real API calls instead of mock handlers

---

## Phase 3: Firebase Setup ⏳ TODO (10 min)

- [ ] Go to https://console.firebase.google.com
- [ ] Click "Create project"
- [ ] Name: "HandyConnect"
- [ ] Disable Google Analytics
- [ ] Create

Once created:

- [ ] Enable Firestore Database (production mode)
- [ ] Enable Authentication → Email/Password
- [ ] Enable Cloud Messaging
- [ ] Enable Storage
- [ ] Go to Project Settings → Service Accounts
- [ ] Click "Generate New Private Key"
- [ ] Save JSON file

Convert to Base64 (Windows):

```powershell
certutil -encode serviceAccountKey.json serviceAccountKey.b64
```

---

## Phase 4: Backend Configuration ⏳ TODO (5 min)

In `c:\Users\PK\handyconnect-backend`:

- [ ] Create `.env` file
- [ ] Add these variables:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:8081,http://localhost:3000

# Firebase (from Phase 3)
FIREBASE_SERVICE_ACCOUNT_KEY=<base64_encoded_json>
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Stripe (optional for now)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

# JWT Secret (create random string)
JWT_SECRET=your_secret_key_min_32_chars_long

# Optional Email Services
TWILIO_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=

SENDGRID_API_KEY=
```

---

## Phase 5: Start Backend ⏳ TODO (3 min)

```powershell
cd c:\Users\PK\handyconnect-backend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected output:**

```
Server running on http://localhost:5000
Health check: GET http://localhost:5000/health
```

**Check it's working:**

```powershell
curl http://localhost:5000/health
# Should return: {"status":"OK"}
```

---

## Phase 6: Test Full Flow ⏳ TODO (5 min)

### Frontend Running

```powershell
# In another terminal
cd c:\Users\PK\mobileapp
npm run web
```

### Test Signup

1. Open http://localhost:8081
2. Go to `/auth/signup`
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123456
4. Click "Create account"

**Expected:**

- Loading spinner appears
- Request sent to http://localhost:5000/api/auth/signup
- Token saved to AsyncStorage
- Redirected to home screen

### Check Network

Open DevTools → Network tab:

- Should see POST request to localhost:5000/api/auth/signup
- Response: 201 status with token and user data

### Test Login

1. Go to `/auth/login`
2. Enter test@example.com / Test123456
3. Click "Continue"

**Expected:** Redirected to home, token restored from AsyncStorage

---

## ✨ Success Indicators

When everything is working:

1. **Frontend compiles** - No TypeScript errors
2. **Backend starts** - Says "Server running on http://localhost:5000"
3. **Signup works** - Can create account, token saved
4. **Login works** - Can log in with created account
5. **Network calls** - Browser DevTools shows API calls to localhost:5000
6. **No errors** - Console clean, backend logs show requests

---

## 🚀 Next Steps After Integration

Once Phase 6 passes:

1. **Browse Providers** - Update home screen to load providers from API
2. **Create Bookings** - Add booking flow
3. **Process Payments** - Add Stripe integration
4. **Real-time Features** - Add FCM notifications
5. **Upload Images** - Add Firebase Storage integration

---

## 📞 Quick Reference

| Component    | Location                         | Purpose             |
| ------------ | -------------------------------- | ------------------- |
| Frontend     | c:\Users\PK\mobileapp            | React Native + Expo |
| Backend      | c:\Users\PK\handyconnect-backend | Express + Firebase  |
| Services     | app/services/                    | API helpers         |
| Auth Screens | app/auth/                        | Login/Signup UI     |
| API Docs     | Backend README.md                | All endpoints       |

---

## 🔗 All Services Available

```typescript
// Import and use in any React component

import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { providerService } from "@/services/providerService";
import { bookingService } from "@/services/bookingService";

// Call any method:
await authService.login(email, password);
await userService.getUserProfile();
await providerService.getProviders({ category: "Plumbing" });
await bookingService.createBooking({ providerId, date, time, amount });
```

---

## 📝 Notes

- Services automatically add auth token to all requests
- Token stored in AsyncStorage persists across app restarts
- API base URL is configurable via `.env` EXPO_PUBLIC_API_URL
- All errors include helpful error messages
- Backend logs all requests for debugging

---

## 🎯 Current Status

**Frontend:** 95% - Just needs login/signup updated
**Backend:** 100% - Ready with all 30+ endpoints
**Integration:** 0% - Blocked on Firebase credentials

**ETA to full working authentication:** 20-30 minutes

---

**Ready? Start with Phase 2! 👉 Update those auth screens!**
