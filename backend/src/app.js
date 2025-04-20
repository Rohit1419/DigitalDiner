import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//import routes
import menuItemsRoutes from "./routes/menuItems.route.js";
import ordersRoutes from "./routes/orders.route.js";

app.use("/api/v1/menu-items", menuItemsRoutes);
app.use("/api/v1/orders", ordersRoutes);

app.get("/", (req, res) => {
  res.send("Digital Diner API is running");
});

export default app;
