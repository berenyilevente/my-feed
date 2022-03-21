import Text from "../../components/Text/Text";
import pageURLS from "../../constants/pageURLS";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Input from "../../components/Input/Input";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  googleAuthAction,
  loginAction,
} from "../../redux/authentication/auth.actions";
import { AppState } from "../../redux/store";
import { ErrorField } from "../../components/ErrorField/ErrorField";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const { t } = useTranslation();
  const loginText = t("authScreen.loginText");
  const signUpText = t("authScreen.signUpText");
  const emailPlaceholder = t("authScreen.emailPlaceholder");
  const passwordPlaceholder = t("authScreen.passwordPlaceholder");
  const needAccountText = t("authScreen.needAccountText");
  const signInGoogleText = t("authScreen.signInGoogleText");
  const googleText = t("authScreen.googleText");
  const userNotFound = t("errorMessages.userNotFound");
  const passwordIncorrect = t("errorMessages.passwordIncorrect");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthLoading, errorMessage } = useSelector(
    (state: AppState) => state.auth
  );

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

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

  const gotToRegisterScreen = useCallback(
    () => navigate(pageURLS.AUTH),
    [navigate]
  );

  //google auth
  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(googleAuthAction({ result: result, token: token }));
      navigate(pageURLS.HOME);
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };

  const googleFailure = (res: any) => {
    console.log(res);
  };

  const onSubmitLogin = () => {
    dispatch(
      loginAction(
        {
          email: emailInput,
          password: passwordInput,
        },
        navigate
      )
    );
  };

  return (
    <AuthLayout
      title={
        <Text fontType="font-weight-bold" heading="h3">
          {loginText}
        </Text>
      }
      emailField={
        <Input
          type="email"
          onChange={onEmailInput}
          inputValue={emailInput!}
          className="mt-1"
          placeholder={emailPlaceholder}
        />
      }
      passwordField={
        <Input
          type="password"
          onChange={onPasswordInput}
          inputValue={passwordInput!}
          className="mt-1"
          placeholder={passwordPlaceholder}
        />
      }
      signUpButton={
        <Button
          buttonType="btn-primary"
          size="btn-xs"
          onClick={onSubmitLogin}
          isLoading={isAuthLoading}
        >
          {loginText}
        </Button>
      }
      errorMessage={
        (errorMessage?.indexOf("404")! > -1 && (
          <ErrorField errorMessage={userNotFound} />
        )) ||
        (errorMessage?.indexOf("400")! > -1 && (
          <ErrorField errorMessage={passwordIncorrect} />
        ))
      }
      helperButton={
        <>
          <Text fontType="font-weight-normal">{needAccountText}</Text>
          <Button
            buttonType="btn-link"
            className="text-decoration-none"
            size="btn-xs"
            onClick={gotToRegisterScreen}
          >
            {signUpText}
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

export default LoginScreen;
