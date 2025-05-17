// src/pages/CourseDetails.jsx

import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { httpInterceptedService } from "../../../core/http-service";

// 🔹 کامپوننت اصلی
const CourseDetails = () => {
  const data = useLoaderData();

  return (
    <div className="row">
      <div className="col-12">
        <Suspense fallback={<p className="text-info text-center mt-5">در حال دریافت اطلاعات دوره...</p>}>
          <Await resolve={data.course}>
            {(loadedCourse) => <CourseDetailsContent course={loadedCourse} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

// 🔹 کامپوننت نمایش محتوای دوره
const CourseDetailsContent = ({ course }) => {
  return (
    <>
      <div className="card">
        <div className="card-body pt-0">
          <img
            className="mx-auto my-4 d-block rounded"
            style={{ width: "30%" }}
            src={course.coverImageUrl}
            alt="Course Cover"
          />
          <div className="d-flex flex-column justify-content-center pe-4 text-center">
            <div className="badge bg-info my-2 align-self-center">
              {course.courseCategory}
            </div>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <InfoCard title="زمان آموزش" value={`${course.duration} ساعت`} />
        <InfoCard title="سطح دوره" value={course.courseLevel} />
        <InfoCard title="تعداد فصل‌ها" value={`${course.numOfChapters} فصل`} />
        <InfoCard title="تعداد مباحث" value={`${course.numOfLectures} مبحث`} />
        <InfoCard title="تعداد نظرات" value={`${course.numOfReviews} نظر`} />
        <InfoCard title="میانگین نظرات" value={`${course.averageReviewRating} از 5`} />
      </div>
    </>
  );
};

// 🔹 کامپوننت تکرار شونده کارت‌های اطلاعات
const InfoCard = ({ title, value }) => (
  <div className="col-lg-3 col-xl-2 d-flex">
    <div className="card flex-fill text-center">
      <div className="card-header">
        <h5 className="card-title mb-0 mt-2">{title}</h5>
      </div>
      <div className="card-body my-0 pt-0">
        <h4 className="text-info fw-bolder">{value}</h4>
      </div>
    </div>
  </div>
);

// 🔹 تابع لودر
export function courseDetailsLoader({ params }) {
  const coursePromise = httpInterceptedService
    .get(`/Course/by-id/${params.id}`)
    .then((res) => res.data);

  return {
    course: coursePromise,
  };
}

export default CourseDetails;
