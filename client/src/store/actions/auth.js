import { axiosClient } from "../../axios";
import * as actionType from "./actionType";

export const signin = (formData, router) => async (dispatch) => {
  dispatch({ type: actionType.AUTH });
  try {
    const { data } = await axiosClient.post("/user/signin", formData);
    dispatch({ type: actionType.AUTH_SUCCESS, data });
    router.push("/");
  } catch (error) {
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
    dispatch({ type: actionType.AUTH_FAIL, error: error?.response?.data });
  }
};

export const signupWithoutFile = (formData, router) => async (dispatch) => {
  dispatch({ type: actionType.AUTH });
  try {
    const { data } = await axiosClient.post("/user/signupWithoutFile", formData);
    dispatch({ type: actionType.AUTH_SUCCESS, data });
    router.push("/");
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL, error: error?.response?.data });
  }
};
