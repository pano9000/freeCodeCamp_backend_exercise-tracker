
module.exports = {

  check: {
    usersPost: require("./validation.schema.usersPost"),
    exercisePost: require("./validation.schema.exercisePost"),
    logsGet: require("./validation.schema.logsGet"),
    logsGetAll: require("./validation.schema.logsGetAll"),
    usersAvailableHead: require("./validation.schema.usersAvailableHead"),
    usersGet: require("./validation.schema.usersGet"),
    userIdGet: require("./validation.schema.userIdGet"),
    userIdPatch: require("./validation.schema.userIdPatch"),
    exerciseGetOneSchema: require("./validation.schema.exerciseGetOne"),
    userIdExercisePatch: require("./validation.schema.userIdExercisePatch")
  },
  handler: require("./validation.handler")

}