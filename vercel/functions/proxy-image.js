// vercel/functions/proxy-image.js
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const imageUrl = req.query.url;
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }

    const imageBuffer = await response.buffer();

    res.setHeader("Content-Type", response.headers.get("Content-Type"));
    res.setHeader("Cache-Control", "public, max-age=604800, immutable"); // Cache control for performance

    res.status(200).send(imageBuffer);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
};
