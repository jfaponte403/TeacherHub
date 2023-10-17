import {Link} from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import LogIn from "../../components/AuthForms/LogIn";
import Register from "../../components/AuthForms/Register";

const Home = () => {
    return (
        <>
            <Navbar />
            <LogIn />
            <Register />
        </>
    );
}
export default Home;