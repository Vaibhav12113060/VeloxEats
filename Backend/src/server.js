const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./Config/db.js");

// Routes (DIRECT IMPORT)
const authRoutes = require("./Routes/authRoutes.js");
const addressRoutes = require("./Routes/addressRoutes.js");
const restaurantRoutes = require("./Routes/restaurantRoutes.js");
const menuCategoryRoutes = require("./Routes/menuCategoryRoutes.js");
const menuItemRoutes = require("./Routes/menuItemRoutes.js");
const cartRoutes = require("./Routes/cartRoutes.js");
const orderRoutes = require("./Routes/orderRoutes.js");
const orderItemRoutes = require("./Routes/orderItemRoutes.js");
const paymentRoutes = require("./Routes/paymentRoutes.js");

dotenv.config();
connectDB();

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.0.106:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/menu-categories", menuCategoryRoutes);
app.use("/api/v1/menu-items", menuItemRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/order-items", orderItemRoutes);
app.use("/api/v1/payments", paymentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("VeloxEats API Running...");
});

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`.bgCyan);
});
