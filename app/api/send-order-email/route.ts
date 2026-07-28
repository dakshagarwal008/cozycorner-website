import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerName,
      email,
      phone,
      address,
      items,
      total,
    } = body;

    // Customer Email
    await resend.emails.send({
      from: "CozyCorner <onboarding@resend.dev>",
      to: email,
      subject: "Your CozyCorner Order Confirmation",
      html: `
        <h2>Thank you for your order, ${customerName}!</h2>

        <p>We have received your order.</p>

        <h3>Order Summary</h3>

        ${items
          .map(
            (item: any) =>
              `<p>${item.name} × ${item.quantity} — ₹${item.price * item.quantity}</p>`
          )
          .join("")}

        <hr/>

        <h3>Total: ₹${total}</h3>

        <p>We'll notify you once your order is shipped.</p>
      `,
    });

    // Admin Email
    await resend.emails.send({
      from: "CozyCorner <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: "🛒 New Order Received",
      html: `
        <h2>New Order</h2>

        <p><strong>Name:</strong> ${customerName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Address:</strong> ${address}</p>

        <hr/>

        ${items
          .map(
            (item: any) =>
              `<p>${item.name} × ${item.quantity} — ₹${item.price * item.quantity}</p>`
          )
          .join("")}

        <h2>Total ₹${total}</h2>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}