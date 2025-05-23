import { httpInterceptedService } from "@core/http-service";
import { Await, useLoaderData } from "react-router-dom";
import CategoryList from "../features/categoreies/components/category-list";
import { Suspense } from "react";

const CourseCategories = () => {
    const data = useLoaderData();
    return (
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
                            (loadedCategories) =>
                                {   
                                    console.log(loadedCategories);
                                    return <CategoryList categories={loadedCategories} />           
                                } 
                        }
                    </Await>
                </Suspense>


            </div>
        </div>
    )
}


// کد تغییر یافته و نسخه جایگزین دیفر
const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get('page') || 1;
  const pageSize = 10;
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