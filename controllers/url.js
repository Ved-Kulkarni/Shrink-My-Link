import { URL } from "../models/URL.js"
import shortid from "shortid"

export const shortURL = async (req,res) => {
  const longURL = req.body.longURL
  const shortCode = shortid.generate()

  const shortURL = `http://localhost:4000/${shortCode}`

  // save to database
  const newURL = new URL({shortCode, longURL})
  await newURL.save()

  console.log("Short URL saved as : ", newURL)

  res.render("index.ejs", {shortURL})
}

export const getOriginalURL = async (req, res) => {
  const shortCode = req.params.shortCode

  // find from database
  const originalURL= await URL.findOne({shortCode})

  if(originalURL) {
    res.redirect(originalURL.longURL)
  }
  else {
    res.json({message: "Invalid"})
  }
}