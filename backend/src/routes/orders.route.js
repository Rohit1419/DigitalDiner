import { Router } from "express";
import {
  createOrder,
  getOrdersByPhone,
  getOrderById,
} from "../controllers/order.controller.js";

const router = Router();

// Create a new order
router.route("/order").post(createOrder);

// Get order history by phone number
router.route("/history/:phone").get(getOrdersByPhone);

// Get order details by ID
router.route("/order/:id").get(getOrderById);

export default router;
