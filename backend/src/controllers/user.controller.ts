import type { Response } from "express";
import { Types } from "mongoose";
import User from "../models/User.Model";
import Product from "../models/Product.Model";
import type { AuthRequest } from "../middleware/auth.middleware";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, address } = req.body;
    const user = await User.findById(req.user?.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (address) user.address = address;

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");
    return res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update profile" });
  }
};

export const applyForServiceProvider = async (req: AuthRequest, res: Response) => {
  try {
    const { aadhaarNumber, panNumber, address } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const aadhaarCardPhoto = files?.["aadhaarCardPhoto"]?.[0]?.path;
    const panCardPhoto = files?.["panCardPhoto"]?.[0]?.path;

    if (!aadhaarCardPhoto || !panCardPhoto) {
      return res.status(400).json({ message: "Both Aadhaar and PAN card photos are required" });
    }

    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "user") {
      return res
        .status(400)
        .json({ message: "Only users can apply to become service providers" });
    }

    if (user.serviceProviderApplication === "pending") {
      return res
        .status(400)
        .json({ message: "Service provider application already pending" });
    }

    if (user.serviceProviderApplication === "approved") {
      return res
        .status(400)
        .json({ message: "You are already an approved service provider" });
    }

    user.serviceProviderApplication = "pending";
    user.serviceProviderDetails = { 
      aadhaarNumber, 
      panNumber: panNumber.toUpperCase(), 
      address,
      aadhaarCardPhoto,
      panCardPhoto
    };

    await user.save();

    return res
      .status(200)
      .json({ message: "Service provider application submitted successfully" });
  } catch (error) {
    console.error("Apply for service provider error:", error);
    return res.status(500).json({ message: "Failed to submit application" });
  }
};

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).populate(
      "cart.product"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
};
export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    console.log('Add to cart request:', { productId, userId: req.user?.userId });

    const user = await User.findById(req.user?.userId);
    if (!user) {
      console.log('User not found:', req.user?.userId);
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    console.log('Product found:', product ? 'Yes' : 'No');
    
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    
    if (product.status !== "approved") {
      return res.status(400).json({ message: "Product not approved" });
    }
    
    if (product.stock <= 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === product!._id.toString()
    );

    if (itemIndex > -1) {
      const cartItem = user.cart[itemIndex];
      if (cartItem) {
        cartItem.quantity += 1;
      }
      console.log('Updated existing cart item quantity');
    } else {
      user.cart.push({ product: product._id, quantity: 1 });
      console.log('Added new item to cart');
    }

    await user.save();
    console.log('Cart saved successfully');
    return res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.error('Add to cart error:', error);
    return res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const updateCartQuantity = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    const product = await Product.findById(productId);
    if (product && product.stock < quantity) {
      return res.status(400).json({ message: "Requested quantity exceeds available stock" });
    }

    user.cart[itemIndex].quantity = quantity;
    await user.save();

    return res.status(200).json({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    console.error('Update cart quantity error:', error);
    return res.status(500).json({ message: "Failed to update cart quantity" });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    return res
      .status(200)
      .json({ message: "Product removed from cart" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove from cart" });
  }
};

export const getFavourites = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).populate(
      "favourites"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.favourites);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch favourites" });
  }
};

export const addToFavourites = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const exists = user.favourites.some(
      (id) => id.toString() === productId
    );

    if (exists) {
      return res
        .status(400)
        .json({ message: "Already in favourites" });
    }

    user.favourites.push(new Types.ObjectId(productId as string));
    await user.save();

    return res
      .status(200)
      .json({ message: "Added to favourites" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add to favourites" });
  }
};

export const removeFromFavourites = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favourites = user.favourites.filter(
      (id) => id.toString() !== productId
    );

    await user.save();
    return res
      .status(200)
      .json({ message: "Removed from favourites" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove from favourites" });
  }
};
