import type { Request, Response } from "express";
import { Types } from "mongoose";
import Product from "../models/Product.Model";
import User from "../models/User.Model";
import type { AuthRequest } from "../middleware/auth.middleware";
import { uploadToCloudinary } from "../utils/cloudinary";


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;
    const { search, category } = req.query;

    const filter: any = { status: "approved" };

    if (category && category !== 'all') filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filter)
      .populate("serviceProviderId", "username email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const categories = await Product.distinct("category", { status: "approved" });

    res.status(200).json({
      products,
      totalPages,
      currentPage: page,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      status: "approved",
    } as any).populate("serviceProviderId", "username email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const addProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const serviceProvider = await User.findById(req.user?.userId);
    if (!serviceProvider || serviceProvider.role !== "service_provider" || serviceProvider.serviceProviderApplication !== "approved") {
      return res.status(403).json({ message: "Service provider not approved" });
    }

    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "At least one image required" });
    }

    const imageUrls: string[] = [];
    for (const file of files) {
      const uploadResult = await uploadToCloudinary(file.path, "products");
      imageUrls.push(uploadResult.secure_url);
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images: imageUrls,
      serviceProviderId: serviceProvider._id,
      status: "pending",
    });

    res.status(201).json({
      message: "Product added, pending approval",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

export const getMyProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await Product.find({
      serviceProviderId: req.user!.userId,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your products" });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      serviceProviderId: req.user!.userId,
    } as any);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, description, price, stock, category } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category) product.category = category;

    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      const imageUrls: string[] = [];
      for (const file of files) {
        const uploadResult = await uploadToCloudinary(file.path, "products");
        imageUrls.push(uploadResult.secure_url);
      }
      product.images = imageUrls;
    }

    product.status = "pending";

    await product.save();

    res.status(200).json({
      message: "Product updated and sent for re-approval",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      serviceProviderId: req.user!.userId,
    } as any);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

export const logProductView = async (req: AuthRequest, res: Response) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user?.userId;

    if (!userId) return res.status(200).json({}); // Silently fail if not logged in

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update last viewed products
    user.lastViewedProducts = user.lastViewedProducts || [];
    // Remove if already exists to move to front
    user.lastViewedProducts = user.lastViewedProducts.filter(
      (id) => id.toString() !== productId
    );
    (user.lastViewedProducts as any).unshift(new Types.ObjectId(productId as string));
    // Limit to 10
    if (user.lastViewedProducts.length > 10) {
      user.lastViewedProducts.pop();
    }

    // Update viewed categories
    user.viewedCategories = user.viewedCategories || [];
    if (!user.viewedCategories.includes(product.category)) {
      user.viewedCategories.push(product.category);
    }

    await user.save();
    res.status(200).json({ message: "View logged" });
  } catch (error) {
    console.error("Log product view error:", error);
    res.status(500).json({ message: "Failed to log view" });
  }
};

export const getRecommendedProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      // If not logged in, return random top products
      const products = await Product.find({ status: "approved" }).limit(4);
      return res.status(200).json(products);
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let query: any = { status: "approved" };
    if (user.viewedCategories && user.viewedCategories.length > 0) {
      query.category = { $in: user.viewedCategories };
    }

    const products = await Product.find(query)
      .limit(8)
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};

export const getLastViewedProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(200).json([]);

    const user = await User.findById(userId).populate({
      path: "lastViewedProducts",
      match: { status: "approved" },
      limit: 8
    } as any);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.lastViewedProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch last viewed products" });
  }
};
