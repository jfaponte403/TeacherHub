import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <NavLink to="/user">User  </NavLink>
            <NavLink to="/courses">courses  </NavLink>
            <NavLink to="/teachers">teachers  </NavLink>
            <NavLink to="/">Log out  </NavLink>
        </div>
    );
}
export default Navbar;