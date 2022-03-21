import Text from "../../components/Text/Text";
import CallToActionConfirmLayout from "../../layouts/VerifyUserLayout/CallToActionConfirmLayout";
import { useTranslation } from "react-i18next";

const ConfirmUserScreen = () => {
  const { t } = useTranslation();
  const confirmEmailTitle = t("authScreen.confirmEmailTitle");
  const confirmationText = t("authScreen.confirmationText");

  return (
    <CallToActionConfirmLayout
      title={
        <Text fontType="font-weight-normal" heading="h4">
          {confirmEmailTitle}
        </Text>
      }
      text={<Text fontType="font-weight-normal">{confirmationText}</Text>}
    />
  );
};
export default ConfirmUserScreen;
