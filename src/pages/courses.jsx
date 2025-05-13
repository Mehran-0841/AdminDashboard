import { httpInterceptedService } from "@core/http-service";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import CourseList from "../features/courses/componenets/course-list";




const Courses = () => {
    const data = useLoaderData();
    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-item-center justify-content-between mb-5">
                    <a className="btn btn-primary fw-bolder mt-n1">
                        افزودن دوره جدید
                    </a>
                </div>
                <Suspense fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}>
                    <Await resolve={data.courses}>
                        {
                            (loadedCourses) => <CourseList courses={loadedCourses}/>
                        }
                    </Await>
                </Suspense>


            </div>
        </div>
    )
}

export async function coursesLoader() {
    return defer({
        courses: loadCourses(),
    });
}

const loadCourses = async () => {
  const response = await fetch('/courses.json');
  return response.json();
}

// const loadCourses = async () => {
//     const response = await httpInterceptedService.get('/Course/list');
//     // خروجی /Course/list از طریق data بدست خواهد آمد.
//     // console.log(response.data);
//     return response.data;
// }

export default Courses;

