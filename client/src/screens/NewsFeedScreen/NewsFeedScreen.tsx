import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import NewsFeedLayout from "../../layouts/NewsFeedLayout/NewsFeedLayout";
import PostMessageLayout from "../../layouts/PostMessageLayout/PostMessageLayout";
import Button from "../../components/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostsAction,
  deletePostAction,
  getPostAction,
  updatePostAction,
} from "../../redux/posts/posts.actions";
import { AppState } from "@/redux/store";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DisplayMessageLayout from "../../layouts/DisplayMessageLayout/DisplayMessageLayout";
import {
  addCommentAction,
  deleteCommentAction,
  getCommentsAction,
} from "../../redux/comments/comment.actions";
import { Modal } from "react-bootstrap";
import { ErrorField } from "../../components/ErrorField/ErrorField";
import { useTranslation } from "react-i18next";

const NewsFeedScreen = () => {
  const { t } = useTranslation();

  const postText = t("newsFeedScreen.postText");
  const clearText = t("newsFeedScreen.clearText");
  const newsFeedTitle = t("newsFeedScreen.newsFeedTitle");
  const createPostTitle = t("newsFeedScreen.createPostTitle");
  const titlePlaceholder = t("newsFeedScreen.titlePlaceholder");
  const postMessagePlaceholder = t("newsFeedScreen.postMessagePlaceholder");
  const cancelText = t("newsFeedScreen.cancelText");
  const editText = t("newsFeedScreen.editText");
  const deleteText = t("newsFeedScreen.deleteText");
  const saveText = t("newsFeedScreen.saveText");
  const editTitlePlaceholder = t("newsFeedScreen.editTitlePlaceholder");
  const editMessagePlaceholder = t("newsFeedScreen.editMessagePlaceholder");
  const pleaseLoginText = t("newsFeedScreen.pleaseLoginText");
  const addCommentText = t("newsFeedScreen.addCommentText");
  const commentText = t("newsFeedScreen.commentText");
  const commentsTitle = t("newsFeedScreen.commentsTitle");
  const noCommentText = t("newsFeedScreen.noCommentText");
  const confirmDeletePostText = t("newsFeedScreen.confirmDeletePostText");
  const confirmDeleteCommentText = t("newsFeedScreen.confirmDeleteCommentText");
  const deleteCommentText = t("newsFeedScreen.deleteCommentText");
  const deletePostText = t("newsFeedScreen.deletePostText");
  const noMessageTitleError = t("errorMessages.noMessageTitleError");
  const noMessageError = t("errorMessages.noMessageError");
  const noCommentError = t("errorMessages.noCommentError");

  const dispatch = useDispatch();

  const { posts, isPostsLoading, reloadPage } = useSelector(
    (state: AppState) => state.posts
  );
  const { isUserLoggedIn, auth, googleAuth } = useSelector(
    (state: AppState) => state.auth
  );
  const { comments, reloadComments } = useSelector(
    (state: AppState) => state.comments
  );

  useEffect(() => {
    dispatch(getPostAction());
    dispatch(getCommentsAction());
  }, [dispatch, reloadPage, reloadComments]);

  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [addCommentInput, setAddCommentInput] = useState<string>("");
  const [commentId, setCommentId] = useState<string | null>(null);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showCommentError, setShowCommentError] = useState(false);

  //Add post
  const [postTitle, setPostTitle] = useState<string>("");
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  const inputValidation = useCallback(() => {
    let errors = {
      postTitle: "",
      postBody: "",
      comment: "",
    };
    if (!postTitle) {
      errors.postTitle = noMessageTitleError;
    }
    if (!textAreaValue) {
      errors.postBody = noMessageError;
    }
    if (!addCommentInput) {
      errors.comment = noCommentError;
    }
    return errors;
  }, [
    postTitle,
    textAreaValue,
    addCommentInput,
    noMessageTitleError,
    noMessageError,
    noCommentError,
  ]);

  const onPostTitleInput = useCallback(
    (e) => {
      setPostTitle(e.target.value);
    },
    [setPostTitle]
  );

  const onTextInput = useCallback(
    (e) => {
      setTextAreaValue(e.target.value);
    },
    [setTextAreaValue]
  );

  const clearPost = useCallback(() => {
    setPostTitle("");
    setTextAreaValue("");
  }, [setTextAreaValue]);

  const submitPost = useCallback(() => {
    !inputValidation().postTitle &&
      !inputValidation().postBody &&
      dispatch(
        addPostsAction({
          message: textAreaValue,
          title: postTitle,
          postedBy: auth?.result.username! || googleAuth?.result.name,
        })
      );
    clearPost();
    inputValidation().postBody || inputValidation().postTitle
      ? setShowErrorMessage(true)
      : setShowErrorMessage(false);
  }, [
    dispatch,
    textAreaValue,
    postTitle,
    auth,
    clearPost,
    inputValidation,
    googleAuth,
  ]);

  //Edit post
  const [editPostTitle, setEditPostTitle] = useState<string>("");
  const [editTextAreaValue, setEditTextAreaValue] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [showDeleteCommentModal, setShowDeleteCommentModal] =
    useState<boolean>(false);
  const [showDeletePostModal, setShowDeletePostModal] =
    useState<boolean>(false);

  const onEditPostTitle = useCallback(
    (e) => {
      if (currentPostId) setEditPostTitle(e.target.value);
    },
    [setEditPostTitle, currentPostId]
  );
  const onEditPostText = useCallback(
    (e) => {
      currentPostId && setEditTextAreaValue(e.target.value);
    },
    [setEditTextAreaValue, currentPostId]
  );

  const editPost = () => {
    currentPostId &&
      dispatch(
        updatePostAction(currentPostId, {
          message: editTextAreaValue,
          title: editPostTitle,
        })
      );
    setIsEdit(false);
  };

  //Delete post
  const deletePost = () => {
    dispatch(deletePostAction(currentPostId!));
    setIsEdit(false);
  };

  //Add comment
  const onCommentInput = useCallback(
    (e) => {
      comments &&
        comments.filter((comment) => comment.commentToPostId) &&
        setAddCommentInput(e.target.value);
    },
    [comments, setAddCommentInput]
  );

  const addComment = () => {
    !inputValidation().comment &&
      dispatch(
        addCommentAction({
          comment: addCommentInput,
          commentToPostId: currentPostId!,
          commenterUserId: auth?.result._id || googleAuth?.result.googleId,
          commenter: auth?.result.username || googleAuth?.result.name,
        })
      );
    dispatch(getCommentsAction());
    inputValidation().comment
      ? setShowCommentError(true)
      : setShowCommentError(false);
    setAddCommentInput("");
  };

  const deleteComment = () => {
    dispatch(deleteCommentAction(commentId!));
  };

  return (
    <NewsFeedLayout
      messageBoard={
        <>
          <Text
            fontType="font-weight-normal"
            heading="h2"
            textColor="text-dark"
          >
            {newsFeedTitle}
          </Text>
          <LoadingSpinner isLoading={isPostsLoading}>
            {posts &&
              posts!.map((post) => {
                return (
                  <Card
                    cardTitle={!isEdit ? post.title : ""}
                    key={post._id}
                    className="mt-3"
                  >
                    <DisplayMessageLayout
                      content={
                        isEdit && currentPostId === post._id ? (
                          <>
                            <Input
                              type="text"
                              className="mb-3"
                              inputValue={editPostTitle}
                              placeholder={editTitlePlaceholder}
                              onChange={onEditPostTitle}
                            />
                            <TextArea
                              rows={6}
                              placeholder={editMessagePlaceholder}
                              onChange={onEditPostText}
                              textValue={editTextAreaValue}
                            />
                          </>
                        ) : (
                          <Text
                            fontType="font-weight-normal"
                            textColor="text-dark"
                          >
                            {post.message}
                          </Text>
                        )
                      }
                      username={
                        !isEdit && (
                          <Text
                            fontType="font-weight-normal"
                            textColor="text-dark"
                          >
                            {`Posted by: ${
                              post?.creatorId !== auth?.result._id ||
                              googleAuth?.result.googleId
                                ? post.postedBy
                                : "Me"
                            }`}
                          </Text>
                        )
                      }
                      deleteButton={
                        isEdit &&
                        currentPostId === post._id && (
                          <Button
                            buttonType="btn-outline-dark"
                            size="btn-sm"
                            onClick={() => {
                              setCurrentPostId(post._id!);
                              setShowDeletePostModal(true);
                            }}
                          >
                            {deleteText}
                          </Button>
                        )
                      }
                      cancelButton={
                        isEdit &&
                        currentPostId === post._id && (
                          <Button
                            buttonType="btn-outline-dark"
                            size="btn-sm"
                            onClick={() => setIsEdit(false)}
                          >
                            {cancelText}
                          </Button>
                        )
                      }
                      editButton={
                        (auth?.result._id === post.creatorId ) ||
                        (googleAuth?.result.googleId === post.creatorId) &&
                          (!isEdit &&
                          isUserLoggedIn && (
                            <Button
                              buttonType="btn-outline-primary"
                              size="btn-sm"
                              onClick={() => {
                                setCurrentPostId(post._id!);
                                setEditPostTitle(post.title!);
                                setEditTextAreaValue(post.message!);
                                setIsEdit(true);
                              }}
                            >
                              {editText}
                            </Button>
                          ))
                      }
                      commentButton={
                        isUserLoggedIn &&
                        !isComment && (
                          <Button
                            buttonType="btn-outline-primary"
                            size="btn-sm"
                            onClick={() => {
                              setCurrentPostId(post._id!);
                              setIsComment(true);
                            }}
                          >
                            {commentText}
                          </Button>
                        )
                      }
                      commentInput={
                        isComment &&
                        currentPostId === post._id &&
                        isUserLoggedIn && (
                          <>
                            <Input
                              type="text"
                              className="mb-3"
                              inputValue={addCommentInput}
                              placeholder={commentText}
                              onChange={onCommentInput}
                            />
                            {showCommentError && (
                              <ErrorField
                                errorMessage={inputValidation().comment}
                              />
                            )}
                          </>
                        )
                      }
                      addCommentButton={
                        isComment &&
                        currentPostId === post._id &&
                        isUserLoggedIn && (
                          <div className="d-flex align-items-center justify-content-around">
                            <Button
                              buttonType="btn-outline-primary"
                              size="btn-sm"
                              onClick={() => {
                                addComment();
                              }}
                            >
                              {addCommentText}
                            </Button>
                            <Button
                              buttonType="btn-outline-secondary"
                              size="btn-sm"
                              onClick={() => {
                                setIsComment(false);
                              }}
                            >
                              {cancelText}
                            </Button>
                          </div>
                        )
                      }
                      commentTitle={
                        <Text fontType="font-weight-normal" heading="h6">
                          {commentsTitle}
                        </Text>
                      }
                      commentArea={
                        comments.length ? (
                          comments.map((comment) => {
                            return (
                              comment.commentToPostId === post._id && (
                                <div key={comment._id}>
                                  <Text fontType="font-weight-bold">
                                    {comment.commenter + ": "}
                                  </Text>
                                  <Text fontType="font-weight-normal">
                                    {comment.comment}
                                  </Text>
                                  {auth?.result._id ===
                                    comment.commenterUserId ||
                                    (googleAuth?.result.googleId ===
                                      comment.commenterUserId && (
                                      <Button
                                        buttonType="btn-link"
                                        size="btn-sm"
                                        onClick={() => {
                                          setCommentId(comment._id!);
                                          setShowDeleteCommentModal(true);
                                        }}
                                      >
                                        {deleteText}
                                      </Button>
                                    ))}
                                </div>
                              )
                            );
                          })
                        ) : (
                          <Text fontType="font-weight-normal">
                            {noCommentText}
                          </Text>
                        )
                      }
                      saveButton={
                        isEdit &&
                        currentPostId === post._id && (
                          <Button
                            buttonType="btn-primary"
                            size="btn-sm"
                            onClick={() => {
                              editPost();
                            }}
                          >
                            {saveText}
                          </Button>
                        )
                      }
                    />
                  </Card>
                );
              })}
            {
              <Modal
                show={showDeleteCommentModal}
                onHide={() => setShowDeleteCommentModal(false)}
              >
                <Modal.Title className="p-3">{deleteCommentText}</Modal.Title>
                <Modal.Body>
                  <Text fontType="font-weight-normal">
                    {confirmDeleteCommentText}
                  </Text>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    buttonType="btn-outline-primary"
                    onClick={() => setShowDeleteCommentModal(false)}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    buttonType="btn-primary"
                    onClick={() => {
                      deleteComment();
                      setShowDeleteCommentModal(false);
                    }}
                  >
                    {deleteText}
                  </Button>
                </Modal.Footer>
              </Modal>
            }
            {
              <Modal
                show={showDeletePostModal}
                onHide={() => setShowDeletePostModal(false)}
              >
                <Modal.Title className="p-3">{deletePostText}</Modal.Title>
                <Modal.Body>
                  <Text fontType="font-weight-normal">
                    {confirmDeletePostText}
                  </Text>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    buttonType="btn-outline-primary"
                    onClick={() => setShowDeletePostModal(false)}
                  >
                    {cancelText}
                  </Button>
                  <Button
                    buttonType="btn-primary"
                    onClick={() => {
                      deletePost();
                      setShowDeletePostModal(false);
                    }}
                  >
                    {deleteText}
                  </Button>
                </Modal.Footer>
              </Modal>
            }
          </LoadingSpinner>
        </>
      }
      postMessage={
        <Card cardTitle={isUserLoggedIn ? createPostTitle : pleaseLoginText}>
          <PostMessageLayout
            messageTitle={
              <>
                <Input
                  type="text"
                  onChange={onPostTitleInput}
                  inputValue={postTitle!}
                  className="mt-1"
                  placeholder={titlePlaceholder}
                  disabled={!isUserLoggedIn}
                />
                {showErrorMessage && (
                  <ErrorField errorMessage={inputValidation().postTitle} />
                )}
              </>
            }
            message={
              <>
                <TextArea
                  rows={6}
                  onChange={onTextInput}
                  textValue={textAreaValue!}
                  required
                  className="mt-3"
                  placeholder={postMessagePlaceholder}
                  disabled={!isUserLoggedIn}
                />
                {showErrorMessage && (
                  <ErrorField errorMessage={inputValidation().postBody} />
                )}
              </>
            }
            submitButton={
              <Button
                buttonType="btn-primary"
                width="w-100"
                onClick={() => {
                  inputValidation() && submitPost();
                }}
                disabled={!isUserLoggedIn}
                isLoading={isPostsLoading}
              >
                {postText}
              </Button>
            }
            clearButton={
              <Button
                buttonType="btn-secondary"
                width="w-100"
                onClick={() => clearPost()}
                disabled={!isUserLoggedIn}
              >
                {clearText}
              </Button>
            }
          />
        </Card>
      }
    />
  );
};

export default NewsFeedScreen;
