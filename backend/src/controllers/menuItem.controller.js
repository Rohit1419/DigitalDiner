import { MenuItems } from "../models/menuItems.model.js";

export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItems.find();
    res.status(200).json({
      success: true,
      data: menuItems,
      message: "Menu items retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMenuItem = async (req, res) => {
  try {
    const { name, price, description, category, prepTime, isVegetarian } =
      req.body;

    if (
      [name, description, category].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!price || price < 0 || !prepTime || prepTime < 0) {
      return res.status(400).json({
        success: false,
        message: "Priceis and PrepTime required and must be a positive number",
      });
    }

    if (typeof isVegetarian !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Vegetarian field is required",
      });
    }
    const menuitem = await MenuItems.create({
      name,
      price,
      description,
      isVegetarian,
      category,
      prepTime,
    });

    res.status(201).json({
      success: true,
      data: menuitem,
      message: "Menu item added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItems.findById(id);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }
    res.status(200).json({
      success: true,
      data: menuItem,
      message: "Menu item retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItems.findById(id);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }
    await MenuItems.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
