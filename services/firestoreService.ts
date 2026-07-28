import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function saveProduct(product: any) {
  const docRef = await addDoc(collection(db, "products"), {
    ...product,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}