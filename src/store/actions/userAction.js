import axios from "axios";

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
  }
};
