const { body } = require("express-validator")
const { queryParams, pathParams }  = require("./params")


const exercisePostSchema = [

  pathParams.userId,

  body("description").isLength({min: 2, max: 50}),
  body("duration").isInt(),
  body("date").optional().isDate(),

]

module.exports = exercisePostSchema