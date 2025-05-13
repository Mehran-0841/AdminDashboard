// هسته اصلی  کتابخانه آی هیجده نکست
import i18n from "i18next";
// کتابخانه ای برای بارگذاری فایل های ترجمه
import Backend from "i18next-http-backend";
// کتابخانه ای برای استفاده از آی هیجده نکست در ری اکت
import { initReactI18next } from "react-i18next";


i18n.use(Backend).use(initReactI18next).init({
    // زبان پیش فرض
    lng: "fa",
})

export default i18n;