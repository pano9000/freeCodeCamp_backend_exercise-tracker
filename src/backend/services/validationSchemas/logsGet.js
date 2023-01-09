const { param } = require("express-validator")


const validationSchema = [

  param("from").optional( { checkFalsy: true } ).isDate(),
  param("to").optional().isDate(),
  param("limit").optional().isInt(),
  param("sort").optional().custom(value => ["asc", "desc"].includes(value)),

]


module.exports = validationSchema