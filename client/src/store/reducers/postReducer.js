import * as actionType from "../actions/actionType";

const initState = {
  posts: null,
  loading: false,
  creating: false,
  errors: null,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
      return { ...state, loading: true, errors: null };

    case actionType.GET_POSTS_SUCCESS:
      // const actualPosts = [...state.posts];
      // actualPosts.unshift(action.posts);
      console.log(action.posts);
      return { ...state, posts: action.posts, currPage: action.currPage, total: action.total, loading: false, errors: null };

    case actionType.GET_SINGLE_POST_SUCCESS:
      console.log(action.post);
      return { ...state, post: action.post, loading: false, errors: null };

    case actionType.CREATE_POST:
      return { ...state, creating: true, errors: null };

    case actionType.CREATE_POST_SUCCESS:
      const tempPosts = [...state.posts];
      tempPosts.unshift(action.post);
      return {
        ...state,
        posts: tempPosts,
        creating: false,
        errors: null,
      };

    case actionType.CREATE_POST_FAIL:
      return {
        ...state,
        errors: action.errors,
        creating: false,
      };

    case actionType.UPDATE_SUCCESS:
      const postsClone = [...state.posts];
      const index = postsClone.findIndex((post) => post._id === action.updatedPost._id);
      if (index !== -1) {
        postsClone[index] = action.updatedPost;
      }
      return {
        ...state,
        posts: postsClone,
        creating: false,
      };

    case actionType.UPDATE_FAIL:
      return {
        ...state,
        errors: action.errors,
        creating: false,
      };

    case actionType.DELETE_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.id),
      };

    default:
      return state;
  }
};

export default postReducer;
