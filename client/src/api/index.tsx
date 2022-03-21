import {
  IAuthResult,
  IEditProfile,
  ILoginResult,
} from "@/redux/authentication/auth.interfaces";
import axios from "axios";
import { IPostResponseData } from "../redux/posts/posts.interfaces";
import { ICommentResponseData } from "../redux/comments/comment.interfaces";
import { store } from "../redux/store";
import apiURLS from "../constants/apiURLS";

const API = axios.create({ baseURL: "http://localhost:5000" });

//send the token to the backend middleware so that it can verify our token
API.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.auth?.token || state.auth.googleAuth?.token;
    if (token) {
      config!.headers!.Authorization! = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchPosts = () => API.get(apiURLS.GET_POSTS);

export const addPost = (newPost: IPostResponseData) =>
  API.post(apiURLS.ADD_POSTS, newPost);

export const updatePosts = (id?: string, updatePost?: IPostResponseData) =>
  API.patch(apiURLS.PATCH_POSTS + id, updatePost);

export const deletePosts = (id?: string) =>
  API.delete(apiURLS.DELETE_POST + id);

export const login = (loginData: ILoginResult) =>
  API.post(apiURLS.LOGIN, loginData);

export const register = (signUpData: IAuthResult) =>
  API.post(apiURLS.REGISTER, signUpData);

export const editUser = (id?: string, editUser?: IEditProfile) =>
  API.patch(apiURLS.EDIT_USER + id, editUser);

export const fetchUser = () => API.get(apiURLS.FETCH_USER);

export const fetchComments = () => API.get(apiURLS.FETCH_COMMENTS);

export const addComment = (newComment: ICommentResponseData) =>
  API.post(apiURLS.ADD_COMMENTS, newComment);

export const deleteComment = (id?: string) =>
  API.delete(apiURLS.DELETE_COMMENT + id);

export const verifyUser = (confirmationToken: string) => API.get(apiURLS.VERIFY_USER + confirmationToken) 