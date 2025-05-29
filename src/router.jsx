import { createBrowserRouter } from "react-router-dom";
import Register, { registerAction } from "./features/identity/components/register";
import Login, { loginAction } from "./features/identity/components/login";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/mainLayout/main-layout";
import Courses, { coursesLoader } from "./pages/courses";
import CourseCategories, { categoriesLoader } from "./pages/course-categories";
import CourseDetails, { courseDetailsLoader } from "./features/courses/componenets/course-details";
import { CategoryProvider } from "./features/categoreies/category-context";
import NotFound from "./pages/not-found";
import UnhandledException from "./pages/unhandled-excption";



const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <UnhandledException/>,
        children: [{
            element: <Courses />,
            index: true,
            loader: coursesLoader
        },
        {
            path: 'course-categories',
            element:
                (
                    <CategoryProvider>
                        <CourseCategories/>
                    </CategoryProvider>
                ),
            loader: categoriesLoader
        },
        {
            path: 'courses/:id',
            element: <CourseDetails />,
            loader: courseDetailsLoader
        }
        ]
    },
    {
        element: <IdentityLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
                action: loginAction,
                errorElement: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
                action: registerAction,
                errorElement: <Register />,
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }

])

export default router;

