import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBK-8AJbtruY73d7RPQzoNWCaTan2XmyME",
  authDomain: "universal-project-18401.firebaseapp.com",
  projectId: "universal-project-18401",
  storageBucket: "universal-project-18401.appspot.com",
  messagingSenderId: "624826074235",
  appId: "1:624826074235:web:84b9f1378b8b485f7dcede",
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const app = initializeApp(firebaseConfig);

export const auth = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export default app;
