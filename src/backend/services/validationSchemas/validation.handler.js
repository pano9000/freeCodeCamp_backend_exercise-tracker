
const { validationResult } = require("express-validator")

function handler(req, res, next) {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    next();
    return
  }
  
  console.log("*************", validationErrors)
  return res.status(400).json({
    error: false,
    errors: validationErrors.array(),
  });


}


module.exports = handler