export interface ICommentState {
  isCommentsLoading?: boolean;
  errorMessage: string | null;
  comments: ICommentResponseData[];
  addComments: ICommentResponseData[];
  reloadComments?: boolean;
}

export interface ICommentResponseData {
  _id?: string;
  comment?: string;
  commenter?: string;  
  commenterUserId?: string;
  commentToPostId?: string;
}
[]

export interface IDeleteCommentResponseData {
  _id?: string;
  comment?: string;
}
