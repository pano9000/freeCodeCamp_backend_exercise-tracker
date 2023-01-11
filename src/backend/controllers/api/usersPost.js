const createUser = require("../../services/db/createUser");

async function usersPost(req, res) {

  try {
    //TODO: validate req.body.username
    const username = req.body.username
    const saveResult = await createUser({ username });

    if (!saveResult) {
      throw new Error("saving failed")
    }

    res.status(201).json( { username: saveResult.username, _id: saveResult._id});

  }

  catch(error) {

    console.log("error in usersPost", error.message)
    res.status(500).json({"error": "Creating User Failed, Please try again later"});

  }

}

module.exports = usersPost