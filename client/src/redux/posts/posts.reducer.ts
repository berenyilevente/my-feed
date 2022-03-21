import { IPostState } from "./posts.interfaces";
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, PostActionTypes, UPDATE_POST_FAILURE, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS } from "./posts.types";

  
  const defaultPostState: IPostState = {
    isPostsLoading: undefined,
    errorMessage: null,
    posts: [],
    addPosts: [],
    reloadPage: undefined,
  };
  
  const postsReducer = (
    state = defaultPostState,
    action: PostActionTypes
  ): IPostState => {
    switch (action.type) {
      case GET_POSTS_REQUEST:
        return {
          ...state,
          isPostsLoading: true,
          errorMessage: null,
          reloadPage: undefined,
        };
      case GET_POSTS_SUCCESS:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: null,
          posts: action.payload,
        };
      case GET_POSTS_FAILURE:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: action.error.message,
        };
      case ADD_POST_REQUEST:
        return {
          ...state,
          isPostsLoading: true,
          errorMessage: null,
        };
      case ADD_POST_SUCCESS:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: null,
          posts: state.posts.concat(action.payload),
        };
      case ADD_POST_FAILURE:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: action.error.message,
        };
      case UPDATE_POST_REQUEST:
        return {
          ...state,
          isPostsLoading: true,
          errorMessage: null,
        };
      case UPDATE_POST_SUCCESS:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: null,
          posts: state.posts.map(post=> post._id === action.payload._id ? action.payload : post),
        };
      case UPDATE_POST_FAILURE:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: action.error.message,
        };
      case DELETE_POST_REQUEST:
        return {
          ...state,
          isPostsLoading: true,
          errorMessage: null,
        };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: null,
          posts: state.posts.filter(
            (post) => post._id !== action.payload._id
          ),
          reloadPage: true
        };
      case DELETE_POST_FAILURE:
        return {
          ...state,
          isPostsLoading: false,
          errorMessage: action.error.message,
        };
      default:
        return state;
    }
  };
  
  export default postsReducer