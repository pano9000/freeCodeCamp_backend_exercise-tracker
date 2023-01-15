const { UserModel } = require("../../db/").models;

const deleteUser = {

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
      //const searchResult = (mode === "many") ? await UserModel.deleteMany(searchObject).exec() : await UserModel.findOneAndDelete(searchObject).exec();
      const searchResult = await UserModel.findOneAndDelete(searchObject).exec();
      if (searchResult === undefined) {
        throw new Error("Db returned undefined")
      }
      return searchResult
    }
    catch(error) {
      console.log(error)
      throw new Error(`Deleting User failed, ${error.message}`)
    }

  }
}

module.exports = deleteUser