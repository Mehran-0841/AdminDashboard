import { useAppContext } from "../../contexts/app/app-context";
import ChangeLangouage from "../../components/change-language";
import ChangeTheme from "../../components/change-theme";

const TopNav = () => {
    const { toggleSidebar } = useAppContext();

    return (
        <nav className="navbar">
            <a
                className="sidebar-toggle"

                // onClick={() => setcollapseSidebar(!collapseSidebar)}
                onClick={toggleSidebar}
                >
                <i className="hamburger align-self-center"></i>
            </a>
            <div className="d-flex slign-items-center gap-3 ms-auto me-3">
                <ChangeLangouage />
                <ChangeTheme />
            </div>

        </nav>
    )
}

export default TopNav;