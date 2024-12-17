const express = require("express");
const { registerURL, getAccessToken } = require("../payments/mpesaService");
const router = express.Router();

// Access Token Route
router.get("/access_token", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    res.status(200).json({ message: "Access token retrieved successfully", accessToken });
  } catch (error) {
    console.error("Access Token Error:", error.message);
    res.status(500).json({ message: "Failed to get access token", error: error.message });
  }
});

// Register URL Route (C2B)
router.get("/registerurl", async (req, res) => {
  try {
    const response = await registerURL();
    res.status(200).json({ message: "URL registration successful", data: response });
  } catch (error) {
    console.error("Register URL Error:", error.message);
    res.status(500).json({ message: "Failed to register URL", error: error.message });
  }
});

module.exports = router;