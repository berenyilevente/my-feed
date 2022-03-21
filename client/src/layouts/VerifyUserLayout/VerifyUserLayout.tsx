import { FC, ReactNode } from "react";

interface Props {
  title?: ReactNode;
  text?: ReactNode;
  button?: ReactNode;
}

const VerifyUserLayout: FC<Props> = ({ title,
    text,
    button }) => (
  <div className="container">
    <div className="row pb-2">
      <div className="col-12">{title}</div>
    </div>
    <div className="row pb-4">
      <div className="col-12">{text}</div>
    </div>
    <div className="row">
    <div className="col-12">{button}</div>
    </div>
  </div>
);

export default VerifyUserLayout;
