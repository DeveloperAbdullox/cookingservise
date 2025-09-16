const ApiError = require("../../helpers/api.error.js");
const logger = require("../../services/logger.js");

module.exports = function (err, req, res, next) {
  logger.error(err);   // 🔹 Logga yozib qo‘yish
  console.log(err);    // 🔹 Consolga chiqish

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof TypeError) {
    return res.status(500).json({ message: err.message });
  }

  return res.status(500).json({ message: "Unexpected error" });
};
