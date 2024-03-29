import * as actionType from "./actionType";
import { axiosClient } from "../../axios";

export const getPosts = (page) => async (dispatch) => {
  console.log("again get");
  try {
    dispatch({ type: actionType.GET_POSTS });
    const { data: posts } = await axiosClient.get(`/posts?page=${page}`);
    dispatch({
      type: actionType.GET_POSTS_SUCCESS,
      posts: posts.posts,
      currPage: posts.currPage,
      total: posts.total,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  console.log("again get");
  try {
    dispatch({ type: actionType.GET_POSTS });
    const { data: post } = await axiosClient.get(`/posts/${id}`);
    dispatch({ type: actionType.GET_SINGLE_POST_SUCCESS, post });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  console.log(searchQuery);
  try {
    dispatch({ type: actionType.GET_POSTS });
    const { data: posts } = await axiosClient.get(
      `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`
    );
    console.log(posts);
    dispatch({ type: actionType.GET_POSTS_SUCCESS, posts });
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const createPost = (formData) => async (dispatch) => {
  console.log(formData);
  dispatch({ type: actionType.CREATE_POST });
  try {
    const { data: post } = await axiosClient.post("/posts/createPost", formData, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") ? localStorage.getItem("token") : null
        }`,
      },
    });
    dispatch({ type: actionType.CREATE_POST_SUCCESS, post });
  } catch (error) {
    dispatch({
      type: actionType.CREATE_POST_FAIL,
      errors: error?.response?.data,
    });
  }
};

export const updatePost = (id, formData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_POST });
  try {
    const { data: updatedPost } = await axiosClient.patch(`/posts/updatePost/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") ? localStorage.getItem("token") : null
        }`,
      },
    });
    // if (updatedPost) {
    //   dispatch(getPosts());
    // }
    dispatch({ type: actionType.UPDATE_SUCCESS, updatedPost });
  } catch (error) {
    dispatch({ type: actionType.UPDATE_FAIL, errors: error?.response?.data });
  }
};

export const updatePostWithoutFile = (id, formData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_POST });
  try {
    const { data: updatedPost } = await axiosClient.patch(
      `/posts/updatePostWithoutFile/${id}`,
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
    dispatch({ type: actionType.UPDATE_FAIL, errors: error?.response?.data });
  }
};

export const deletePost = (id, sub) => async (dispatch) => {
  try {
    await axiosClient.patch(
      `/posts/deletePost/${id}`,
      { sub },
      {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") ? localStorage.getItem("token") : null
          }`,
        },
      }
    );
    dispatch({ type: actionType.DELETE_SUCCESS, id });
  } catch (error) {}
};

export const likePost = (id, sub) => async (dispatch) => {
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  try {
    const { data: updatedPost } = await axiosClient.patch(
      `/posts/likePost/${id}`,
      { sub },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: actionType.UPDATE_SUCCESS, updatedPost });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (comment, id) => async (dispatch) => {
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
  try {
    const { data: updatedPost } = await axiosClient.post(
      `/posts/commentPost/${id}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(updatedPost);
    dispatch({ type: actionType.COMMENT_SUCCESS, updatedPost, id });
    return updatedPost.comments;
  } catch (error) {
    console.log(error);
  }
};
