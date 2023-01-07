module.exports = {

  unknown: {
    get: (req, res) => res.status(404).send("Unknown Page - 404 Error")
  },

  root: {
    get: (req, res) => res.sendFile(process.cwd() + "/views/index.html"),
  },

  api: {

    users: {

      get: require("./api/usersGet"),
      post: require("./api/usersPost"),

      logs: {
        get: require("./api/logsGet")
      },

      exercises: {
        post: require("./api/exercisesPost")
      }

    },

  },

  rateLimiter: {
    post: require("./rateLimiter").post,
    get: require("./rateLimiter").get
  }
}