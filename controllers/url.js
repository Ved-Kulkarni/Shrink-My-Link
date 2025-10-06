import { URL } from "../models/URL.js";
import shortid from "shortid";

export const shortURL = async (req, res) => {
  try {
    const longURL = req.body.longURL.trim();
    if (!longURL) return res.status(400).send("No URL provided");

    // Check if already shortened
    const existing = await URL.findOne({ longURL });
    if (existing) {
      const existingShort = `${req.protocol}://${req.get("host")}/${existing.shortCode}`;
      return res.render("index", { shortURL: existingShort });
    }

    // Generate short code and save
    const shortCode = shortid.generate();
    const newURL = new URL({ shortCode, longURL });
    await newURL.save();

    const shortURL = `${req.protocol}://${req.get("host")}/${shortCode}`;
    console.log("New Short URL:", shortURL);

    res.render("index", { shortURL });
  } catch (err) {
    console.error("Error shortening URL:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getOriginalURL = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const found = await URL.findOne({ shortCode });

    if (!found) {
      return res.status(404).send("Invalid or expired short URL");
    }

    console.log(`🔁 Redirecting ${shortCode} → ${found.longURL}`);
    res.redirect(found.longURL);
  } catch (err) {
    console.error("❌ Redirect error:", err);
    res.status(500).send("Internal Server Error");
  }
};
