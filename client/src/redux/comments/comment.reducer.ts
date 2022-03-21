import { ICommentState } from "./comment.interfaces";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  CommentActionTypes,
  DELETE_COMMENTS_FAILURE,
  DELETE_COMMENTS_REQUEST,
  DELETE_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
} from "./comment.types";


const defaultCommentState: ICommentState = {
  isCommentsLoading: false,
  errorMessage: null,
  comments: [],
  addComments: [],
  reloadComments: undefined,
};

const commentReducer = (
  state = defaultCommentState,
  action: CommentActionTypes
): ICommentState => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        isCommentsLoading: true,
        errorMessage: null,
        reloadComments: undefined,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        isCommentsLoading: false,
        errorMessage: null,
        comments: action.payload,
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        isCommentsLoading: false,
        errorMessage: action.error.message,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isCommentsLoading: true,
        errorMessage: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentsLoading: false,
        errorMessage: null,
        comments: state.comments.concat(action.payload),
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isCommentsLoading: false,
        errorMessage: action.error.message,
      };
    case DELETE_COMMENTS_REQUEST:
      return {
        ...state,
        isCommentsLoading: true,
        errorMessage: null,
      };
    case DELETE_COMMENTS_SUCCESS:
      return {
        ...state,
        isCommentsLoading: false,
        errorMessage: null,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload._id
        ),
        reloadComments: true,
      };
    case DELETE_COMMENTS_FAILURE:
      return {
        ...state,
        isCommentsLoading: false,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
};
export default commentReducer