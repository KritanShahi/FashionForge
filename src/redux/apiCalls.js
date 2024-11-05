import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from 'axios';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  console.log("Dispatching loginStart"); 
  try {
    const res = await axios.post("http://localhost:8080/api/login", user);
    dispatch(loginSuccess(res.data));
    console.log("Dispatching loginSuccess"); 
  } catch (err) {
    dispatch(loginFailure());
    console.log("Dispatching loginFailure");  // Added log
    console.error("Login error:", err); 
  }
};