import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import zh from "./zh";
import thai from "./thai";

const savedLang = localStorage.getItem("lang") || "en";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
            thai: { translation: thai },
        },
        lng: savedLang,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;