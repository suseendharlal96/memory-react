import * as actionType from "./actionType";
import { axiosClient } from "../../axios";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_POSTS });
    const { data: posts } = await axiosClient.get("/posts");
    dispatch({ type: actionType.GET_POSTS_SUCCESS, posts });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (formData) => async (dispatch) => {
  console.log(formData);
  dispatch({ type: actionType.CREATE_POST });
  try {
    const { data: post } = await axiosClient.post(
      "/posts/createPost",
      formData,
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
          }`,
        },
      }
    );
    console.log(post);
    dispatch({ type: actionType.CREATE_POST_SUCCESS, post });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionType.CREATE_POST_FAIL,
      errors: error?.response?.data,
    });
  }
};

export const updatePost = (id, formData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_POST });
  try {
    const { data: updatedPost } = await axiosClient.patch(
      `/posts/updatePost/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
          }`,
        },
      }
    );
    dispatch({ type: actionType.UPDATE_SUCCESS, updatedPost });
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.UPDATE_FAIL, errors: error?.response?.data });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axiosClient.delete(`/posts/deletePost/${id}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") ? localStorage.getItem("token") : null
        }`,
      },
    });
    dispatch({ type: actionType.DELETE_SUCCESS, id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data: updatedPost } = await axiosClient.patch(
      `/posts/likePost/${id}`,
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
          }`,
        },
      }
    );
    dispatch({ type: actionType.UPDATE_SUCCESS, updatedPost });
  } catch (error) {
    console.log(error);
  }
};
