// عکس زبان انگلیسی و فارسی را با نام یوس فلگ و فافلگ ایمپورت کردیم
import usFlag from '@assets/images/us.png';
import faFlag from '@assets/images/fa.png';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../contexts/app/app-context';

const ChangeLangouage = () => {

    const [show, setShow] = useState(false);
    const ref = useRef();

    const { language, changeLanguage } = useAppContext();

    // بستن کادر انتخاب زبان
    useEffect(() => {
        setShow(false);
    }, [language]);


    useEffect(() => {

        const checkIfClickOutside = e => {
            // سه شرط باید ترو باشد تا بدنه ایف اجرا شود
            // اولی: منو باز باشه
            // دومی: المنتی که به آن ریف دادیم باید وجود داشته باشد
            // سومی: کلیک داخل منو نباشد بلکه خارج منو باشد
            // با کمک ریف دات کارنت به عنصر دام (دایو منو و بررسی کلیک شدن داخل یا خارج منو) دسترسی پیدا می‌کنیم 
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false);
            }
        }

        document.addEventListener('mousedown', checkIfClickOutside);
        return () => {
            // در هر بار نیاز است که ایونت قبلی ریمو شود 
            // چون اگر این کار انجام نشود در هر بار شواستیت، یک ایونت ایجاد می‌شود و قبلی هم باقی مانده است و یکجا جمع می شود
            document.removeEventListener('mousedown', checkIfClickOutside);
        }

    }, [show]);
    // طبق الگوی استاد پیش رفتم اما استایل‌ها درست اعمال نمی‌شد
    return (
        // با کمک جیمینی استایل رو درست کردم
        <div className="dropdown">
            <a className="nav-flag dropdown-toggle" onClick={() => setShow(true)}>
                <img src={language === 'fa' ? faFlag : usFlag} alt="English" />
            </a>
            {/* در اینجا ریف خود را به ریف تگ دایو متصل کردیم */}
            {/* یعنی ری اکت یک ریف به عنصر دام ایجاد کرده و بعد آن را در خاصیت کارنت ریف قرار می‌دهد */}
            <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show ? 'show' : 'undefined'}`}>
                <a
                    className='dropdown-item fw-bolder d-flex align-items-center gap-2'
                    // این روش زیر برای استاد است برای راست چین کردن
                    style={{ textAlign: language === 'fa' ? "right" : 'left' }}
                    onClick={() => changeLanguage('fa')}>
                    <img src={faFlag} width="20" className='ms-1'/>
                    <span className='align-middle'>فارسی</span>
                </a>
                <a
                    // این روش را با جیمینی نوشتم و جواب داد
                    className='dropdown-item fw-bolder d-flex align-items-center gap-2'
                    style={{ textAlign: language === 'fa' ? "right" : 'left' }}
                    onClick={() => changeLanguage('en')}>
                    <img src={usFlag} width="20" className='ms-1'/>
                    <span className='align-middle'>English</span>
                </a>
            </div>
        </div>
    )
}

export default ChangeLangouage; 
