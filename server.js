import express from 'express'
import mongoose from 'mongoose'
import { shortURL, getOriginalURL } from './controllers/url.js';
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
  dbName: "URL_SHORTENER"
}).then(() => console.log("MongoDB connected")).catch((error) => console.log(error));

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

const port = process.env.PORT || 4000

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"))

// rendering the ejs file
app.get('/', (req,res) => {
  res.render("index.ejs", {shortURL: null})
})

// shortening logic
app.post('/short', shortURL)

// redirect to original URL using short code
app.get('/:shortCode', getOriginalURL)

app.listen(port, () => console.log(`Server is running on port : ${port}`))
