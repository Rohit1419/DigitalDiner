import app from "./app.js";
import dbConnect from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

//connection to database

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
