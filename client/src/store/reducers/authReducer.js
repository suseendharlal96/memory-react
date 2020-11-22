import * as actionType from "../actions/actionType";
const initState = {
  authData: null,
  loading: false,
  errors: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.AUTH:
      return {
        ...state,
        loading: true,
        authData: null,
        errors: null,
      };

    case actionType.AUTH_SUCCESS:
      localStorage.setItem("token", action?.data?.token);
      return {
        ...state,
        authData: action.data,
        loading: false,
        errors: null,
      };

    case actionType.AUTH_FAIL:
      return {
        ...state,
        authData: null,
        loading: false,
        errors: action.error,
      };

    case actionType.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        errors: null,
      };

    default:
      return state;
  }
};

export default authReducer;
