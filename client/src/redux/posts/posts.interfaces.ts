import { ICommentResponseData } from "../comments/comment.interfaces";

export interface IPostState {
    isPostsLoading?: boolean,
    errorMessage: string | null,
    posts: IPostResponseData[],
    addPosts: IPostResponseData[],
    reloadPage?: boolean,
}

export interface IPostResponseData{
    _id?: string;
    title?: string;
    message?: string;
    postedBy?: string;
    creatorId?: string;
    comments?: ICommentResponseData[]
}[]

export interface IUpdatePostResponseData{
    _id?: string;
    title?: string;
    message?: string;
}
export interface IDeletePostResponseData{
    _id?: string;
    title?: string;
    message?: string;
}
