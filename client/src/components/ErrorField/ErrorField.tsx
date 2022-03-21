import { FC } from "react";
import Text from "../Text/Text";

interface Props {
  errorMessage: string;
  className?: string;
}

export const ErrorField: FC<Props> = ({ errorMessage, className }) => (
  <Text
    fontType="font-weight-normal"
    textColor="text-danger"
    className={className}
  >
    {errorMessage}
  </Text>
);
