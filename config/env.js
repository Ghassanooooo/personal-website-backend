require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURL: process.env.MONGO_URL,
  jwtKey: process.env.JWT_KEY,
};
