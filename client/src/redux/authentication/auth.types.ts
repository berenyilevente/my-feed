import { AxiosError } from "axios";
import {
  IAuthResponseData,
  IEditProfileResponse,
  IGetUserResponseData,
  IGoogleResponseData,
  ILoginResponseData,
} from "./auth.interfaces";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const GOOGLE_AUTH_REQUEST = "GOOGLE_AUTH_REQUEST";
export const GOOGLE_AUTH_SUCCESS = "GOOGLE_AUTH_SUCCESS";
export const GOOGLE_AUTH_FAILURE = "GOOGLE_AUTH_FAILURE";

export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILURE = "EDIT_PROFILE_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_USER_REQUEST = "VERIFY_USER_REQUEST";
export const VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS";
export const VERIFY_USER_FAILURE = "VERIFY_USER_FAILURE";

//register types
export interface IRegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: IAuthResponseData;
}
export interface IRegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  error: AxiosError | Error;
}

//login types
export interface ILoginRequestAction {
  type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: ILoginResponseData;
}
export interface ILoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: AxiosError | Error;
}

//get user types
export interface IGetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  payload: IGetUserResponseData;
}
export interface IGetUserFailureAction {
  type: typeof GET_USER_FAILURE;
  error: AxiosError | Error;
}

//google auth types
export interface IGoogleAuthRequestAction {
  type: typeof GOOGLE_AUTH_REQUEST;
}
export interface IGoogleAuthSuccessAction {
  type: typeof GOOGLE_AUTH_SUCCESS;
  payload: IGoogleResponseData;
}
export interface IGoogleAuthFailureAction {
  type: typeof GOOGLE_AUTH_FAILURE;
  error: AxiosError | Error;
}

//edit profile types
export interface IEditProfileRequestAction {
  type: typeof EDIT_PROFILE_REQUEST;
}
export interface IEditProfileSuccessAction {
  type: typeof EDIT_PROFILE_SUCCESS;
  payload: IEditProfileResponse;
}
export interface IEditProfileFailureAction {
  type: typeof EDIT_PROFILE_FAILURE;
  error: AxiosError | Error;
}

//logout types
export interface ILogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: AxiosError | Error;
}

//verify user types
export interface IVerifyUserRequestAction {
  type: typeof VERIFY_USER_REQUEST;
}
export interface IVerifyUserSuccessAction {
  type: typeof VERIFY_USER_SUCCESS;
}
export interface IVerifyUserFailureAction {
  type: typeof VERIFY_USER_FAILURE;
  error: AxiosError | Error;
}

export type AuthActionTypes =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailureAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailureAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailureAction
  | IGoogleAuthRequestAction
  | IGoogleAuthSuccessAction
  | IGoogleAuthFailureAction
  | IEditProfileRequestAction
  | IEditProfileSuccessAction
  | IEditProfileFailureAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailureAction
  | IVerifyUserRequestAction
  | IVerifyUserSuccessAction
  | IVerifyUserFailureAction;
