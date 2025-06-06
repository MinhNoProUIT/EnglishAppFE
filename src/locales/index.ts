import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enMessages from "../locales/en.json";
import viMessages from "../locales/vi.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
};

export const resources = {
  en: {
    common: enMessages,
  },
  vi: {
    common: viMessages,
  },
};

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  fallbackLng: ["vi", "en"],
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
    bindI18n: "languageChanged loaded",
  },
});
console.log("i18n init ready");

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

export default i18n;
