// import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import TopNav from "./top-Nav";
import Footer from "./footer";
import { useEffect } from "react";


const MainLayout = () => {
    // دیگر به این استیت هم نیاز نداریم 
    // const [collapseSidebar, setcollapseSidebar] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
      }, [navigate]);
    // برای امنیت فرانت استاد از این کد بدون یوز افکت استفاده کرد اما جواب نداد
    // برای همین در بالا با کمک جیمینی و پت جی پی تی کد با یوز افکت نوشتم
    // const token = localStorage.getItem('token');
    // const navigate = useNavigate();
    // if (!token) {
    //     navigate('/login');
    // }

    return (
        <div className="wrapper" style={{ minHeight: '100h' }}>
            <Sidebar/>
            <div className="main">
                <TopNav/>
                <main className="content">
                    <div className="container-fluid p-0">
                        <Outlet/>
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    )
}

export default MainLayout;