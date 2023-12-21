const initialState = {
  customerProviders: [],
  error: null,
};

const customerProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CUSTOMER_PROVIDERS_SUCCESS":
      return {
        ...state,
        customerProviders: action.payload,
        error: null,
      };
    case "FETCH_CUSTOMER_PROVIDERS_FAILURE":
      return {
        ...state,
        customerProviders: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerProviderReducer;
