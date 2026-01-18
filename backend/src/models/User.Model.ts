import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "service_provider" | "admin";
  address?: string;
  isEmailVerified: boolean;
  emailOTP?: string;
  otpExpiry?: Date;

  serviceProviderApplication: "none" | "pending" | "approved" | "rejected";

  serviceProviderDetails?: {
    aadhaarNumber: string;
    panNumber: string;
    address: string;
    aadhaarCardPhoto: string;
    panCardPhoto: string;
  } | undefined;

  cart: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];

  favourites: mongoose.Types.ObjectId[];
  lastViewedProducts: mongoose.Types.ObjectId[];
  viewedCategories: string[];
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailOTP: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["user", "service_provider", "admin"],
      default: "user",
    },

    serviceProviderApplication: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },

    serviceProviderDetails: {
      aadhaarNumber: String,
      panNumber: String,
      address: String,
      aadhaarCardPhoto: String,
      panCardPhoto: String,
    },

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],

    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    lastViewedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    viewedCategories: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
