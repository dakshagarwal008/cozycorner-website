import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: any;
}

export async function createOrder(
  order: Omit<Order, "createdAt" | "id">
) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error("Error creating order:", error);

    return {
      success: false,
      id: null,
    };
  }
}

export async function getOrders() {
  try {
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(ordersQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function updateOrderStatus(
  id: string,
  status: string
) {
  try {
    if (!id) {
      console.error("Order ID is missing");
      return false;
    }

    console.log("Updating order:", id, "to:", status);

    const orderRef = doc(db, "orders", id);

    await updateDoc(orderRef, {
      status: status,
    });

    console.log("Order status updated successfully");

    return true;
  } catch (error) {
    console.error("FIREBASE UPDATE ERROR:", error);
    return false;
  }
}

export async function getOrder(id: string) {
  try {
    const orderRef = doc(db, "orders", id);
    const snapshot = await getDoc(orderRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}