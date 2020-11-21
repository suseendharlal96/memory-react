import { useHistory } from "react-router-dom";
import { axiosClient } from "../../axios";
import * as actionType from "./actionType";

export const signin = (formData, router) => async (dispatch) => {
  dispatch({ type: actionType.AUTH });
  try {
    const { data } = await axiosClient.post("/user/signin", formData);
    console.log(data);
    dispatch({ type: actionType.AUTH_SUCCESS, data });
    router.push("/");
  } catch (error) {
    console.log(error?.response);
    dispatch({ type: actionType.AUTH_FAIL, error: error?.response?.data });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  dispatch({ type: actionType.AUTH });
  try {
    const { data } = await axiosClient.post("/user/signup", formData);
    dispatch({ type: actionType.AUTH_SUCCESS, data });
    router.push("/");
  } catch (error) {
    console.log(error?.response);
    dispatch({ type: actionType.AUTH_FAIL, error: error?.response?.data });
  }
};
