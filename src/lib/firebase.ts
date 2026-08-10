import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

/** 환경 변수가 없으면 null — 호출부에서 정적 데이터로 폴백합니다. */
const app: FirebaseApp | null = hasConfig ? getApps()[0] ?? initializeApp(firebaseConfig) : null;

export const auth: Auth | null = app ? getAuth(app) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;

/** 카드 추가/수정/삭제 폼에서 관리자 로그인 시 호출 */
export async function signInAdmin(email: string, password: string) {
  if (!auth) throw new Error("Firebase가 설정되지 않았습니다.");
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin() {
  if (auth) await signOut(auth);
}
