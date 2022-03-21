import { FC, ReactNode } from "react";

interface Props {
  title?: ReactNode;
  usernameField?: ReactNode;
  emailField?: ReactNode;
  passwordField?: ReactNode;
  confirmPasswordField?: ReactNode;
  signUpButton?: ReactNode;
  helperButton?: ReactNode;
  googleButton?: ReactNode;
  errorMessage?: ReactNode;
}

const AuthLayout: FC<Props> = ({
  title,
  usernameField,
  emailField,
  passwordField,
  confirmPasswordField,
  signUpButton,
  helperButton,
  googleButton,
  errorMessage,
}) => (
  <div className="container d-flex justify-content-center align-items-center">
    <div className="row">
      <div className="col-12">
        <div className="col-12 mt-3 mb-2">{title}</div>
        <div className="col-12">{usernameField}</div>
        <div className="col-12 mt-3">{emailField}</div>
        <div className="col-12 mt-3">{passwordField}</div>
        <div className="col-12 mt-3">{confirmPasswordField}</div>
        <div className="col-12 mt-3 d-flex justify-content-center">
          {signUpButton}
        </div>
        <div className="col-12 d-flex justify-content-center">
          {errorMessage}
        </div>
        <div className="col-12 mt-1 d-flex justify-content-center align-items-center">
          {helperButton}
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
          {googleButton}
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
