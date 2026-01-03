import mongoose from "mongoose";
import Contact from "../../backend/models/Contact.js";

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose || { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectToDB();

  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    return res.status(500).json({ error: "Delete failed" });
  }
}
