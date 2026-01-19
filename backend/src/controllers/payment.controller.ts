import type { Response } from "express";
import Stripe from "stripe";
import Order from "../models/Order.Model";
import User from "../models/User.Model";
import Product from "../models/Product.Model";
import type { AuthRequest } from "../middleware/auth.middleware";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover" as any,
});

export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address || !shippingAddress.pincode) {
      return res.status(400).json({ message: "Complete shipping address is required" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.status !== "approved") {
        return res.status(400).json({ message: `Product ${item.productId} not available` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: "inr",
      metadata: {
        userId: userId.toString(),
      },
    });

    const order = await Order.create({
      userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentIntentId: paymentIntent.id,
      status: "pending",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
      totalAmount,
    });
  } catch (error) {
    console.error("Payment intent creation error:", error);
    res.status(500).json({ message: "Failed to create payment intent" });
  }
};

export const confirmPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === "succeeded") {
      order.status = "paid";
      await order.save();

      // Update product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }

      // Clear user cart
      await User.findByIdAndUpdate(order.userId, {
        $set: { cart: [] }
      });

      res.status(200).json({ message: "Payment confirmed", order });
    } else {
      res.status(400).json({ message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Payment confirmation error:", error);
    res.status(500).json({ message: "Failed to confirm payment" });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};