import { ChangeEventHandler, FC } from "react";

interface Props {
  className?: string;
  rows: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  textValue?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const TextArea: FC<Props> = ({
  className,
  rows,
  onChange,
  textValue,
  required,
  placeholder,
  disabled,
}) => (
  <textarea
    className={"form-control " + className}
    rows={rows}
    onChange={onChange}
    value={textValue}
    required={required}
    placeholder={placeholder}
    disabled={disabled}
  />
);

export default TextArea;
