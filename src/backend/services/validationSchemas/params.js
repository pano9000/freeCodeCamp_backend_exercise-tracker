const { param, query } = require("express-validator")

const queryParams = {

  "from":
    query("from")
    .optional( { checkFalsy: true } )
    .isDate(),

  "to":
    query("to")
    .optional()
    .isDate(),

  "limit":
    query("limit")
    .optional()
    .isInt(),

  "sort":
    query("sort")
    .optional()
    .isIn(["asc", "desc"]),
}

const pathParams = {
  "userId":
    param("userId")
    .matches(/^user_[a-z0-9]{24}$/),

  "exerciseId":
    param("exerciseId")
    .matches(/^exerc_[a-z0-9]{24}$/)
}


module.exports = { queryParams, pathParams}