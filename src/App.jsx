import { RouterProvider } from 'react-router-dom';
import router from './router';
// با این روش ایمپورت کل فایل آی هیجده ان رو وارد اپ می‌کنید 
import './core/i18n';
import { useAppContext } from './contexts/app/app-context';
import { useEffect } from 'react';



function App() {

  const {theme} = useAppContext();
  useEffect(() => {
    // دسترسی به تگ head و اضافه کردن لینک استایل
    // به صورت داینامیک
    // به تگ head
    const head = document.head;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/css/${theme}.css`;
    head.appendChild(link);

    return () => {head.removeChild(link)} // با تغییر تم، تم قبلی حذف میشه
    
  }, [theme]);
  return (
   <RouterProvider router={router} />
  )
}

export default App;

