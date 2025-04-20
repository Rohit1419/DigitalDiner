import { MongoOrder } from "../models/mongodb/order.mmodel.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { name, phone, items, totalAmount, pickupTime } = req.body;

    // Validate request data
    if (
      !name ||
      !phone ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order data. Please provide name, phone, items array, and totalAmount",
      });
    }

    // Calculate pickup time based on items or use provided value
    const estimatedPickupTime = pickupTime || calculatePickupTime(items);

    // Create order with MongoDB
    const order = await MongoOrder.create({
      customer: { name, phone },
      items: items.map((item) => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      totalAmount,
      status: "pending",
      pickupTime: estimatedPickupTime,
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        customer: { name, phone },
        totalAmount,
        status: order.status,
        pickupTime: order.pickupTime,
        createdAt: order.createdAt,
        items: order.items,
      },
      message: "Order placed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Helper function to calculate pickup time based on items
const calculatePickupTime = (items) => {
  // Default minimum pickup time
  let estimatedMinutes = 15;

  // If we have prep time data for items, use the longest prep time
  // and add a buffer for multiple items
  if (items.length > 0 && items[0].prepTime) {
    const longestPrepTime = Math.max(
      ...items.map((item) => item.prepTime || 0)
    );

    //  buffer time based on number of items
    const bufferTime = Math.min(15, items.length * 2); // Cap buffer at 15 minutes

    estimatedMinutes = longestPrepTime + bufferTime;
  } else {
    // If no prep time data, estimate based on number of items
    estimatedMinutes = 15 + items.length * 2;
  }

  // Cap at reasonable maximum
  return Math.min(60, estimatedMinutes);
};

// Get order history by phone number
export const getOrdersByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Find orders by customer phone using MongoDB
    const orders = await MongoOrder.find({ "customer.phone": phone }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: orders,
      message: "Order history retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get order details by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await MongoOrder.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Calculate expected pickup time
    const expectedPickupTime = new Date(
      new Date(order.createdAt).getTime() + order.pickupTime * 60000
    );

    res.status(200).json({
      success: true,
      data: {
        ...order.toObject(),
        expectedPickupTime,
      },
      message: "Order details retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status (for admin/restaurant staff)
