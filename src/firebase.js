// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// يمكنك إضافة خدمات أخرى مثل Firestore, Auth, Storage حسب حاجتك
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// إعدادات Firebase مأخوذة من متغيرات البيئة (env)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// لمنع مشاكل SSR مع analytics في Next.js
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// يمكنك تصدير خدمات أخرى أيضاً
// const db = getFirestore(app);
// const auth = getAuth(app);

export { app, analytics /*, db, auth */ };
