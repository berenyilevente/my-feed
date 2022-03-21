import * as api from "../../api";
import pageURLS from "../../constants/pageURLS";
import { Dispatch } from "redux";
import {  IAuthResult, IEditProfile, ILoginResult } from "./auth.interfaces";
import { EDIT_PROFILE_FAILURE, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GOOGLE_AUTH_FAILURE, GOOGLE_AUTH_REQUEST, GOOGLE_AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, VERIFY_USER_FAILURE, VERIFY_USER_REQUEST, VERIFY_USER_SUCCESS } from "./auth.types";
import { NavigateFunction } from "react-router-dom";

export const registerUserAction = (
    signUpData: IAuthResult,
    navigate: NavigateFunction
  ) => async (dispatch: Dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    try {
     const res = await api.register(signUpData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      navigate(pageURLS.CONFIRM);
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        error,
      });
    }
  };
  
  export const loginAction = (loginData: ILoginResult, navigate: NavigateFunction) => async (
    dispatch: Dispatch
  ) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      const res = await api.login(loginData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      navigate(pageURLS.HOME);
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        error,
      });
    }
  };
  
  export const getUserAction = () => async (dispatch: Dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    try {
      const res = await api.fetchUser();
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        error,
      });
    }
  };

  export const googleAuthAction = (data: { result: any; token: any }) => async (
    dispatch: Dispatch
  ) => {
    dispatch({
      type: GOOGLE_AUTH_REQUEST,
    });
    try {
      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GOOGLE_AUTH_FAILURE,
        error,
      });
    }
  };

  export const editProfileAction = (id: string, user: IEditProfile) => async (
    dispatch: Dispatch
  ) => {
    dispatch({
      type:EDIT_PROFILE_REQUEST,
    });
    const response = await api.editUser(id, user);
    try {
      dispatch({
        type:EDIT_PROFILE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type:EDIT_PROFILE_FAILURE,
        error,
      });
    }
  };

  export const logoutAction = () => async (dispatch: Dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    try {
      localStorage.clear();
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        error,
      });
    }
  };

  export const verifyUserAction = (confirmationCode?: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: VERIFY_USER_REQUEST,
    });
    try {
      await api.verifyUser(confirmationCode!)
      dispatch({
        type: VERIFY_USER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: VERIFY_USER_FAILURE,
        error,
      });
    }
  };

