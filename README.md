# CoderPace

A small Expo / React Native prototype for a coding-learning app: an animated intro screen, a sign-in sheet, an email login/sign-up modal and a JavaScript flash-card quiz component.

> Early prototype. The screens and animations are in place, but sign-in isn't wired up yet (details below).

## Features

- **Animated intro**: cycles through "Let's learn.", "Let's brainstorm.", "Let's discover.", "Let's go." and "CoderPace." with a sliding ball-and-mask transition and interpolated colors (Reanimated + `react-native-redash`).
- **Bottom sign-in sheet** with "Continue with Apple", "Continue with Google", "Sign up with email" and "Log in" buttons. The Apple and Google buttons are placeholders with no handler yet.
- **Login / sign-up modal** (`/login`): opens from the sheet and shows "Welcome back" or "Create your account" based on the `type` route param, with email and password fields. The file already has a Firebase email/password sign-in function and a "remember me" helper (AsyncStorage), but the submit buttons don't call them yet.
- **Flash-card quiz component** (`app/components/FlashCards.tsx`): multiple-choice JavaScript questions (two sample cards). A wrong answer shows a hint. A correct one fades the card out, shows a "Congrats" message and moves to the next card. It isn't rendered on any screen yet.

## Tech stack

- [Expo](https://expo.dev) SDK 51 (`expo ~51.0.9`) with Expo Router 3.5 (file-based routing, typed routes)
- React Native 0.74.1, React 18.2
- TypeScript 5.3 (`strict`)
- React Native Reanimated 3.10, `react-native-redash`, `react-native-gesture-handler`
- Firebase JS SDK 10 (compat Auth API)
- `@react-native-async-storage/async-storage`, `@expo/vector-icons` (Ionicons)

## Project structure

```
app/
  _layout.tsx               # Root stack: index + login (modal)
  index.tsx                 # Animated intro + bottom sign-in sheet
  login.tsx                 # Email login / sign-up modal
  components/FlashCards.tsx # Flash-card quiz (not yet shown)
components/
  AnimatedIntro.tsx
  BottomLoginSheet.tsx
constants/                  # Colors, shared styles
hooks/                      # Color-scheme helpers
ios/                        # Native iOS project (Expo app name: JSTeacher)
```

## Getting started

Prerequisites: Node.js and npm. You'll also need Xcode for iOS builds or Android Studio for Android builds.

```bash
git clone https://github.com/kaancakr/CoderPace.git
cd CoderPace
npm install
# create FirebaseConfig.ts first (see Configuration below)
npm start
```

| Command | Runs | What it does |
| --- | --- | --- |
| `npm start` | `expo start` | Start the dev server |
| `npm run ios` | `expo run:ios` | Build and run the native iOS app |
| `npm run android` | `expo run:android` | Build and run on Android (the `android/` folder is generated on first run) |
| `npm run web` | `expo start --web` | Run in the browser |

## Configuration

`app/login.tsx` imports `@/FirebaseConfig`, which is a `FirebaseConfig.ts` file at the project root. That file is gitignored and not in the repo, so **the app won't bundle until you create it** with your own Firebase project's web config. The code calls `firebase.auth()`, so the file has to default-export the Firebase compat namespace with Auth loaded:

```ts
// FirebaseConfig.ts (not committed)
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

firebase.initializeApp({
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  appId: "...",
});

export default firebase;
```

The app reads no environment variables.

## Links

- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [Firebase Authentication (web) documentation](https://firebase.google.com/docs/auth/web/start)
