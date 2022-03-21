import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TextArea from "../../components/TextArea/TextArea";
import DisplayMessageLayout from "../../layouts/DisplayMessageLayout/DisplayMessageLayout";
import {
  deletePostAction,
  getPostAction,
  updatePostAction,
} from "../../redux/posts/posts.actions";
import { AppState } from "../../redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileLayout from "../../layouts/ProfileLayout/ProfileLayout";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import pageURLS from "../../constants/pageURLS";
import { useNavigate } from "react-router";
import { editProfileAction } from "../../redux/authentication/auth.actions";
import {
  addCommentAction,
  deleteCommentAction,
  getCommentsAction,
} from "../../redux/comments/comment.actions";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const usernamePlaceholder = t("authScreen.usernamePlaceholder");
  const cancelText = t("newsFeedScreen.cancelText");
  const editText = t("newsFeedScreen.editText");
  const deleteText = t("newsFeedScreen.deleteText");
  const saveText = t("newsFeedScreen.saveText");
  const editTitlePlaceholder = t("newsFeedScreen.editTitlePlaceholder");
  const editMessagePlaceholder = t("newsFeedScreen.editMessagePlaceholder");
  const myPostsText = t("profileScreen.myPostsText");
  const profileDetailsText = t("profileScreen.profileDetailsText");
  const editProfileText = t("profileScreen.editProfileText");
  const noPostsText = t("profileScreen.noPostsText");
  const addPostsNowText = t("profileScreen.addPostsNowText");
  const addCommentText = t("newsFeedScreen.addCommentText");
  const commentText = t("newsFeedScreen.commentText");
  const commentsTitle = t("newsFeedScreen.commentsTitle");
  const noCommentText = t("newsFeedScreen.noCommentText");
  const confirmDeletePostText = t("newsFeedScreen.confirmDeletePostText");
  const confirmDeleteCommentText = t("newsFeedScreen.confirmDeleteCommentText");
  const deleteCommentText = t("newsFeedScreen.deleteCommentText");
  const deletePostText = t("newsFeedScreen.deletePostText");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPostsLoading } = useSelector((state: AppState) => state.posts);
  const { isAuthLoading, auth, googleAuth } = useSelector(
    (state: AppState) => state.auth
  );
  const { comments, isCommentsLoading } = useSelector(
    (state: AppState) => state.comments
  );
  const isUserLoggedIn = useSelector(
    (state: AppState) => state.auth.isUserLoggedIn
  );
  const showPostsForProfile = useSelector((state: AppState) =>
    auth || googleAuth
      ? state.posts.posts.filter(
          (item) =>
            item.creatorId === auth?.result._id ||
            item.creatorId === googleAuth?.result.googleId
        )
      : null
  );

  useEffect(() => {
    dispatch(getPostAction());
  }, [dispatch]);

  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [editPostTitle, setEditPostTitle] = useState<string>("");
  const [editTextAreaValue, setEditTextAreaValue] = useState<string>("");
  const [editUsername, setEditUsername] = useState<string>("");
  const [addCommentInput, setAddCommentInput] = useState<string>("");

  const goToNewsFeed = useCallback(() => navigate(pageURLS.HOME), [navigate]);

  const deletePost = () => {
    dispatch(deletePostAction(currentPostId!));
    setIsEdit(false);
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);

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

  useEffect(() => {
    dispatch(getCommentsAction());
  }, [dispatch]);

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

  const editProfile = () => {
    dispatch(
      editProfileAction(auth?.result._id!, {
        username: editUsername,
      })
    );
    setIsEditProfile(false);
  };

  const onEditUsername = useCallback(
    (e) => {
      setEditUsername(e.target.value);
    },
    [setEditUsername]
  );

  const [commentId, setCommentId] = useState<string | null>(null);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] =
    useState<boolean>(false);
  const [showDeletePostModal, setShowDeletePostModal] =
    useState<boolean>(false);

  const addComment = () => {
    dispatch(
      addCommentAction({
        comment: addCommentInput,
        commentToPostId: currentPostId!,
        commenterUserId: auth?.result._id || googleAuth?.result.googleId,
        commenter: auth?.result.username || googleAuth?.result.name,
      })
    );
    dispatch(getCommentsAction());
    setAddCommentInput("");
  };

  const deleteComment = () => {
    dispatch(deleteCommentAction(commentId!));
  };

  const commentInputValidation = () => {
    let isValid = true;
    if (!addCommentInput) {
      isValid = false;
      alert("Please add a comment!");
    }
    return isValid;
  };

  const onCommentInput = useCallback(
    (e) => {
      comments &&
        comments.filter((comment) => comment.commentToPostId) &&
        setAddCommentInput(e.target.value);
    },
    [comments, setAddCommentInput]
  );



  return (
    <ProfileLayout
      profileDetails={
        <Card cardTitle={profileDetailsText}>
          {isEditProfile ? (
            <>
              <Text fontType="font-weight-normal">
                {usernamePlaceholder + ": "}
              </Text>
              <Input
                type="text"
                onChange={onEditUsername}
                inputValue={editUsername}
              />
              <Button
                buttonType="btn-outline-primary"
                className="d-flex justify-content-end mt-3"
                size="btn-sm"
                onClick={editProfile}
              >
                {saveText}
              </Button>
            </>
          ) : (
            <LoadingSpinner isLoading={isAuthLoading}>
              <Text fontType="font-weight-normal">
                {usernamePlaceholder + ": "}
              </Text>

              <Text fontType="font-weight-normal">
                {auth?.result.username || googleAuth?.result.name}
              </Text>
              <Button
                buttonType="btn-outline-primary"
                className="d-flex justify-content-end mt-3"
                size="btn-sm"
                onClick={() => {
                  setIsEditProfile(true);
                }}
              >
                {editProfileText}
              </Button>
            </LoadingSpinner>
          )}
        </Card>
      }
      title={
        <Text fontType="font-weight-normal" heading="h2">
          {myPostsText}
        </Text>
      }
      messages={
        <LoadingSpinner isLoading={isPostsLoading}>
          {showPostsForProfile?.length ? (
            showPostsForProfile!.map((post) => {
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
                            textValue={editTextAreaValue}
                            onChange={onEditPostText}
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
                      <Text fontType="font-weight-normal" textColor="text-dark">
                        {`Posted by: ${post.postedBy}`}
                      </Text>
                    }
                    deleteButton={
                      isEdit && (
                        <Button
                          buttonType="btn-outline-dark"
                          size="btn-sm"
                          onClick={() => {
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
                      auth?.result._id === post.creatorId ||
                      (googleAuth?.result.googleId === post.creatorId &&
                        !isEdit && (
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
                        <Input
                          type="text"
                          className="mb-3"
                          inputValue={addCommentInput}
                          placeholder={commentText}
                          onChange={onCommentInput}
                        />
                      )
                    }
                    addCommentButton={
                      isComment &&
                      currentPostId === post._id &&
                      isUserLoggedIn && (
                        <div className="d-flex flex-wrap justify-content-center">
                          <Button
                            buttonType="btn-outline-primary"
                            size="btn-sm"
                            onClick={() => {
                              commentInputValidation() && addComment();
                            }}
                          >
                            {addCommentText}
                          </Button>
                          <Button
                            buttonType="btn-outline-primary"
                            size="btn-sm"
                            onClick={() => {
                              setIsComment(false);
                            }}
                            className="mt-2"
                          >
                            {cancelText}
                          </Button>
                        </div>
                      )
                    }
                    commentTitle={
                      <Text fontType="font-weight-normal" heading="h5">
                        {commentsTitle}
                      </Text>
                    }
                    commentArea={
                      comments.length ? (
                        comments &&
                        comments.map((comment) => {
                          return (
                            comment.commentToPostId === post._id && (
                              <div key={comment._id}>
                                <LoadingSpinner isLoading={isCommentsLoading}>
                                  <Text
                                    fontType="font-weight-normal"
                                    heading="h6"
                                  >
                                    {comment.commenter + ": "}
                                  </Text>
                                  <Text fontType="font-weight-normal">
                                    {comment.comment}
                                  </Text>
                                </LoadingSpinner>
                                {auth?.result._id === comment.commenterUserId ||
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
            })
          ) : (
            <div className="d-flex align-items-center">
              <Text fontType="font-weight-normal">{noPostsText}</Text>
              <Button
                buttonType="btn-link"
                className="text-decoration-none"
                size="btn-xs"
                onClick={goToNewsFeed}
              >
                {addPostsNowText}
              </Button>
            </div>
          )}
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
      }
    />
  );
};

export default ProfileScreen;
