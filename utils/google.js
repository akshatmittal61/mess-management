const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotenv = require("dotenv");
dotenv.config();
const myOAuth2Client = new OAuth2(
  process.env.ID,
  process.env.SECRET,
  "https://developers.google.com/oauthplayground"
);

exports.myOAuth2Client = myOAuth2Client;
