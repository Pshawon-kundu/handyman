# 🚀 Quick Start Visual Guide

## Current State

```
┌─────────────────────────────────────────────┐
│         HandyConnect Setup Progress         │
├─────────────────────────────────────────────┤
│ Frontend Service Layer        [████████] 100%│
│ Auth Screens                  [░░░░░░░░░░] 0%│
│ Firebase Setup                [░░░░░░░░░░] 0%│
│ Backend Start                 [░░░░░░░░░░] 0%│
│ Full Integration              [░░░░░░░░░░] 0%│
└─────────────────────────────────────────────┘
```

---

## 3 Phases to Complete

### Phase 1️⃣: Update Auth Screens (5 min)

```
app/auth/login.tsx
├─ Add: import { useRouter } from 'expo-router'
├─ Add: import { authService } from '@/services/authService'
├─ Add: import { Alert } from 'react-native'
├─ Replace: Pressable onPress with handleLogin()
├─ Update: handleLogin() to call authService.login()
├─ Add: loading state and error handling
└─ Test: npm run web → Click "Continue"

app/auth/signup.tsx
├─ Add: import { useRouter } from 'expo-router'
├─ Add: import { authService } from '@/services/authService'
├─ Add: import { Alert } from 'react-native'
├─ Replace: Pressable onPress with handleSignup()
├─ Update: handleSignup() to call authService.signup()
├─ Add: loading state and error handling
└─ Test: npm run web → Click "Create account"
```

**Copy-paste from:** SETUP_COMPLETE.md section "Updated login.tsx" & "Updated signup.tsx"

---

### Phase 2️⃣: Firebase Setup (10 min)

```
Step 1: Create Project
├─ https://console.firebase.google.com
├─ Click "Create project"
├─ Name: HandyConnect
├─ Disable Google Analytics
└─ Create

Step 2: Enable Services
├─ Firestore Database (production)
├─ Authentication (Email/Password)
├─ Cloud Messaging
└─ Storage

Step 3: Get Credentials
├─ Project Settings → Service Accounts
├─ Click "Generate New Private Key"
├─ Save JSON file
├─ Convert to Base64:
│  certutil -encode serviceAccountKey.json serviceAccountKey.b64
└─ Copy content
```

**Result:** Firebase credentials ready for .env

---

### Phase 3️⃣: Start Backend (8 min)

```
Step 1: Configure Backend
├─ cd c:\Users\PK\handyconnect-backend
├─ Create .env file
└─ Add these variables:
   ├─ NODE_ENV=development
   ├─ PORT=5000
   ├─ FRONTEND_URL=http://localhost:8081
   ├─ FIREBASE_SERVICE_ACCOUNT_KEY=<base64>
   ├─ FIREBASE_DATABASE_URL=<url>
   ├─ FIREBASE_STORAGE_BUCKET=<bucket>
   ├─ STRIPE_SECRET_KEY=sk_test_...
   └─ JWT_SECRET=<random_32_chars>

Step 2: Install & Start
├─ npm install
└─ npm run dev

Expected Output:
└─ Server running on http://localhost:5000
```

**Check it works:**

```powershell
curl http://localhost:5000/health
# Should return: {"status":"OK"}
```

---

## Test Endpoints

### 1. Signup Flow

```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123456",
  "fullName": "Test User"
}

Expected Response (201):
{
  "token": "eyJhbGc...",
  "user": {
    "uid": "user123",
    "email": "test@example.com",
    "fullName": "Test User"
  }
}
```

### 2. Login Flow

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123456"
}

Expected Response (200):
{
  "token": "eyJhbGc...",
  "user": {
    "uid": "user123",
    "email": "test@example.com"
  }
}
```

### 3. Get Profile

```
GET http://localhost:5000/api/users/profile
Authorization: Bearer <token>

Expected Response (200):
{
  "user": {
    "uid": "user123",
    "email": "test@example.com",
    "fullName": "Test User",
    "phone": null,
    "location": null,
    "avatar": null
  }
}
```

---

## Frontend Test Flow

### UI Testing

```
1. Open http://localhost:8081 in browser
2. Verify home screen loads with animations
3. Click profile icon → Profile page
4. Scroll down → Logout button
5. Click logout
6. Should redirect to login
```

### Signup Test

```
1. Click "Create account" or go to /auth/signup
2. Fill form:
   ├─ Full name: John Doe
   ├─ Email: john@example.com
   └─ Password: John123456
3. Click "Create account"
4. Should see:
   ├─ Loading spinner
   ├─ POST to /api/auth/signup in Network tab
   ├─ 201 status
   └─ Redirect to home
