import {NavLink} from "react-router-dom";
import logo from "../../assets/logo_nobg.png";
import lightLogo from "../../assets/lightlogo.png";
import {useState} from "react";
import {isDarkTheme, setTheme} from "../../helpers/themeHelper.ts";

const NavbarAdmin = ({ teacher, users, courses }: { courses: boolean, teacher: boolean, users: boolean }) => {

    const [isDark, setIsDark] = useState<boolean>(isDarkTheme());

    const handleButtonClick = () => {
        setIsDark(!isDark);
        setTheme( isDarkTheme() ? 'light' : 'dark');
    }

    return (
        <nav  className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid">
                <NavLink to="/home-admin" className="navbar-brand">
                    <img src={isDark?logo:lightLogo} alt="TeacherHub" className="img-fluid" width={180} height={190}></img>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item ">
                            <NavLink to="/users-admin" className={users ? "btn btn-orange mx-1" : "btn-outline-orange btn mx-1"}> Users </NavLink>
                            <NavLink to="/teachers-admin" className={teacher ? "btn btn-orange mx-1" : "btn-outline-orange btn mx-1"}> Teachers </NavLink>
                            <NavLink to="/courses-admin" className={courses ? "btn btn-orange mx-1" : "btn-outline-orange btn mx-1"}> Courses </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item ">
                                <NavLink to="/" className='btn btn-outline-red'> Log out </NavLink>
                            </li>
                        </ul>
                    </div>

                    <ul className="navbar-nav ">
                        <button onClick={handleButtonClick} className="btn rounded-fill">
                            { isDark ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill" style={{color: "yellow"}}></i>}
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavbarAdmin