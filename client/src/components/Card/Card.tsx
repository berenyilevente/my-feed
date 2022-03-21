import { FC } from "react";

interface Props {
  cardTitle?: string;
  width?: "w-25" | "w-50" | "w-75" | "w-100";
  className?: string;
}

const Card: FC<Props> = ({ children, cardTitle, width, className }) => (
  <div className={width + " " + className}>
    <div className="card">
      <div className="card-body">
        <h5 className="card-text">{cardTitle}</h5>
        <div className="card-text">{children}</div>
      </div>
    </div>
  </div>
);

export default Card;
