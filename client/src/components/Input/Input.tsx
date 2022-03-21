import { ChangeEventHandler, FC } from "react";

interface Props {
  type: "email" | "password" | "checkbox" | "number" | "text";
  placeholder?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputValue?: string;
  disabled?: boolean;
}

const Input: FC<Props> = ({
  type,
  placeholder,
  className,
  onChange,
  inputValue,
  disabled,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    className={"form-control " + className}
    onChange={onChange}
    value={inputValue}
    disabled={disabled}
  />
);

export default Input;
