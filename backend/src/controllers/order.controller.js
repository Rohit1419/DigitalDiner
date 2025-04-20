import Customer from "../models/postgres/coustomer.model.js";
import Order from "../models/postgres/order.model.js";
import OrderItem from "../models/postgres/orderItems.js";
import sequelize from "../db/postgres.js";

// Create a new order
export const createOrder = async (req, res) => {
  const t = await sequelize.transaction();

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

    // Find or create customer
    const [customer] = await Customer.findOrCreate({
      where: { phone },
      defaults: { name },
      transaction: t,
    });

    // Update customer name if it's different
    if (customer.name !== name) {
      customer.name = name;
      await customer.save({ transaction: t });
    }

    // Calculate pickup time based on items or use provided value
    const estimatedPickupTime = pickupTime || calculatePickupTime(items);

    // Create order
    const order = await Order.create(
      {
        customerId: customer.id,
        totalAmount,
        status: "pending",
        pickupTime: estimatedPickupTime, // Store as minutes
      },
      { transaction: t }
    );

    // Create order items
    const orderItems = await Promise.all(
      items.map((item) =>
        OrderItem.create(
          {
            orderId: order.id,
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          },
          { transaction: t }
        )
      )
    );

    await t.commit();

    res.status(201).json({
      success: true,
      data: {
        orderId: order.id,
        customer: { name, phone },
        totalAmount,
        status: order.status,
        pickupTime: order.pickupTime, // Minutes until pickup
        createdAt: order.createdAt,
        items: orderItems,
      },
      message: "Order placed successfully",
    });
  } catch (error) {
    await t.rollback();
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

    // Find customer by phone
    const customer = await Customer.findOne({ where: { phone } });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this phone number",
      });
    }

    // Get all orders for this customer
    const orders = await Order.findAll({
      where: { customerId: customer.id },
      include: [
        {
          model: OrderItem,
          attributes: ["menuItemId", "name", "price", "quantity"],
        },
      ],
      order: [["createdAt", "DESC"]],
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

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Customer,
          attributes: ["name", "phone"],
        },
        {
          model: OrderItem,
          attributes: ["menuItemId", "name", "price", "quantity"],
        },
      ],
    });

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
        ...order.toJSON(),
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
