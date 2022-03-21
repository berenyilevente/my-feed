import { IAuthState } from "./auth.interfaces";
import {
  AuthActionTypes,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  VERIFY_USER_FAILURE,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
} from "./auth.types";

const defaultAuthState: IAuthState = {
  isAuthLoading: undefined,
  errorMessage: null,
  auth: undefined,
  isUserLoggedIn: false,
  googleAuth: undefined,
  confirmationCode: undefined,
  verificationSuccess: undefined,
};

const authReducer = (
  state = defaultAuthState,
  action: AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        errorMessage: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        auth: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        errorMessage: action.error.message,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        errorMessage: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        isAuthLoading: false,
        isUserLoggedIn: true,
        auth: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        errorMessage: action.error.message,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        errorMessage: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        isAuthLoading: false,
        isUserLoggedIn: true,
        auth: action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        errorMessage: action.error.message,
      };

    case GOOGLE_AUTH_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        errorMessage: null,
      };
    case GOOGLE_AUTH_SUCCESS:
      return (
        {
          ...state,
          isAuthLoading: false,
          errorMessage: null,
          isUserLoggedIn: true,
          googleAuth: action.payload
        }
      );
    case GOOGLE_AUTH_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        errorMessage: action.error.message,
      };
    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        errorMessage: null,
        isUserLoggedIn: true,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        errorMessage: null,
        isUserLoggedIn: true,
        auth:
          state.auth?.result._id === action.payload.result._id
            ? action.payload
            : state.auth,
      };

    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        errorMessage: action.error.message,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        errorMessage: null,
      };
    case LOGOUT_SUCCESS:
      return (
        localStorage.clear(),
        {
          ...state,
          isAuthLoading: false,
          isUserLoggedIn: false,
        }
      );
    case LOGOUT_FAILURE:
      return {
        ...state,
        errorMessage: action.error.message,
      };
    case VERIFY_USER_REQUEST:
      return {
        ...state,
        errorMessage: null,
      };
    case VERIFY_USER_SUCCESS:
      return (
        {
          ...state,
         verificationSuccess: true,
        }
      );
    case VERIFY_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
};

export default authReducer