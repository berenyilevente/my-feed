import { AxiosError } from "axios";
import { ICommentResponseData, IDeleteCommentResponseData } from "./comment.interfaces";

export const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const DELETE_COMMENTS_REQUEST = "DELETE_COMMENTS_REQUEST";
export const DELETE_COMMENTS_SUCCESS = "DELETE_COMMENTS_SUCCESS";
export const DELETE_COMMENTS_FAILURE = "DELETE_COMMENTS_FAILURE";

//Get comment types
export interface IGetCommentsRequestAction {
  type: typeof GET_COMMENTS_REQUEST;
}
export interface IGetCommentsSuccessAction {
  type: typeof GET_COMMENTS_SUCCESS;
  payload: ICommentResponseData[];
}
export interface IGetCommentsFailureAction {
  type: typeof GET_COMMENTS_FAILURE;
  error: AxiosError;
}

//Add comment types
export interface IAddCommentsRequestAction {
  type: typeof ADD_COMMENT_REQUEST;
}
export interface IAddCommentsSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  payload: ICommentResponseData[];
}
export interface IAddCommentsFailureAction {
  type: typeof ADD_COMMENT_FAILURE;
  error: AxiosError;
}

//Delete comments
export interface IDeleteCommentsRequestAction {
  type: typeof DELETE_COMMENTS_REQUEST;
}
export interface IDeleteCommentsSuccessAction {
  type: typeof DELETE_COMMENTS_SUCCESS;
  payload: IDeleteCommentResponseData;
}
export interface IDeleteCommentsFailureAction {
  type: typeof DELETE_COMMENTS_FAILURE;
  error: AxiosError;
}

export type CommentActionTypes =
  | IGetCommentsRequestAction
  | IGetCommentsSuccessAction
  | IGetCommentsFailureAction
  | IAddCommentsRequestAction
  | IAddCommentsSuccessAction
  | IAddCommentsFailureAction
  | IDeleteCommentsRequestAction
  | IDeleteCommentsSuccessAction
  | IDeleteCommentsFailureAction;
