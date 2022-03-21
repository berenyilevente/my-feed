import Text from "../../components/Text/Text";
import pageURLS from "../../constants/pageURLS";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Input from "../../components/Input/Input";
import {
  googleAuthAction,
  registerUserAction,
} from "../../redux/authentication/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import { AppState } from "@/redux/store";
import { ErrorField } from "../../components/ErrorField/ErrorField";
import { useTranslation } from "react-i18next";

const AuthScreen = () => {
  const { t } = useTranslation();

  const loginText = t("authScreen.loginText");
  const signUpText = t("authScreen.signUpText");
  const registerText = t("authScreen.registerText");
  const usernamePlaceholder = t("authScreen.usernamePlaceholder");
  const emailPlaceholder = t("authScreen.emailPlaceholder");
  const passwordPlaceholder = t("authScreen.passwordPlaceholder");
  const confirmPasswordPlaceholder = t("authScreen.confirmPasswordPlaceholder");
  const haveAccountText = t("authScreen.haveAccountText");
  const signInGoogleText = t("authScreen.signInGoogleText");
  const googleText = t("authScreen.googleText");

  const userAlreadyExists = t("errorMessages.userAlreadyExists");
  const passwordsDontMatch = t("errorMessages.passwordsDontMatch");
  const invalidEmailText = t("errorMessages.invalidEmailText");
  const usernameRequiredText = t("errorMessages.usernameRequiredText");
  const passwordRequiredText = t("errorMessages.passwordRequiredText");
  const emailRequiredText = t("errorMessages.emailRequiredText");
  const passwordLengthError = t("errorMessages.passwordLengthError");
  const confirmPasswordText = t("errorMessages.confirmPasswordText");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userNameInput, setUserNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { errorMessage, isAuthLoading } = useSelector(
    (state: AppState) => state.auth
  );

  const onNameInput = useCallback(
    (e) => {
      setUserNameInput(e.target.value);
    },
    [setUserNameInput]
  );
  const onEmailInput = useCallback(
    (e) => {
      setEmailInput(e.target.value);
    },
    [setEmailInput]
  );

  const onPasswordInput = useCallback(
    (e) => {
      setPasswordInput(e.target.value);
    },
    [setPasswordInput]
  );

  const onConfirmPasswordInput = useCallback(
    (e) => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword]
  );

  const goToLoginScreen = useCallback(
    () => navigate(pageURLS.LOGIN),
    [navigate]
  );

  const googleSuccess = useCallback(
    async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;
      try {
        dispatch(googleAuthAction({ result: result, token: token }));
        navigate(pageURLS.HOME);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, navigate]
  );

  const googleFailure = () => {
    console.log("Sign in unsuccessful...");
  };

  const onSubmitSignUp = () => {
    !validateAuthInfo().username &&
      !validateAuthInfo().email &&
      !validateAuthInfo().password &&
      !validateAuthInfo().confirmPassword &&
      dispatch(
        registerUserAction(
          {
            username: userNameInput,
            email: emailInput,
            password: passwordInput,
            confirmPassword: confirmPassword,
          },
          navigate
        )
      );
    setShowErrorMessage(true);
  };

  const validateAuthInfo = () => {
    let errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!userNameInput.trim()) {
      errors.username = usernameRequiredText;
    }
    if (!emailInput.trim()) {
      errors.email = emailRequiredText;
    } else if (!/\S+@\S+\.\S+/.test(emailInput)) {
      errors.email = invalidEmailText;
    }
    if (!passwordInput.trim()) {
      errors.password = passwordRequiredText;
    } else if (passwordInput.length < 8) {
      errors.password = passwordLengthError;
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = confirmPasswordText;
    } else if (passwordInput !== confirmPassword) {
      errors.confirmPassword = passwordsDontMatch;
    }

    return errors;
  };

  return (
    <AuthLayout
      title={
        <Text fontType="font-weight-bold" heading="h3">
          {registerText}
        </Text>
      }
      usernameField={
        <>
          <Input
            type="text"
            onChange={onNameInput}
            inputValue={userNameInput!}
            className="mt-1"
            placeholder={usernamePlaceholder}
          />
          {showErrorMessage && (
            <ErrorField errorMessage={validateAuthInfo().username} />
          )}
        </>
      }
      emailField={
        <>
          <Input
            type="email"
            onChange={onEmailInput}
            inputValue={emailInput!}
            className="mt-1"
            placeholder={emailPlaceholder}
          />
          {showErrorMessage && (
            <ErrorField errorMessage={validateAuthInfo().email} />
          )}
        </>
      }
      passwordField={
        <>
          <Input
            type="password"
            onChange={onPasswordInput}
            inputValue={passwordInput!}
            className="mt-1"
            placeholder={passwordPlaceholder}
          />
          {showErrorMessage && (
            <ErrorField errorMessage={validateAuthInfo().password} />
          )}
        </>
      }
      confirmPasswordField={
        <>
          <Input
            type="password"
            onChange={onConfirmPasswordInput}
            inputValue={confirmPassword!}
            className="mt-1"
            placeholder={confirmPasswordPlaceholder}
          />
          {showErrorMessage && (
            <ErrorField errorMessage={validateAuthInfo().confirmPassword} />
          )}
        </>
      }
      signUpButton={
        <Button
          buttonType="btn-primary"
          size="btn-xs"
          onClick={onSubmitSignUp}
          isLoading={isAuthLoading}
        >
          {signUpText}
        </Button>
      }
      errorMessage={
        (errorMessage?.indexOf("409")! > -1 && (
          <ErrorField errorMessage={userAlreadyExists} />
        )) ||
        (errorMessage?.indexOf("412")! > -1 && (
          <ErrorField errorMessage={passwordsDontMatch} />
        ))
      }
      helperButton={
        <>
          <Text fontType="font-weight-normal">{haveAccountText}</Text>
          <Button
            buttonType="btn-link"
            className="text-decoration-none"
            size="btn-xs"
            onClick={goToLoginScreen}
          >
            {loginText}
          </Button>
        </>
      }
      googleButton={
        <>
          <Text fontType="font-weight-normal">{signInGoogleText}</Text>
          <GoogleLogin
            clientId="930675215261-4e8pa6ucumjfjv65mb65sr0rhj00leun.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                buttonType="btn-link"
                className="text-decoration-none"
                size="btn-xs"
                onClick={renderProps.onClick}
              >
                {googleText}
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </>
      }
    />
  );
};

export default AuthScreen;
