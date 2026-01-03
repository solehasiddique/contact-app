import mongoose from "mongoose";
import Contact from "../../backend/models/Contact.js"; 

const MONGO_URI = process.env.MONGO_URI;
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false, 
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectToDB();

  const { method } = req;

  try {
    if (method === "GET") {
      const contacts = await Contact.find();
      return res.status(200).json(contacts);
    }

    if (method === "POST") {
      const contact = await Contact.create(req.body);
      return res.status(201).json(contact);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
