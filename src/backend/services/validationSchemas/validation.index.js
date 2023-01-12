
module.exports = {

  check: {
    exercisePost: require("./validation.schema.exercisePost"),
    logsGet: require("./validation.schema.logsGet")
  },
  handler: require("./validation.handler")

}