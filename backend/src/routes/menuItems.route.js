import { Router } from "express";
import {
  getAllMenuItems,
  addMenuItem,
  deleteMenuItem,
  getItemById,
} from "../controllers/menuItem.controller.js";

const router = Router();

router.route("/all-items").get(getAllMenuItems);
router.route("/add-item").post(addMenuItem);
router.route("/menu-item/:id").delete(deleteMenuItem);
router.route("/menu-item/:id").get(getItemById);

export default router;
