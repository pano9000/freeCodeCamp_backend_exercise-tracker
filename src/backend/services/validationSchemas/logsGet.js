const { param, query } = require("express-validator")


const queryParams = [

  query("from").optional( { checkFalsy: true } ).isDate(),
  query("to").optional().isDate(),
  query("limit").optional().isInt(),
  query("sort").optional().custom(value => ["asc", "desc"].includes(value)),

]

const pathParams = [

  param("userId") // add regex here for userId
]


module.exports = { queryParams, pathParams}