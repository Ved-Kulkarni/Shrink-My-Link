import { URL } from "../models/URL.js";
import shortid from "shortid";

export const shortURL = async (req, res) => {
  const longURL = req.body.longURL;
  const shortCode = shortid.generate();
  const shortURL = `${req.protocol}://${req.get("host")}/${shortCode}`;

  const newURL = new URL({ shortCode, longURL });
  await newURL.save();

  res.render("index.ejs", { shortURL });
};

export const getOriginalURL = async (req, res) => {
  const shortCode = req.params.shortCode;
  const originalURL = await URL.findOne({ shortCode });

  if (originalURL) {
    res.redirect(originalURL.longURL);
  } else {
    res.status(404).send("Invalid or expired link");
  }
};
