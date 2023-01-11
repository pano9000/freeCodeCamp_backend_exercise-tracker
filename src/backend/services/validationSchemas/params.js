const { param, query } = require("express-validator")

/*
function createQueryParams(paramNames) {

  paramNames.forEach(param => {

    this[param[0]] = param[1]

  })

}

new createQueryParams([

  "from": query("from").optional( { checkFalsy: true } ).isDate(),
  "to": query("to").optional().isDate(),
  "limit": query("limit").optional().isInt(),
  "sort": query("sort").optional().custom(value => ["asc", "desc"].includes(value)),


])
*/

const queryParams = {
  "from": query("from").optional( { checkFalsy: true } ).isDate(),
  "to": query("to").optional().isDate(),
  "limit": query("limit").optional().isInt(),
  "sort": query("sort").optional().custom(value => ["asc", "desc"].includes(value)),
}

const pathParams = {
  "userId": param("userId"), // add regex here for userId,
  "exerciseId": param("exerciseId")
}


module.exports = { queryParams, pathParams}