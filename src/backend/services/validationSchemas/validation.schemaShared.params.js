const { param, query } = require("express-validator")

const queryParams = {

  "from":
    query("from", { errorHandling: "resetParamErrors" })
    .optional()
    .isDate(),

  "to":
    query("to", { errorHandling: "resetParamErrors" })
    .optional()
    .isDate(),

  "limit":
    query("limit", { errorHandling: "resetParamErrors" })
    .optional()
    .isInt(),

  "sort":
    query("sort", { errorHandling: "resetParamErrors" })
    .optional()
    .isIn(["asc", "desc"]),
}

const pathParams = {
  "userId":
    param("userId", { errorHandling: "fatalError" })
    .matches(/^user_[a-z0-9]{24}$/),

  "exerciseId":
    param("exerciseId", { errorHandling: "fatalError" })
    .matches(/^exerc_[a-z0-9]{24}$/)
}


module.exports = { queryParams, pathParams}