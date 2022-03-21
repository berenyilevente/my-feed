import { FC, ReactNode } from "react";

interface Props {
  messageTitle?: ReactNode;
  message?: ReactNode;
  submitButton?: ReactNode;
  clearButton?: ReactNode;
}

const PostMessageLayout: FC<Props> = ({
  messageTitle,
  message,
  submitButton,
  clearButton,
}) => (
  <div className="row">
    <div className="col-12 d-flex flex-wrap">{messageTitle}</div>
    <div className="col-12 d-flex flex-wrap">{message}</div>
    <div className="col-6 mt-3 d-flex justify-content-center">
      {submitButton}
    </div>
    <div className="col-6 mt-3 d-flex justify-content-center">
      {clearButton}
    </div>
  </div>
);

export default PostMessageLayout;
