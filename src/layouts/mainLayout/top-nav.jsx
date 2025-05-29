import { useAppContext } from "../../contexts/app/app-context";
import ChangeLangouage from "../../components/change-language";
import ChangeTheme from "../../components/change-theme";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
    const { language, toggleSidebar } = useAppContext();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <a
                className="sidebar-toggle"

                // onClick={() => setcollapseSidebar(!collapseSidebar)}
                onClick={toggleSidebar}
                >
                <i className="hamburger align-self-center"></i>
            </a>
            <div className="d-flex slign-items-center gap-3 me-3">
                <ChangeLangouage />
                <ChangeTheme />
            </div>
            <div className={`${language === "fa" ? "me-auto" : "ms-auto"}`}>
                <botton className="btn ms-2 btn-outline-danger fw-bolder" onClick={logout}>خارج شوید</botton>
            </div>

        </nav>
    )
}

export default TopNav;