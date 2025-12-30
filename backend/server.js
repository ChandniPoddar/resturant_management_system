import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js"; // import your food routes
import userRouter from "./routes/userRoutes.js"; // import your user routes
import "dotenv/config";   // ✅ short form
import cartRouter from "./routes/cartRoute.js";
import orderRoute from './routes/orderRoute.js'; // adjust the path if needed


// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
  
// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// DB Connection
connectDB();

// API routes
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/users", userRouter); // Add this line to use user routes
app.use("/api/cart", cartRouter); // Add cart routes
app.use("/api/order", orderRoute); // Add order routes

app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
// new db password 33858627 database name greatstack
// mongodb+srv://greatstack:33858627@cluster0.ksegljf.mongodb.net/?