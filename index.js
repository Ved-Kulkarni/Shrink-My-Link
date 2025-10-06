import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { shortURL, getOriginalURL } from "./controllers/url.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables!");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "URL_SHORTENER",
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { shortURL: null });
});

app.post("/short", shortURL);

app.get("/:shortCode", getOriginalURL);

app.get("/health", (req, res) => res.status(200).send("OK"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
