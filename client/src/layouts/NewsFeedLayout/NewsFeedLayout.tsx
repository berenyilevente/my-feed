import { FC, ReactNode } from "react";

interface Props {
  messageBoard?: ReactNode;
  postMessage?: ReactNode;
}

const NewsFeedLayout: FC<Props> = ({ messageBoard, postMessage }) => (
  <div className="row">
    <div className="col-md-4 col-12">{postMessage}</div>
    <div className="col-md-8 col-12 mt-md-0 mt-4 mb-5">
      <div className="container d-flex flex-wrap overflow-auto h-50">{messageBoard}</div>
    </div>
  </div>
);

export default NewsFeedLayout;
