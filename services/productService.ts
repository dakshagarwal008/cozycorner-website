import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Product } from "@/types/product";

export async function addProduct(product: Product) {
  try {
    const docRef = await addDoc(collection(db, "products"), product);

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
    };
  }
}


export async function getProduct(id: string) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, "products", id));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateProduct(id: string, product: Partial<Product>) {
  try {
    const docRef = doc(db, "products", id);

    await updateDoc(docRef, product);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateProductStock(
  productId: string,
  newStock: number
) {
  try {
    await updateDoc(doc(db, "products", productId), {
      stock: newStock,
    });

    return true;
  } catch (error) {
    console.error("Error updating product stock:", error);
    return false;
  }
}

export async function getProductStock(productId: string) {
  try {
    const productRef = doc(db, "products", productId);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    return typeof data.stock === "number" ? data.stock : 0;
  } catch (error) {
    console.error("Error getting product stock:", error);
    return null;
  }
}