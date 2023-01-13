const { param, query } = require("express-validator")

const queryParams = {

  "from":
    query("from", { errorHandling: "resetToDefault" })
    .optional()
    .isDate(),

  "to":
    query("to", { errorHandling: "resetToDefault" })
    .optional()
    .isDate(),

  "limit":
    query("limit", { errorHandling: "resetToDefault" })
    .optional()
    .isInt(),

  "sort":
    query("sort", { errorHandling: "resetToDefault" })
    .optional()
    .isIn(["asc", "desc"]),
}

const pathParams = {
  "userId":
    param("userId", { errorHandling: "sendError" })
    .matches(/^user_[a-z0-9]{24}$/),

  "exerciseId":
    param("exerciseId", { errorHandling: "sendError" })
    .matches(/^exerc_[a-z0-9]{24}$/)
}


module.exports = { queryParams, pathParams}