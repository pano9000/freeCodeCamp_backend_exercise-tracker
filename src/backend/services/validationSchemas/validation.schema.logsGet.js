const { queryParams, pathParams }  = require("./validation.schemaShared.params")


const logsGetSchema = [

  queryParams.from,
  queryParams.to,
  queryParams.limit,
  queryParams.sort,
  pathParams.userId

]

module.exports = logsGetSchema