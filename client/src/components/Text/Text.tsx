import { FC } from "react";

type fontWeightMap =
  | "font-weight-bold"
  | "font-weight-normal"
  | "font-weight-light"
  | "small"
  | "text-muted";

type headingMap = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type colorMap =
  | "text-primary"
  | "text-secondary"
  | "text-danger"
  | "text-light"
  | "text-dark"
  | "text-info";

interface Props {
  fontType: fontWeightMap;
  heading?: headingMap;
  className?: string;
  textColor?: colorMap;
}

const Text: FC<Props> = ({
  fontType,
  children,
  textColor,
  className,
  heading,
}) => (
  <span
    className={fontType + " " + heading + " " + textColor + " " + className}
  >
    {children}
  </span>
);

export default Text;
