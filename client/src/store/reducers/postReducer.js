import * as actionType from "../actions/actionType";

const initState = {
  posts: null,
  loading: false,
  creating: false,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
      return { ...state, loading: true };

    case actionType.GET_POSTS_SUCCESS:
      return { ...state, posts: action.posts, loading: false };

    case actionType.CREATE_POST:
      return { ...state, creating: true };

    case actionType.CREATE_POST_SUCCESS:
      const tempPosts = [...state.posts];
      tempPosts.push(action.post);
      return {
        ...state,
        posts: tempPosts,
        creating: false,
      };

    case actionType.UPDATE_SUCCESS:
      const postsClone = [...state.posts];
      const index = postsClone.findIndex(
        (post) => post._id === action.updatedPost._id
      );
      if (index !== -1) {
        postsClone[index] = action.updatedPost;
      }
      return {
        ...state,
        posts: postsClone,
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
