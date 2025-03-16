const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes"); // Import API routes
require("dotenv").config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Mount API routes
app.use("/api/tasks", taskRoutes);

// MongoDB Connection (Supports Docker & Local)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
