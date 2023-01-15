const deleteUser = require("../../services/db/deleteUser");


async function userDelete(req, res) {

  try {
    const { userId } = req.params
    const findResult = await deleteUser.deleteOne( { _id: userId } );

    if (!findResult) {
      //throw new Error("userId not found")
      res.status(404).json({ "msg": "userId not found"})
      return
    }

    res.sendStatus(204);
  }
  catch(error) {
    res.status(500).json({"error": "Deleting User Failed, Please try again later"});
  }

}

module.exports = userDelete