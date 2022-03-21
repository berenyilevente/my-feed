import { Dispatch } from "redux";
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, UPDATE_POST_FAILURE, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS } from "./posts.types";
import * as api from "../../api";
import { IPostResponseData } from "./posts.interfaces";

export const getPostAction = () => async (dispatch: Dispatch) => {
    dispatch({
      type: GET_POSTS_REQUEST,
    });
    try {
      //in the response we always have the data object
      const res = await api.fetchPosts();
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_POSTS_FAILURE,
        error,
      });
    }
  };

  export const addPostsAction = (post: IPostResponseData) => async (
    dispatch: Dispatch
  ) => {
    dispatch({
      type: ADD_POST_REQUEST,
    });
    try {
      const res = await api.addPost(post);
      console.log(res.data)
      dispatch({
        type: ADD_POST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_POST_FAILURE,
        error,
      });
    }
  };

  export const updatePostAction = (
    id: string,
    posts: IPostResponseData
  ) => async (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_POST_REQUEST,
    });
    try {
      const response = await api.updatePosts(id, posts);
      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_POST_FAILURE,
        error,
      });
    }
  };

  export const deletePostAction = (id: string) => async (
    dispatch: Dispatch
  ) => {
    dispatch({
      type: DELETE_POST_REQUEST,
    });
    try {
      await api.deletePosts(id);
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: DELETE_POST_FAILURE,
        error,
      });
    }
  };
  
  