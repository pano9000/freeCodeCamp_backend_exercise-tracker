const { ExerciseModel } = require("../../db/").models;

const deleteExercise = {

  async deleteOne(searchObject) {
    return await this.delete("one", searchObject)
  },

  /*
  async deleteMany(searchObject) {
    return await this.delete("many", searchObject)
  }
  */

  async delete(mode = "one", searchObject) {

    try {
      //const searchResult = (mode === "many") ? await ExerciseModel.deleteMany(searchObject).exec() : await ExerciseModel.findOneAndDelete(searchObject).exec();
      const searchResult = await ExerciseModel.findOneAndDelete(searchObject).exec();
      if (searchResult === undefined) {
        throw new Error("Db returned undefined")
      }
      return searchResult
    }
    catch(error) {
      console.log(error)
      throw new Error(`Deleting Exercise failed, ${error.message}`)
    }

  }
}

module.exports = deleteExercise