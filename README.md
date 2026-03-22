# 🛠️ Smart Service

> A cross-platform mobile application for managing service work orders — built with **Ionic + Vue 3 + Firebase**, running on Android and the web.

---

## 📋 About

**Smart Service** is a mobile-first work order management system designed for service and maintenance professionals. It allows technicians and administrators to create, track, and manage jobs in one place — with map visualization, billing status, and pricing all built in.

### Features

- 📄 **Work Order Management** — create, edit, and list service jobs
- 🗺️ **Map Integration** — entered addresses are automatically displayed on an interactive map
- 👤 **Customer Details** — record client name and contact information per job
- 🔧 **Issue Description** — document the problem or task in detail
- 💰 **Pricing** — set and track the cost of each job
- 🧾 **Billing Status** — mark whether a job has been invoiced or is still pending

---

## 🚀 Tech Stack

| Technology | Version |
|---|---|
| [Vue 3](https://vuejs.org/) | ^3.3.0 |
| [Ionic Vue](https://ionicframework.com/) | ^8.0.0 |
| [Capacitor](https://capacitorjs.com/) | 8.1.0 |
| [Firebase](https://firebase.google.com/) | ^12.9.0 |
| [Pinia](https://pinia.vuejs.org/) | ^3.0.4 |
| [Vue Router](https://router.vuejs.org/) | ^4.2.0 |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9.0 |
| [Vite](https://vitejs.dev/) | ^5.0.0 |

**Testing:** Cypress (E2E) · Vitest (Unit)

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- Android Studio (for Android builds)

### Installation

```bash
git clone https://github.com/bazsiposzti/smart_service_ionic.git
cd smart_service_ionic
npm install
```

### Firebase Configuration

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Register a web app and copy the config object
3. Create `src/firebase.ts` with your credentials:

```ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
```

---

## 🧑‍💻 Development

```bash
# Start the dev server
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview
```

---

## 📱 Android

```bash
# Sync Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test:unit

# End-to-end tests
npm run test:e2e
```

---

## 🔍 Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
smart_service_ionic/
├── src/
│   ├── components/       # Reusable Vue components
│   ├── views/            # Page-level components (work order list, details, etc.)
│   ├── router/           # Vue Router configuration
│   ├── stores/           # Pinia state stores
│   └── ...
├── android/              # Native Android project (Capacitor)
├── public/               # Static assets
├── tests/                # Test files
├── capacitor.config.ts   # Capacitor configuration
└── vite.config.ts        # Vite configuration
```

---

## 📄 License

This project is private. All rights reserved.
