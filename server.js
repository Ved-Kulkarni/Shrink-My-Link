import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { shortURL, getOriginalURL } from './controllers/url.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'URL_SHORTENER'
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log(error));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.render("index.ejs", { shortURL: null });
});

app.post('/short', shortURL);
app.get('/:shortCode', getOriginalURL);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
