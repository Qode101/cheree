const axios = require("axios");
const moment = require("moment");

// Function to get access token
const getAccessToken = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = "Basic " + Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: { Authorization: auth },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Access Token Error:", error.response?.data || error.message);
    throw new Error("Failed to obtain access token");
  }
};

// Function to register URLs (C2B)
const registerURL = async () => {
  const accessToken = await getAccessToken();
  const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";

  const requestBody = {
    ShortCode: process.env.BUSINESS_SHORTCODE,
    ResponseType: "Completed",
    ConfirmationURL: `${process.env.MPESA_CALLBACK_URL}/confirmation`,
    ValidationURL: `${process.env.MPESA_CALLBACK_URL}/validation`,
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("Register URL Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register URL Error:", error.response?.data || error.message);
    throw new Error("Failed to register URL");
  }
};

module.exports = { getAccessToken, registerURL };