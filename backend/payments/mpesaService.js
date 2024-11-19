const axios = require("axios");
const moment = require("moment");

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
    throw new Error("Failed to obtain access token");
  }
};

const initiateSTKPush = async (phoneNumber, amount, accountReference) => {
  const accessToken = await getAccessToken();
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(
    `${process.env.BUSINESS_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const requestBody = {
    BusinessShortCode: process.env.BUSINESS_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.BUSINESS_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: "Payment transaction",
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to initiate STK Push");
  }
};

const registerURL = async () => {
    const accessToken = await getAccessToken();
    const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
    const requestBody = {
      Shortcode: process.env.BUSINESS_SHORTCODE,
      LipaNaMpesaOnlineShortcode: process.env.BUSINESS_SHORTCODE,
      LipaNaMpesaOnlineShortcodeKey: process.env.MPESA_PASSKEY,
      ConfirmationURL: process.env.MPESA_CALLBACK_URL + "/confirmation",
      ValidationURL: process.env.MPESA_CALLBACK_URL + "/validation",
    };
  
    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to register URL");
    }
};

module.exports = { getAccessToken, initiateSTKPush, registerURL };