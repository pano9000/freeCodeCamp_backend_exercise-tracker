const findExercises = require("../../services/db/findExercises");
const findUser = require("../../services/db/findUser");

async function logs(req, res) {


  /*
    1. validate/sanitize userId
    1.1 check for `from`, `to` and `limit` url query params
      1.1.1 `from` and `to` are Dates  in yyyy-mm-dd format, `limit` is int
      http://localhost:3002/api/users/user_63ba110747f325e76e1d931c/logs?from=2022-02-05&to=2022-12-31&limit=100
    2. search db for exercises with `userId` = `userId from params`
    (3. search db for user with `_id` = `userId from params`) -> potentially not needed
    3. create new response object
      1. map function exercise searchREsult -> get `description, duration, date` from each exercise doc and push into log array as object
      2. add username and _id ("USER ID") to response
      3. add count property -> log.length

  */
  /*
    expected output by FCC
    {
      username: "fcc_test",
      count: 1,
      _id: "5fb5853f734231456ccb3b05", //USER ID
      log: [{
        description: "test",
        duration: 60,
        date: "Mon Jan 01 1990",
      }]
    }
  */

  try {

    const { userId } = req.params
    if (userId === undefined || userId === null) {
      throw new Error("userId undefined/null is invalid")
    }

    const { from: filterDateFrom, to: filterDateTo, limit: filterQty, sort: optionSort } = req.query

    // validate -> limit needs to be int, if not -> set to undefined
    // validate -> sort needs to be asc or desc -> alse set to undefined
    // validate -> date needs to be date format -> else set to undefined

    const findUserResult = await findUser.findOne({ _id: userId })

    if (findUserResult === null) {
      throw new Error("user not found")
    }


    //create search here, depending on what the filters say -> probably refactor to separate function
    const createSearchObject = () => {
      const searchObject = {
        userId
      }

      if (filterDateFrom !== undefined && filterDateTo === undefined) searchObject.date = { $gte: filterDateFrom};
      if (filterDateTo !== undefined && filterDateFrom === undefined) searchObject.date = { $lte: filterDateTo};
      if (filterDateFrom !== undefined && filterDateTo !== undefined) searchObject.date = { $lte: filterDateTo, $gte: filterDateFrom};

      return searchObject
    }
    const queryOptions = {
      sort: { date: optionSort || "asc" },
      limit: filterQty || 0
    }

    const searchObject = createSearchObject()

    const findResult = await findExercises.findAll(searchObject, queryOptions); //TODO: check if pagination of results should be a thing?

    //findResult is always an array it, either empty or filled - undefined errors are caught in findExercises already, so no need to handle them here anymore
    const response = {
      username: findUserResult.username,
      count: findResult.length,
      _id: findUserResult._id,
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

module.exports = logs