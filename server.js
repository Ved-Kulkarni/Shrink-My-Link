import express from 'express'
import mongoose from 'mongoose'
import { shortURL, getOriginalURL } from './controllers/url.js';

mongoose.connect(
  "mongodb+srv://vedkulkarni144:dI6n2kBCP6U6yh6I@cluster0.84r7ytm.mongodb.net/", {
    dbName: "URL_SHORTENER"
  }
).then(() => console.log("MongoDB connected")).catch((error) => console.log(error));


const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

const port = 4000

// rendering the ejs file
app.get('/', (req,res) => {
  res.render("index.ejs", {shortURL: null})
})

// shortening logic
app.post('/short', shortURL)

// redirect to original URL using short code
app.get('/:shortCode', getOriginalURL)

app.listen(port, () => console.log(`Server is running on port : ${port}`))