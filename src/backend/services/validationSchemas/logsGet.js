const { queryParams, pathParams }  = require("./params")


const logsGetSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limit,
  queryParams.sort,
  pathParams.userId

]

module.exports = logsGetSchema