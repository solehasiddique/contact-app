// 1️⃣ Import dotenv using ESM import
import dotenv from "dotenv";
dotenv.config({ override: true }); // FORCE loading .env

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// DEBUG: check if variable is loaded
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected to intern database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
import contactRoutes from "./routes/contactRoutes.js";
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
