import type { Response } from "express";
import Review from "../models/Review.Model";
import Product from "../models/Product.Model";
import Order from "../models/Order.Model";
import type { AuthRequest } from "../middleware/auth.middleware";

export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ userId, productId } as any);
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    // Create review without order requirement
    const review = await Review.create({
      userId,
      productId,
      rating,
      comment,
    } as any);

    // Update product rating
    await updateProductRating(productId as string);

    const populatedReview = await Review.findById((review as any)._id)
      .populate("userId", "username")
      .populate("productId", "name");

    res.status(201).json({
      message: "Review added successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

export const getProductReviews = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ productId } as any)
      .populate("userId", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments({ productId } as any);

    res.status(200).json({
      reviews,
      totalReviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const getUserPurchasedProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({
      userId,
      status: "paid"
    }).populate("items.product", "name images");

    const purchasedProducts = [];
    for (const order of orders) {
      for (const item of order.items) {
        const existingReview = await Review.findOne({
          userId,
          productId: item.product._id
        });

        purchasedProducts.push({
          orderId: order._id,
          product: item.product,
          hasReviewed: !!existingReview,
          review: existingReview
        });
      }
    }

    res.status(200).json({ purchasedProducts });
  } catch (error) {
    console.error("Get purchased products error:", error);
    res.status(500).json({ message: "Failed to fetch purchased products" });
  }
};

const updateProductRating = async (productId: string) => {
  try {
    const reviews = await Review.find({ productId } as any);
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    await Product.findByIdAndUpdate(productId, {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews,
    });
  } catch (error) {
    console.error("Update product rating error:", error);
  }
};