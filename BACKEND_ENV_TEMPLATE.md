# Backend .env Template

Copy this file to your backend repository at `C:\Users\PK\handyconnect-backend\.env` and replace the placeholders with your real credentials.

# Firebase

FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# JWT / Auth

JWT_SECRET=super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Stripe

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# App / CORS

FRONTEND_URL=http://localhost:8081

# Optional: Sendgrid / Email (if used)

SENDGRID_API_KEY=

# Notes:

# - Do NOT commit real keys into version control. Use your host's secret manager in production.

# - For the Firebase private key, ensure newlines are escaped if placed directly in .env (or set the key using your deployment's secret manager). If you prefer, you can supply the service account JSON as a base64 string and decode it in the server initialization.

# Quick copy/paste command (PowerShell):

# Copy-Item .\BACKEND_ENV_TEMPLATE.md -Destination 'C:\Users\PK\handyconnect-backend\.env' -Force
