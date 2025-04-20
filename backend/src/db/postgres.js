import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE || "digital_diner",
  logging: false,
});

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connection established successfully");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL database:", error);
    process.exit(1);
  }
};

export default sequelize;
