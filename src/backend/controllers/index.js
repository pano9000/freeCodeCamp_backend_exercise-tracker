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

      userId: {
        get: require("./api/userIdGet"),
        delete: require("./api/userIdDelete"),
        /* TODO: future route, to get single user info and also update user info
        patch: require("./api/userIdPatch")
        */
      },

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