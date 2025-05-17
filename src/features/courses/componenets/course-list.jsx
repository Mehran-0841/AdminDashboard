// import { useLoaderData } from "react-router-dom";
import Course from "./course";

const CourseList = ({courses}) => {
    // const loadedCourses = useLoaderData();
    // برای درک بهتر پراپس کنسول رو ببین و از کامنت بیرون بیار
    // console.log(courses);
    return (
        <>
            <div className="row">
                {
                    // با کمک متغیر کورس به هر کدام از عنصر آرایه دسترسی پیدا می کنیم
                    courses.map((course) => (
                        // الان به هر عضو که رسیدیم آی دی اون رو می خواهیم
                        <div className="col-3" key={course.id}>
                            <Course {...course}/>
                        </div>
                    )) 
                }   
            </div>
        </>
    )
}

export default CourseList; 