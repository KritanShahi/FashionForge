import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from 'axios';

export const login = async (dispatch, user) => {
  dispatch(loginStart());  // Indicate login process has started
  console.log("Dispatching loginStart");

  try {
    // Send login request to the server
    const res = await axios.post("http://localhost:8080/api/login", user);

    // Dispatch login success with the user data returned from server
    dispatch(loginSuccess(res.data));
    console.log("Dispatching loginSuccess with data:", res.data);
  } catch (err) {
    // If there's an error, dispatch login failure
    dispatch(loginFailure());
    console.log("Dispatching loginFailure");
    console.error("Login error:", err.response ? err.response.data : err.message);  // Enhanced error logging
  }
};
