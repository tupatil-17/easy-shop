import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/database.ts';
import { createDefaultAdmin } from './utils/createAdmin.ts';
import authRoutes from './routes/auth.routes.ts';
import userRoutes from './routes/user.routes.ts';
import productRoutes from './routes/product.routes.ts';
import adminRoutes from './routes/admin.routes.ts';
import paymentRoutes from './routes/payment.routes.ts';
import reviewRoutes from './routes/review.routes.ts';
const app = express();

const startServer = async () => {
  await connectDB();
  await createDefaultAdmin();

  app.use(helmet());
  app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/payment", paymentRoutes);
  app.use("/api", reviewRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

