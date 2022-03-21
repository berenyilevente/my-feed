import { AxiosError } from "axios";
import { IDeletePostResponseData, IPostResponseData, IUpdatePostResponseData } from "./posts.interfaces";

export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

//Get post types
export interface IGetPostsRequestAction {
  type: typeof GET_POSTS_REQUEST;
}
export interface IGetPostsSuccessAction {
  type: typeof GET_POSTS_SUCCESS;
  payload: IPostResponseData[];
}
export interface IGetPostsFailureAction {
  type: typeof GET_POSTS_FAILURE;
  error: AxiosError;
}

//Add post types
export interface IAddPostsRequestAction {
  type: typeof ADD_POST_REQUEST;
}
export interface IAddPostsSuccessAction {
  type: typeof ADD_POST_SUCCESS;
  payload: IPostResponseData[];
}
export interface IAddPostsFailureAction {
  type: typeof ADD_POST_FAILURE;
  error: AxiosError;
}

//Update post types
export interface IUpdateRequestAction {
  type: typeof UPDATE_POST_REQUEST;
}
export interface IUpdateSuccessAction {
  type: typeof UPDATE_POST_SUCCESS;
  payload: IUpdatePostResponseData;
}
export interface IUpdateFailureAction {
  type: typeof UPDATE_POST_FAILURE;
  error: AxiosError;
}

//Delete posts
export interface IDeletePostRequestAction {
  type: typeof DELETE_POST_REQUEST;
}
export interface IDeletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS;
  payload: IDeletePostResponseData;
}
export interface IDeletePostFailureAction {
  type: typeof DELETE_POST_FAILURE;
  error: AxiosError;
}

export type PostActionTypes =
  | IGetPostsRequestAction
  | IGetPostsSuccessAction
  | IGetPostsFailureAction
  | IUpdateRequestAction
  | IUpdateSuccessAction
  | IUpdateFailureAction
  | IAddPostsRequestAction
  | IAddPostsSuccessAction
  | IAddPostsFailureAction
  | IDeletePostRequestAction
  | IDeletePostSuccessAction
  | IDeletePostFailureAction;
