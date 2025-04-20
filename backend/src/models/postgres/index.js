import sequelize from "../../db/postgres.js";
import Customer from "./coustomer.model.js";
import Order from "./order.model.js";
import OrderItem from "./orderItems.js";

// Initialize models
const models = {
  Customer,
  Order,
  OrderItem,
};

// Sync all models with database
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("PostgreSQL models synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing PostgreSQL models:", error);
    process.exit(1);
  }
};

export default models;