```

### Login Test

```
1. Go to /auth/login
2. Fill form:
   ├─ Email: john@example.com
   └─ Password: John123456
3. Click "Continue"
4. Should see:
   ├─ Loading spinner
   ├─ POST to /api/auth/login in Network tab
   ├─ 200 status
   └─ Redirect to home
```

### DevTools Check

```
DevTools → Application → Storage → AsyncStorage
├─ authToken: eyJhbGc...
└─ userData: {"uid":"user123",...}

DevTools → Network → XHR
├─ POST /api/auth/signup → 201
├─ POST /api/auth/login → 200
└─ GET /api/users/profile → 200 (with token)
```

---

## Common Issues & Fixes

### Issue: "Module not found"

```
Error: Cannot find module '@/services/authService'

Fix:
1. Check file exists at app/services/authService.ts
2. Run: npm run web (restart dev server)
3. Clear metro cache: Ctrl+C, then npm run web
```

### Issue: "API call failed"

```
Error: Failed to fetch http://localhost:5000/api/auth/login

Fix:
1. Check backend is running: npm run dev
2. Check URL is correct in .env
3. Check CORS settings in server.js
4. Check firewall isn't blocking port 5000
```

### Issue: "Firebase error"

```
Error: FIREBASE_SERVICE_ACCOUNT_KEY not found

Fix:
1. Check .env file exists
2. Check credentials are Base64 encoded
3. Check all variables are present
4. Restart backend: npm run dev
```

### Issue: "AsyncStorage not found"

```
Error: Cannot find module '@react-native-async-storage/async-storage'

Fix:
npm install @react-native-async-storage/async-storage
npm run web
```

---

## Command Reference

```bash
# Frontend
cd c:\Users\PK\mobileapp
npm run web              # Start dev server (port 8081)
npm run web -- --reset-cache  # Reset metro cache

# Backend
cd c:\Users\PK\handyconnect-backend
npm install              # Install dependencies first time
npm run dev              # Start with auto-reload (port 5000)
npm start                # Start without auto-reload

# Testing
curl http://localhost:8081        # Frontend check
curl http://localhost:5000/health # Backend check
curl http://localhost:5000/api/auth/login  # API test
```

---

## Success Indicators ✅

- [ ] Both servers running (8081 & 5000)
- [ ] No console errors
- [ ] Signup creates account
- [ ] Login accepts credentials
- [ ] Token stored in AsyncStorage
- [ ] DevTools shows API calls
- [ ] Response codes: 201 (signup), 200 (login)
- [ ] User data saved to Firestore
- [ ] Home screen loads after login

---

## Timeline Estimate

| Phase | Task                | Duration | Total  |
| ----- | ------------------- | -------- | ------ |
| 1     | Update auth screens | 5 min    | 5 min  |
| 2     | Firebase setup      | 10 min   | 15 min |
| 3     | Backend .env        | 5 min    | 20 min |
| 3     | Start backend       | 3 min    | 23 min |
| -     | Test full flow      | 5 min    | 28 min |

**Total: ~30 minutes** from start to working authentication

---

## File References

| File                  | Purpose        | Edit?     |
| --------------------- | -------------- | --------- |
| SETUP_COMPLETE.md     | Code to copy   | Read      |
| CHECKLIST.md          | Step-by-step   | Follow    |
| NEXT_STEPS_SETUP.md   | Detailed guide | Read      |
| README_INTEGRATION.md | Architecture   | Reference |
| SESSION_SUMMARY.md    | Full summary   | Reference |
| app/auth/login.tsx    | Auth UI        | ✏️ UPDATE |
| app/auth/signup.tsx   | Auth UI        | ✏️ UPDATE |
| backend/.env          | Config         | ✏️ CREATE |

---

## After Integration Works

Once you can signup/login successfully:

1. **Add Provider Browsing**

   ```typescript
   const providers = await providerService.getProviders({
     category: "Plumbing",
   });
   ```

2. **Create Bookings**

   ```typescript
   const booking = await bookingService.createBooking({
     providerId,
     date,
     time,
     amount,
   });
   ```

3. **Process Payments**

   ```typescript
   const intent = await paymentService.createPaymentIntent(bookingId, amount);
   ```

4. **Register Notifications**
   ```typescript
   await apiCall("/notifications/register-token", "POST", {
     token: fcmToken,
   });
   ```

---

## Ready? 🎯

**Next action:** Update `app/auth/login.tsx` and `app/auth/signup.tsx` with code from SETUP_COMPLETE.md

**Questions?** Check CHECKLIST.md or NEXT_STEPS_SETUP.md

**Let's go! 🚀**
