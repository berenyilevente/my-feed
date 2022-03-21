import URLS from "../../constants/pageURLS";
import { verifyUserAction } from "../../redux/authentication/auth.actions";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button";
import VerifyUserLayout from "../../layouts/VerifyUserLayout/VerifyUserLayout";
import { useTranslation } from "react-i18next";
import Text from "../../components/Text/Text";

const ConfirmUserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirmationCode = "" } = useParams();
  const { t } = useTranslation();
  const verifiedTitle = t("authScreen.verifiedTitle");
  const loginCTA = t("authScreen.loginCTA");
  const loginText = t("authScreen.loginText");

  const goToLoginScreen = () => {
    dispatch(verifyUserAction(confirmationCode));
    navigate(URLS.LOGIN);
  };

  return (
    <VerifyUserLayout
      title={
        <Text fontType="font-weight-normal" heading="h4">
          {verifiedTitle}
        </Text>
      }
      text={
        <Text fontType="font-weight-normal">
          {loginCTA}
        </Text>
      }
      button={
        <Button buttonType="btn-outline-secondary" onClick={goToLoginScreen}>
          {loginText}
        </Button>
      }
    />
  );
};
export default ConfirmUserScreen;
