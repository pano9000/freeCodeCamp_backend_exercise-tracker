
const { validationResult } = require("express-validator")

function handler(req, res, next) {
  const validationErrors = validationResult(req);
  console.log("*************", validationErrors)

  if (validationErrors.isEmpty()) {
    next();
    return
  }


  //TODO: create new ErrorType -> ValidationError? and handle in ErrorMiddleware?
  const fatalErrors = validationErrors.array().filter(error => error.msg.errorHandling === "sendError")

  if ( fatalErrors.length > 0 ) {

    const response = fatalErrors.map(fatalError => {
      return {
        msg: `Invalid value for field '${fatalError.param}'`,
        value: fatalError.value
      }
    })

    return res.status(400).json({error: response});
  }

  // if no "fatal" errors -> try to 
  if ( validationErrors.errors.some( error => error.msg.errorHandling === "sendError") === false ) { //todo refactor
    validationErrors.errors.forEach( elem => {
      req[elem.location][elem.param] = undefined
    })
    next()
    return

  }




}


module.exports = handler