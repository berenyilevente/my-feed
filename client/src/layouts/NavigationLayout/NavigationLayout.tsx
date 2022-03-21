import { FC, ReactNode } from "react";

interface Props {
  logo?: ReactNode;
  navigationItems?: ReactNode;
}

const NavigationLayout: FC<Props> = ({ logo, navigationItems }) => (
  <div className="row mt-md-3 mb-md-5 mb-4 d-flex align-items-center">
    <div className="col-md-9 col-12 mt-md-0 mt-3 d-flex justify-content-md-start justify-content-center ">
      {logo}
    </div>
    <div className="col-md-3 col-12 d-flex justify-content-md-end justify-content-center">
      {navigationItems}
    </div>
    <span className="border-bottom pt-md-0 pb-md-3 pb-2"></span>
  </div>
);

export default NavigationLayout;
