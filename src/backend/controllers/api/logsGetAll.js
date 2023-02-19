const findExercises = require("../../services/db/findExercises");
const findUser = require("../../services/db/findUser");
const createSearchObject = require("../../services/db/createSearchObject")


async function logsGetAll(req, res) {

  try {
    
    const { from: filterDateFrom, to: filterDateTo, limit: filterQty, sort: optionSort } = req.query
    
    const queryOptions = {
      sort: { date: optionSort || "asc" },
      limit: filterQty || 0
    }

    const opt = { userId: undefined, filterDateFrom: filterDateFrom, filterDateTo: filterDateTo }
    const searchObject = createSearchObject.exerciseLog( opt )
    delete searchObject.userId
    const findResult = await findExercises.findAll(searchObject, queryOptions); //TODO: check if pagination of results should be a thing?

    //findResult is always an array it, either empty or filled - undefined errors are caught in findExercises already, so no need to handle them here anymore
    const response = {
      count: findResult.length,
      log: findResult.map(result => {
        const { description, duration, date } = result;
        return { 
          description, 
          duration, 
          date: (new Date(date)).toDateString()
        }
      })
    }

    res.status(200).json(response);

  }
  catch(error) {
    res.status(500).json({"error": `Getting Exercise List Failed, Reason: ${error.message}`});

  }


}

module.exports = logsGetAll