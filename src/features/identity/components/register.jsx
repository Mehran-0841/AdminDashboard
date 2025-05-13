import logo from '@assets/images/logo.svg';
import { useForm } from 'react-hook-form';
import { Link, useActionData, useNavigate, useNavigation, useRouteError, useSubmit } from 'react-router-dom';
import { httpService } from '@core/http-service';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Register = () => {

    const {register, watch, handleSubmit, formState: {errors}} = useForm();

    const {t} = useTranslation();
    const submitForm = useSubmit();
    // آن ساب میت کالبک فانکشین هستش نوع پاس دادن متغیر را ببین
    // کانفرم پسورد رو جدا کردیم و فقط موبایل و پسورد رو به سرور فرستادیم
    // چون از کانفرم استفاده نکردیم و فقط جداش کردیم زیرش خط قرمز شده 
    const onSubmit = data => {
        const {confirmPassword, ...userData} = data;
        submitForm(userData, {method: 'post'});
        // submitForm(userData, {method: 'post', action: '/register'});
    };
    
    const navigation = useNavigation();
    const isSubmitting = navigation.state !== 'idle';

    const isSuccessOperation = useActionData();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccessOperation) {
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        }
    }, [isSuccessOperation]);

    const routeErrors = useRouteError();


    return (
        <>
            <div className="text-center mt-4">
                <img src={logo} style={{ height: '100px' }} />
                <h1 className="h2">{t('register.title')}</h1>
                <p className="lead">
                    {t('register.introMessage')}
                </p>
                <p className="lead">
                    {t('register.alreadyRegistered')}
                    <Link to="/login" className="me-2">{t('register.signin')}</Link>
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-4">
                        {/* آن ساب میت یک کالبک فانکشن هستش که به هندل دادیم */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">{t('register.mobile')}</label>
                                {/* سه نقطه ریجستر یک آبجکت بر می‌گرداند که داخل اینپوت استفاده میشه  */}
                                <input {...register('mobile', {
                                    required: true,
                                    minLength: 11,
                                    maxLength: 11
                                })}
                                    className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`}
                                />
                                {/* اگر اطاعات اشتباه وارد شود اینپوت قرمز می‌شود  */}
                                {/* نمایش متن خطا */}
                                {errors.mobile && errors.mobile.type === 'required' && (
                                    <p className="text-danger smlall fw-bolder mt-1">
                                        {t("login.validation.mobileRequired")}
                                    </p>
                                )}
                                {errors.mobile && (errors.mobile.type === 'minLength' || errors.mobile.type === 'maxLength') && (
                                    <p className="text-danger smlall fw-bolder mt-1">
                                        {t('register.validation.mobileLength')}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('register.password')}</label>
                                <input {...register('password',{
                                    // یعنی پر کردن این فیلد اجباری هستش
                                    required: true,
                                    minLength: {
                                        value: 6,
                                        // وقتی فایل ترجمه درست کردی دیگه نیازی به این مسج نیست 
                                        message: 'رمز عبور باید حداقل 6 کاراکتر باشد'
                                    },
                                })}
                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                                    type="password"
                                />
                                {errors.password && errors.password.type === 'required' && (
                                    <p className="text-danger smlall fw-bolder mt-1">
                                         {t("login.validation.passwordRequired")}
                                    </p>
                                )}
                                {/* این قطعه رو خودم اضافه کردم  */}
                                {errors.password && errors.password.type === 'minLength' && (
                                    <p className="text-danger smlall fw-bolder mt-1">
                                        {t('register.validation.PasswordTooShort')}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('register.repeatPassword')}</label>
                                <input {...register('confirmPassword', {
                                    required: true,
                                    validate : value => {
                                        if (watch('password') !== value) {
                                            return t('register.validation.notMatching');
                                        }
                                    }
                                })}
                                    className={`form-control form-control-lg ${errors.confirmPassword && 'is-invalid'}`}
                                    type="password"
                                />
                                {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                                    <p className="text-danger smlall fw-bolder mt-1">
                                         {t("register.validation.repeatPasswordRequired")}
                                    </p>
                                )}
                                {
                                    errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                                        <p className="text-danger smlall fw-bolder mt-1">
                                            {errors.confirmPassword?.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-lg btn-primary"
                                >
                                    {/* طبق زبان پیش فرض که فعلا فارسی است عمل می‌کند */}
                                    {t('register.register')}
                                    {/* برای استفاده از تی فعلا این کد را کامنت کردیم */}
                                    {/* {isSubmitting ? 'در حال انجام عملیات' : 'ثبت نام کنید'} */}
                                </button>
                            </div>
                            {
                                isSuccessOperation && (
                                    <div className="alert alert-success text-success p-2 mt-3">
                                        {t('register.successOperation')}
                                    </div>
                                )
                            } 
                            {
                                routeErrors && (
                                    // مدیریت خطاها و دیدن متن خطاها
                                    <div className="alert alert-danger text-danger p-2 mt-3">
         
                                        {/* {routeErrors.response?.data.map(error => <p className="mb-0">{error.description}</p>)} */}
                                        {/*  چرا از کلید ترجمه -- دقت کنیدDuplicateUserName استفاده نشده و ازerror.code */}
                                        {routeErrors.response?.data.map(error => <p className="mb-0">{t(`register.validation.${error.code}`)}</p>)}
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
// مشورت از chatgpt
// این قطعه زیر رو میشه توی یه فایل مستقل درست کرد و بعد ایمپورت کرد تا این اخطار زرد برطرف بشه
export async function registerAction({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post('/Users', data);
    return response.status === 200;
}


// برای پیدا کردن مشکل بوجود آمده هنگام کار با سرور کد زیر را جایگزین تابع ریجستر اکشن کن 

// export async function registerAction({ request }) {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
  
//     try {
//       const response = await httpService.post('/Users', data);
      
//       if (response.status === 200) {
//         console.log("✅ ثبت‌نام موفقیت‌آمیز بود");
//         return true;
//       } else {
//         console.error('⛔ Status:', response.status);
//         const errorData = await response.json();
//         console.log('📄 Error data:', errorData);
//         return false;
//       }
//     } catch (error) {
//         console.error("❌ Error occurred during registration:", error);
        
//         if (error.response) {
//           console.log("⛔ Status:", error.response.status);
//           console.log("📄 Error data:", error.response.data); // این خیلی مهمه 😍
//         }
      
//         return false;
//       }
      
//   }
  