import { FC, ReactNode } from "react";

interface Props {
  navigation?: ReactNode;
}

const SiteLayout: FC<Props> = ({ navigation, children }) => (
  <div className="container h-100">
    <div className="row">
      <div className="col-12">{navigation}</div>
    </div>
    <div className="row">
      <div className="col-12">{children}</div>
    </div>
  </div>
);

export default SiteLayout;
