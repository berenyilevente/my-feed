import { FC, ReactNode } from "react";

interface Props {
  title?: ReactNode;
  text?: ReactNode;
  button?: ReactNode;
}

const CallToActionConfirmLayout: FC<Props> = ({ title,
    text, button }) => (
  <div className="container">
    <div className="row">
      <div className="col-12">{title}</div>
    </div>
    <div className="row">
      <div className="col-12">{text}</div>
    </div>
    <div className="row">
      <div className="col-12">{button}</div>
    </div>
  </div>
);

export default CallToActionConfirmLayout;
