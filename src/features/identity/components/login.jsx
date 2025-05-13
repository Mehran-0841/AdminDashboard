import logo from '@assets/images/logo.svg';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, redirect, useNavigation, useRouteError, useSubmit } from 'react-router-dom';
import { httpService } from '@core/http-service';

const Login = () => {

    // واچ در اینجا استفاده نشده 
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();

    // برای امتحان کنسول گرفتیم
    // const onSubmit = data => console.log(data);
    const submitForm = useSubmit();
    const onSubmit = (data) => {
        console.log("Form data:", data); // ← باید موبایل و پسورد هردو رو ببینی
        submitForm(data, { method: 'post' });
    };

    const navigation = useNavigation();
    const isSubmitting = navigation.state !== 'idle';

    const routeErrors = useRouteError();

    return (
        <>
            <div className="text-center mt-4">
                <img src={logo} style={{ height: '100px' }} />
                <h1 className="h2">{t('login.title')}</h1>
                <p className="lead">
                    {t('login.introMessage')}

                </p>
                <p className="lead">
                    {t('login.areNotRegistered')}
                    <Link to="/register" className="me-2">{t('login.register')}</Link>
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">{t('login.mobile')}</label>
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
                                <label className="form-label">{t('login.password')}</label>
                                <input {...register('password', {
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
                                        {t('login.validation.PasswordTooShort')}
                                    </p>
                                )}
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="btn btn-lg btn-primary"
                                >
                                    {/* {t('login.signin')} */}
                                    {
                                        isSubmitting ? t('login.signingin') : t('login.signin')
                                    }

                                </button>
                            </div>
                            {
                                routeErrors && (
                                    // مدیریت خطاها و دیدن متن خطاها
                                    <div className="alert alert-danger text-danger p-2 mt-3">

                                        {/* {routeErrors.response?.data.map(error => <p className="mb-0">{error.description}</p>)} */}
                                        {/*  چرا از کلید ترجمه -- دقت کنیدDuplicateUserName استفاده نشده و ازerror.code */}
                                        {routeErrors.response?.data.map(error => <p className="mb-0">{t(`login.validation.${error.code}`)}</p>)}
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Login;


export async function loginAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post('/Users/login', data);
    if (response.status === 200) {
        localStorage.setItem('token', response?.data.token);
        return redirect('/');
    }
}



// این قطعه کد با چت جی پی تی مشورت شد
// برای پیدا کردن خطا در سرور از این کد می تونی استفاده کنی
// کنسول رو ببینید

// export async function loginAction({request}) {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     try {
//         const response = await httpService.post('/Users/login', data);
//         if (response.status === 200) {
//           localStorage.setItem('token', response?.data.token);
//           // return redirect('/');
//         }
//       } catch (error) {
//         console.log("❌ Server error:", error.response?.data || error.message);
//       }
// }


// این قطعه کد را جیمینی پیشنهاد داد تا ریدارکت درست مدیریت شود


// export async function loginAction({ request }) {
//     console.log('loginAction started');
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     try {
//         const response = await httpService.post('/Users/login', data);
//         console.log('Response received:', response);
//         if (response?.status === 200 && response?.data?.token) {
//             localStorage.setItem('token', response.data.token);
//             console.log('Token saved to localStorage');
//             return redirect('/'); // ریدایرکت به صفحه اصلی بعد از موفقیت
//         } else {
//             console.error('خطا در ورود:', response);
//             return { error: 'login.error.invalidCredentials' }; // برگرداندن خطا برای نمایش در کامپوننت
//         }
//     } catch (error) {
//         console.error('خطا در ارسال درخواست ورود:', error);
//         return { error: 'login.error.network' }; // برگرداندن خطای شبکه برای نمایش در کامپوننت
//     } finally {
//         console.log('loginAction finished');
//     }
// }