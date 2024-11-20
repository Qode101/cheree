const express = require("express");
const { initiateSTKPush } = require("../payments/mpesaService");
const router = express.Router();
const { getAccessToken } = require("../payments/mpesaService");
const { registerURL } = require("../payments/mpesaService");

// Access token Route
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
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Failed to register URL", error: error.message });
    }
});

// STK Push Route
router.post("/stkpush", async (req, res) => {
  const { phone, amount, accountReference } = req.body;

  try {
    const response = await initiateSTKPush(phone, amount, accountReference);
    res.status(200).json({
      message: "STK Push initiated. Enter your M-Pesa PIN to complete the transaction.",
      data: response,
    });
  } catch (error) {
    console.error("STK Push Error:", error.message);
    res.status(500).json({ message: "Failed to initiate STK Push", error: error.message });
  }
});

// Callback Route
router.post("/callback", (req, res) => {
  console.log("STK Push Callback received:", req.body);
  const callbackData = JSON.stringify(req.body);

  // Save callback data to a file (optional)
  const fs = require("fs");
  fs.writeFile("stkcallback.json", callbackData, "utf8", (err) => {
    if (err) {
      console.error("Error saving callback data:", err);
    } else {
      console.log("Callback data saved to stkcallback.json");
    }
  });

  res.status(200).send("Callback received");
});

module.exports = router;