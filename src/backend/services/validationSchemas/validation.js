
function validateLogsGet() {
/*
  filterDateFrom,
    filterDateTo,
    filterQty,
    optionSort
*/
  validateFilterDate(filterDateFrom);
  validateFilterDate(filterDateTo);

  if (filterQty === undefined)
  if (/^[0-9]{1,*}$/.test(filterQty) === false)

  if (["asc", "desc"].includes(optionSort) === false)

}

function validateFilterDate(filterDate) {
  if (filterDate === undefined) return true;

}


module.exports = 