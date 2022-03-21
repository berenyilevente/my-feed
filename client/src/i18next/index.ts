import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales";
// the translations
const resources = {
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      resources,
      lng: "en",
      fallbackLng: "en",
      keySeparator: ".",
      interpolation: {
        escapeValue: false,
      },
    },
    () => i18n.language
  );

export default i18n;
