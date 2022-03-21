import { Dispatch } from "redux";
import * as api from "../../api";
import { ICommentResponseData } from "./comment.interfaces";
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, DELETE_COMMENTS_FAILURE, DELETE_COMMENTS_REQUEST, DELETE_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE, GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS } from "./comment.types";

export const getCommentsAction = () => async (dispatch: Dispatch) => {
    dispatch({
      type: GET_COMMENTS_REQUEST,
    });
    try {
      const res = await api.fetchComments();
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_COMMENTS_FAILURE,
        error,
      });
    }
  };

  export const addCommentAction = (comment: ICommentResponseData) => async (
    dispatch: Dispatch
  ) => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
    });
    try {
      const res = await api.addComment(comment);
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_COMMENT_FAILURE,
        error,
      });
    }
  };

  export const deleteCommentAction = (id: string) => async (
    dispatch: Dispatch
  ) => {
    dispatch({
      type: DELETE_COMMENTS_REQUEST,
    });
    try {
      await api.deleteComment(id);
      dispatch({
        type: DELETE_COMMENTS_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: DELETE_COMMENTS_FAILURE,
        error,
      });
    }
  };
  