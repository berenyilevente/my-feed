import { FC, ReactNode } from "react";

interface Props {
  content?: ReactNode;
  editButton?: ReactNode;
  deleteButton?: ReactNode;
  cancelButton?: ReactNode;
  saveButton?: ReactNode;
  username?: ReactNode;
  addCommentButton?: ReactNode;
  commentInput?: ReactNode;
  commentArea?: ReactNode;
  commentTitle?: ReactNode;
  commentButton?: ReactNode;
}

const DisplayMessageLayout: FC<Props> = ({
  content,
  editButton,
  deleteButton,
  cancelButton,
  saveButton,
  username,
  addCommentButton,
  commentInput,
  commentArea,
  commentTitle,
  commentButton,
}) => (
  <div className="row ">
    <div className="col-12">{content}</div>
    <span className="border-bottom pt-0 pb-3" />
    <div className="row mt-3">
      <div className="col-8">{commentTitle}</div>
    </div>
    <div className="row mt-1">
      <div className="col-12">{commentArea}</div>
    </div>
    <div className="row mt-3">
      <div className="col-8">{commentButton}</div>
      <div className="col-sm-7 col-12">{commentInput}</div>
      <div className="col-sm-5 mt-1 text-nowrap">{addCommentButton}</div>
    </div>
    <span className="border-bottom pt-0 pb-3" />
    <div className="row mt-3 d-flex">
      <div className="col-4 d-flex justify-content-md-center">
        {cancelButton}
      </div>
      <div className="col-4 d-flex justify-content-md-center">
        {deleteButton}
      </div>
      <div className="col-4 d-flex justify-content-md-center">{saveButton}</div>
    </div>
    <div className="row mt-2">
      <div className="col-8 mt-2  text-nowrap">{username}</div>{" "}
      <div className="col-4 mt-2 d-flex justify-content-end">{editButton}</div>{" "}
    </div>
  </div>
);

export default DisplayMessageLayout;
