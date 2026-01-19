import User from "../models/User.Model";
import { hashPassword } from "./Hash";

export const createDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn("Admin credentials not found in env");
      return;
    }

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await hashPassword(adminPassword);

    await User.create({
      username: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isEmailVerified: true,
    });

    console.log("Default admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};
