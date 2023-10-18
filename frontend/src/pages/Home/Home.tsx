// import {Link} from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import LogIn from "../../components/AuthForms/LogIn";
import Register from "../../components/AuthForms/Register";
import { changeTheme } from '../../helpers/themeHelper.ts';
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        changeTheme();
    }, [])
    return (
        <>
            <Navbar />
            <LogIn />
            <Register />
        </>
    );
}
export default Home;