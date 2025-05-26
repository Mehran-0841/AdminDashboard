import { httpInterceptedService } from "@core/http-service";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import CategoryList from "../features/categoreies/components/category-list";
import { Suspense, useState } from "react";
import Modal from "../components/modal";

const CourseCategories = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setselectedCategory] = useState();
    
    const data = useLoaderData();
    const  navigate = useNavigate();

    const deleteCategory = (categoryId) => {
        setselectedCategory(categoryId);
        setShowDeleteModal(true);
    }

    const handleDeleteCategory = async () => {
        setShowDeleteModal(false);
        const response = await httpInterceptedService.delete(`/CourseCategory/${selectedCategory}`);

        if (response.status === 200) {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
        }
    }


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

