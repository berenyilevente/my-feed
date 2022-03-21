import { Route, Routes } from "react-router-dom";
import pageURLS from "../constants/pageURLS";
import SiteLayout from "../layouts/SiteLayout/SiteLayout";
import NavigationScreen from "../screens/NavigationScreen/NavigationScreen";
import NewsFeedScreen from "../screens/NewsFeedScreen/NewsFeedScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import ConfirmUserScreen from "../screens/ConfirmUserScreen/ConfirmUserScreen";
import CallToActionConfirmScreen from "../screens/ConfirmUserScreen/CallToActionConfirmScreen";

const RootRouter = () => {
  return (
    <SiteLayout
      navigation={<NavigationScreen />}
      children={
        <Routes>
          <Route path={pageURLS.HOME} element={<NewsFeedScreen />} />
          <Route path={pageURLS.PROFILE} element={<ProfileScreen />} />
          <Route path={pageURLS.AUTH} element={<AuthScreen />} />
          <Route path={pageURLS.LOGIN} element={<LoginScreen />} />
          <Route path={pageURLS.VERIFY_USER} element={<ConfirmUserScreen />} />
          <Route path={pageURLS.CONFIRM} element={<CallToActionConfirmScreen />} />
        </Routes>
      }
    />
  );
};

export default RootRouter;
