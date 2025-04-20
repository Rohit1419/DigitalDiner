import { DataTypes } from "sequelize";
import sequelize from "../../db/postgres.js";
import Customer from "./coustomer.model.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "preparing",
        "ready",
        "completed",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    pickupTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
  },
  {
    timestamps: true,
    tableName: "orders",
  }
);

// Define relationship
Order.belongsTo(Customer, { foreignKey: "customerId" });
Customer.hasMany(Order, { foreignKey: "customerId" });

export default Order;
