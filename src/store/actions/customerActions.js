import axios from "axios";

export const fetchCustomerProviders = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/customer-providers"
    );
    dispatch({
      type: "FETCH_CUSTOMER_PROVIDERS_SUCCESS",
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_CUSTOMER_PROVIDERS_FAILURE",
      payload: error.message,
    });
  }
};
