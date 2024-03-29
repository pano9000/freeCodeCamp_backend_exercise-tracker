import { handleApiResponse } from "./apiService";

export function formValidityCheck(event, refToUpdate) {
  refToUpdate.value = event.target.form.checkValidity();
}



export async function submitFormHandler(event, usernameref, apiFunction, apiResponseHandler = handleApiResponse) {
  try {
    event.preventDefault();
    event.target.disabled = true;

    const form = event.target.form;

    if (form.checkValidity() !== true) {
      throw new Error("Invalid Data Entered")
    }
    const formData = new FormData(form);

    //todo: show some loading spinner?

    const apiResponse = await apiFunction(formData)
    console.log(apiResponse)
    apiResponseHandler(apiResponse)
  
    if (!apiResponse.statusOK) {
      throw new Error("Error Server")
      //TODO: add proper handling
    }
    alert("Success") //TODO: handle better
    resetReactiveFormValues(usernameref);
  }
  catch(error) {
    console.log(error)
    alert(`something went wrong, ${error.message}`)
  }
};

function resetReactiveFormValues(reactiveForm) {
  const formElementKeys = Object.keys(reactiveForm);
  formElementKeys.forEach(formElementKey => {
    console.log(reactiveForm[formElementKey], formElementKey)
    reactiveForm[formElementKey]["value"] = "";
  })

}

export async function uiVisibilityHandler(uiVisibility, uiElement) {
  uiVisibility.value[uiElement] = true;
};

export function updateValue(newValue, itemToUpdate) {
  itemToUpdate.value = newValue.value
};


export function ReactiveFormItem(value = "", required = true, available = null) {
  return {
    value,
    valid: (value !== "") ? true : null,
    required,
    available
  }
}

export async function availabilityHandler(reactiveForm, reactiveFormItem, availabilityApiEndpoint) {
  const currentFormItem = reactiveForm[reactiveFormItem]

  if (currentFormItem.value == "" || currentFormItem.valid !== true) {
    return
  };

  const availabilityResult = await availabilityApiEndpoint(currentFormItem.value);
  currentFormItem.available = availabilityResult.response.available;
}

export function getIsValidData(reactiveForm) {
  for (let item in reactiveForm) {
    const isValid = (reactiveForm[item]["valid"] === true);
    const isAvailable = (reactiveForm[item]["available"] !== false);
    if ( !isValid || !isAvailable ) {
      return false
    };
  }
  return true
}


export function getInputStatus(elem, inputValue) {
  return (inputValue === "") ? null : elem?.validity?.valid
}


/**
* 
* @param {$event} event 
* @param { { reactiveForm: {}, reactiveFormItem: '', availabilityCheck: Bool, availabilityFunc: (), inputTimeoutId: {} } } options 
*/
export function inputHandler(event, options) {
  const { reactiveForm, reactiveFormItem, availabilityCheck, availabilityFunc, inputTimeoutId } = options;
  const currentFormItem = reactiveForm[reactiveFormItem];

  const updateFormItemValidity = () => {
    currentFormItem.valid = getInputStatus(event.target, currentFormItem.value);
  }

  if (availabilityCheck === true) {
    if (inputTimeoutId.value) {
      clearTimeout(inputTimeoutId.value);
    }

    inputTimeoutId.value = setTimeout( async () => {
      updateFormItemValidity()
      await availabilityHandler(reactiveForm, reactiveFormItem, availabilityFunc);
      inputTimeoutId.value = null;
    }, 600);
    return
  }

  updateFormItemValidity();
}

/**
 * 
 * @param {String} dataKeyId 
 * @param {} dataStore
 */
export function tableHeadingSortHandler(dataKeyId, dataStore) {

  if (dataKeyId !== dataStore.filters.sortBy) {
    dataStore.$patch(state => {
      state.filters.sortOrder = 1,
      state.filters.sortBy = dataKeyId
    })
  } else {
    dataStore.filters.sortOrder *= -1
  }

}


/**
 * 
 * @param {String} name 
 * @param {String} key 
 * @param { Boolean } defaultSortBy 
 */
export function DataTableKey(name, key, defaultSortBy = false, currentActive = false) {
  return {
    name, key, defaultSortBy, currentActive
  }
}


export function getActiveFilters(filtersStore) {
  const activeFilters = {};
  for (const filter in filtersStore) {
    if (["", undefined, null].includes(filtersStore[filter]) === false) {
      activeFilters[filter] = filtersStore[filter];
    }
  }
  return activeFilters;
}