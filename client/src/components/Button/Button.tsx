import { FC, MouseEventHandler } from "react";

type buttonTypeMap =
  | "btn-primary"
  | "btn-secondary"
  | "btn-success"
  | "btn-danger"
  | "btn-dark"
  | "btn-link"
  | "btn-outline-primary"
  | "btn-outline-secondary"
  | "btn-outline-success"
  | "btn-outline-danger"
  | "btn-outline-dark"
  | "btn-outline-link";

interface Props {
  buttonType: buttonTypeMap;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: "w-25" | "w-50" | "w-75" | "w-100";
  className?: string;
  size?: "btn-lg" | "btn-sm" | "btn-xs" | "btn-block";
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<Props> = ({
  buttonType,
  children,
  onClick,
  width,
  className,
  size,
  disabled,
  isLoading,
}) => (
  <button
    type="button"
    className={"btn " + buttonType + " " + width + " " + className + " " + size}
    onClick={onClick}
    disabled={disabled}
  >
    {isLoading ? (
      <div
        className="spinner-border spinner-border-sm mx-2 text-light"
        role="status"
      />
    ) : (
      children
    )}
  </button>
);

export default Button;
