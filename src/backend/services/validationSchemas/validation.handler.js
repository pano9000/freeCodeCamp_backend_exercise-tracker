
const { validationResult } = require("express-validator")

function handler(req, res, next) {
  const validationErrors = validationResult(req);
  console.log("*************", validationErrors)

  if (validationErrors.isEmpty()) {
    next();
    return
  }

  //todo refactor out to separate file?
  const mappedErrors = validationErrors.array().reduce( (accum, error) => {

    if (error.msg.errorHandling === "fatalError") {
      accum.fatalErrors.push(error);
      return accum;
    }

    if (error.msg.errorHandling === "resetParamErrors") {
      accum.resetParamErrors.push(error);
      return accum;
    }

    accum.unknownErrors.push(error);
    return accum;

  }, {fatalErrors: [], resetParamErrors: [], unknownErrors: []});

  
  //TODO: create new ErrorType -> ValidationError? and handle in ErrorMiddleware?
  //const fatalErrors = validationErrors.array().filter(error => error.msg.errorHandling === "sendError")
  
  if (mappedErrors.fatalErrors.length > 0) {
    
    const response = mappedErrors.fatalErrors.map(fatalError => {
      return {
        msg: `Invalid value for field '${fatalError.param}'`,
        value: fatalError.value
      }
    })

    return res.status(400).json({error: response});
  }

  if (mappedErrors.unknownErrors.length > 0) {

    //TODO: create a constructor for this
    const response = {
        msg: `Validation Error`,
        value: `Unknown Error`
      }

    return res.status(400).json({error: response});

  }


  if (mappedErrors.resetParamErrors.length > 0) {
    mappedErrors.resetParamErrors.forEach(elem => {
      req[elem.location][elem.param] = undefined
    });

  }

  next()
  return

}


module.exports = handler