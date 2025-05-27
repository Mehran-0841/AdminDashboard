import { httpInterceptedService } from "@core/http-service";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import CategoryList from "../features/categoreies/components/category-list";
import { Suspense, useState } from "react";
import Modal from "../components/modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";


const CourseCategories = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();

    const data = useLoaderData();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const deleteCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setShowDeleteModal(true);
    }

    const handleDeleteCategory = async () => {
        // console.log("📦 toast object:", toast);
        setShowDeleteModal(false);
        // وقتی اویت را بردارید این خط یک پرامیس به ما می‌دهد 
        // اگر به ریزالو نیاز دارید باید اویت را بزارید بماند
        // اینجا ما به پرامیس نیاز داریم و اویت را حذف کردیم
        const response = httpInterceptedService.delete(`/CourseCategory/${selectedCategory}`);
        // console.log("🔥 DELETE PROMISE:", response); // باید یک Promise نشون بده
        toast.promise(
            response,
            {
                pending: "در حال حذف ...",
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        return "عملیات با موفقیت انجام شد";
                    },
                },
                error: {
                    render({data}) {
                        return t("categoryList." + data.response.data.code);
                    },
                },
            },
            {
                // position: toast.POSITION.BOTTOM_LEFT,
                position: "bottom-left"
            }
        );
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <a className="btn btn-primary fw-bolder mt-n1">
                            افزودن دسته جدید
                        </a>
                    </div>
                    <Suspense fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}>
                        <Await resolve={data.categories}>
                            {
                                (loadedCategories) => {
                                    console.log(loadedCategories);
                                    return <CategoryList deleteCategory={deleteCategory} categories={loadedCategories} />
                                }
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <Modal
                isOpen={showDeleteModal}
                close={setShowDeleteModal}
                title="حذف"
                body="آیا از حذف این دسته اطمینان دارید؟"
            >
                <button type="button" className="btn btn-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>
                    انصراف
                </button>
                <button type="button" className="btn btn-primary fw-bolder" onClick={handleDeleteCategory}>
                    حذف
                </button>
            </Modal>
        </>
    )
}


// کد تغییر یافته و نسخه جایگزین دیفر
const loadCategories = async (request) => {
    const page = new URL(request.url).searchParams.get('page') || 1;
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = '/CourseCategory/sieve';

    url += `?page=${page}&pageSize=${pageSize}`;

    const response = await httpInterceptedService.get(url);
    return response.data;
};

export async function categoriesLoader({ request }) {
    return {
        categories: loadCategories(request)
    };
}


// // تابع دیفر منسوخ شده و باید کد را تغییر بدهیم
// export async function categoriesLoader() {
//     return defer({
//         categories: loadCategories()
//     })
// }

// const loadCategories = async () => {
//     const response = await httpInterceptedService.get('/CourseCategory/sieve');
//     return response.data;
// }

export default CourseCategories;

