import { createContext, useContext, useEffect, useReducer} from "react";
import appReducer from "./app-reducer";
import { useTranslation } from "react-i18next";

// قدم اول ایجاد کانتکست است
// کانتکست یک مکانیزم است که به ما اجازه می‌دهد تا داده‌ها را در درخت کامپوننت‌ها به اشتراک بگذاریم
const AppContext = createContext();

// لوکال استوریج رو تنظیم کردیم که مقدار اولیه فارسی دارد
const initialState = {
    language: localStorage.getItem('language') || 'fa',
    theme: localStorage.getItem('theme') || 'light',
    showSidebar: true
};

//پروایدر درست کردیم
const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, initialState);
    const {i18n} = useTranslation();

    // این تابع برای تغییر زبان است
    const changeLanguage = (language) => {
        dispatch({ type: 'CHANGE_LANGUAGE', payload: language });
    }

    const changeTheme = (theme) => {
        dispatch({type: 'CHANGE_THEME', payload: theme});
    }

    const toggleSidebar = () => {
        dispatch({type: 'TOGGLE_SIDEBAR'});
    }

    useEffect(() => { 
        // زبان را تغییر می‌دهیم
        i18n.changeLanguage(state.language);
        localStorage.setItem('language', state.language);
        // تغییر جهت صفحه
        document.body.dataset.direction = state.language === 'fa' ? 'rtl' : 'ltr';
        // تغییر جهت سایدبار
        document.body.dataset.sidebarPosition = state.language === 'fa' ? 'right' : 'left';
    }, [state.language]);

    useEffect(() => {
        localStorage.setItem('theme', state.theme);
    }, [state.theme]);

    return <AppContext.Provider value={{ ...state, changeLanguage, changeTheme, toggleSidebar }}>
        {children}
    </AppContext.Provider>
}

// اینجا کانتکست را به کامپوننت‌ها می‌دهیم
// این تابع به ما اجازه می‌دهد تا به کانتکست دسترسی پیدا کنیم
// این یک هوک سفارشی ساخته شده توسط خودمان است
const useAppContext = () => {
    // useContext یک هوک است که به ما اجازه می‌دهد تا به کانتکست دسترسی پیدا کنیم
    // و مقدار آن را دریافت کنیم
    return useContext(AppContext);
}
// دو مورد را باهم اکسپورت کردیم
export { useAppContext, AppProvider };