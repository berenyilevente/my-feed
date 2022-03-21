import { FC, ReactNode } from "react";

interface Props {
  title?: ReactNode;
  profileDetails?: ReactNode;
  messages?: ReactNode;
  profileDetailsTitle?: ReactNode;
}

const ProfileLayout: FC<Props> = ({
  title,
  messages,
  profileDetails,
  profileDetailsTitle,
}) => (
  <div className="row">
    <div className="col-12">{profileDetailsTitle}</div>
    <div className="col-12">{profileDetails}</div>
    <div className="col-12 mt-3">{title}</div>
    <div className="col-12">{messages}</div>
  </div>
);

export default ProfileLayout;
