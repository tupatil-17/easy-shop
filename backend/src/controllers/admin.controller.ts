import type { Request, Response } from "express";
import User from "../models/User.Model.ts";
import Product from "../models/Product.Model.ts";

export const getServiceProviderApplications = async (_req: Request, res: Response) => {
  try {
    const serviceProviders = await User.find({
      serviceProviderApplication: "pending",
    }).select("-password");

    return res.status(200).json(serviceProviders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch applications" });
  }
};

export const approveServiceProvider = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.serviceProviderApplication !== "pending") {
      return res.status(400).json({ message: "No pending application" });
    }

    user.serviceProviderApplication = "approved";
    user.role = "service_provider";

    await user.save();

    return res.status(200).json({
      message: "Service provider approved successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to approve service provider" });
  }
};

export const rejectServiceProvider = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.serviceProviderApplication = "rejected";
    user.role = "user";
    user.serviceProviderDetails = undefined;

    await user.save();

    return res.status(200).json({
      message: "Service provider application rejected",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to reject service provider" });
  }
};

export const getPendingProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({ status: "pending" })
      .populate("serviceProviderId", "username email");

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const approveProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = "approved";
    await product.save();

    return res.status(200).json({
      message: "Product approved successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to approve product" });
  }
};

export const rejectProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = "rejected";
    await product.save();

    return res.status(200).json({
      message: "Product rejected successfully",
    });
  } catch (error) {
    console.error("Reject product error:", error);
    return res.status(500).json({ message: "Failed to reject product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete product" });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Product.deleteMany({ serviceProviderId: user._id });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user" });
  }
};
