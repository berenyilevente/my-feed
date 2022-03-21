import NavigationLayout from "../../layouts/NavigationLayout/NavigationLayout";
import pageURLS from "../../constants/pageURLS";
import { useNavigate, useLocation } from "react-router";
import { useCallback, useEffect } from "react";
import Button from "../../components/Button/Button";
import { AppState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/authentication/auth.actions";
import decode from "jwt-decode";
import Logo from "../../components/SiteLogo/Logo";
import { useTranslation } from "react-i18next";

const NavigationScreen = () => {
  const { t } = useTranslation();

  const homeText = t("navigationScreen.homeText");
  const profileText = t("navigationScreen.profileText");
  const loginText = t("authScreen.loginText");
  const logoutText = t("authScreen.logoutText");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const goToNewsFeed = useCallback(() => navigate(pageURLS.HOME), [navigate]);
  const goToProfile = useCallback(() => navigate(pageURLS.PROFILE), [navigate]);
  const goToLoginScreen = useCallback(
    () => navigate(pageURLS.LOGIN),
    [navigate]
  );

  const { auth, googleAuth } = useSelector((state: AppState) => state.auth);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    navigate(pageURLS.HOME);
  }, [dispatch, navigate]);

  //Check if the token is expired
  useEffect(() => {
    const token =  auth?.token || googleAuth?.token;
    //decode the token to see when it is expiring
    if (token) {
      const decodedToken = decode<any>(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, []);

  const isUserLoggedIn = useSelector(
    (state: AppState) => state.auth.isUserLoggedIn
  );

  return (
    <NavigationLayout
      logo={
        <Logo onClick={goToNewsFeed} className="cursor-pointer text-primary" />
      }
      navigationItems={
        <>
          <Button
            onClick={goToNewsFeed}
            buttonType="btn-link"
            className="text-decoration-none"
          >
            {homeText}
          </Button>
          {isUserLoggedIn && (
            <Button
              onClick={goToProfile}
              buttonType="btn-link"
              className="text-decoration-none"
            >
              {profileText}
            </Button>
          )}
          {isUserLoggedIn && (
            <Button
              onClick={logout}
              buttonType="btn-link"
              className="text-decoration-none"
            >
              {logoutText}
            </Button>
          )}
          {!isUserLoggedIn && (
            <Button
              onClick={goToLoginScreen}
              buttonType="btn-link"
              className="text-decoration-none"
            >
              {loginText}
            </Button>
          )}
        </>
      }
    />
  );
};

export default NavigationScreen;
