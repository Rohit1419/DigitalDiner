import app from "./app.js";
import dbConnect from "./db/db.js";
import dotenv from "dotenv";
import { connectPostgres } from "./db/postgres.js";
import { syncModels } from "./models/postgres/index.js";

dotenv.config({
  path: ".env",
});

//connection to MongoDb

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

//connection to Postgres

connectPostgres()
  .then(() => {
    return syncModels();
  })
  .then(() => {
    console.log("PostgreSQL setup completed");
  })
  .catch((err) => {
    console.log("PostgreSQL setup error", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
