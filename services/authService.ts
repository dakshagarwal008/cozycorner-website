import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

export async function login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}