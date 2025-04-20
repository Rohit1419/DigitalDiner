import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  menuItemId: {
    type: Schema.Types.ObjectId,
    ref: "MenuItems",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const orderSchema = new Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },
    pickupTime: {
      type: Number,
      required: true,
      default: 30,
    },
  },
  { timestamps: true }
);

export const MongoOrder = mongoose.model("Order", orderSchema);
