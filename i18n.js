import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // Add your configuration options here
  // For example, you can specify supported languages, translations, etc.
});

export default i18n;
