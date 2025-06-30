import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { shortURL, getOriginalURL } from './controllers/url.js';

dotenv.config(); // Load .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'URL_SHORTENER'
})
.then(() => console.log("✅ MongoDB connected"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

// Initialize Express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get('/', (req, res) => {
  res.render("index.ejs", { shortURL: null });
});

app.post('/short', shortURL);
app.get('/:shortCode', getOriginalURL);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
