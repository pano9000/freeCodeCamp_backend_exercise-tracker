const deleteExercise = require("../../services/db/deleteExercise");

async function exerciseDelete(req, res) {

  try {
    const { exerciseId } = req.params
    const findResult = await deleteExercise.deleteOne( { _id: exerciseId } );

    if (!findResult) {
      //throw new Error("userId not found")
      res.status(404).json({ "msg": "exerciseId not found"})
      return
    }

    res.sendStatus(204);
  }
  catch(error) {
    res.status(500).json({"error": "Deleting Exercise Failed, Please try again later"});
  }

}

module.exports = exerciseDelete