import mongoose, { SchemaTypeOptions } from "mongoose";
import { Schema } from "mongoose";

const menuItemsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["Appetizers", "Main Courses", "Desserts", "Drinks", "Sides"],
    },
    prepTime: {
      type: Number,
      required: true,
      min: 10,
    },
  },
  { timestamps: true }
);

export const MenuItems = new mongoose.model("MenuItems", menuItemsSchema);
