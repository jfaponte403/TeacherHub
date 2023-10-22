// import {Link} from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import LogIn from "../../components/AuthForms/LogIn";
import Register from "../../components/AuthForms/Register";
import { changeTheme } from '../../helpers/themeHelper.ts';
import {useEffect, useState} from "react";

const Home = () => {
    useEffect(() => {
        changeTheme();
    }, [])

    const [login, setLogin] = useState(true);
    const handleLogin = () =>{
        setLogin(true);
    }

    const handleRegister = () =>{
        setLogin(false);
    }

    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <div className="border rounded">
                    <div className="d-flex justify-content-center m-3">
                        <button
                            className={`btn ${login ? 'btn-orange' : 'btn-outline-orange btn' }`}
                            onClick={handleLogin}
                            style={{ marginRight: '10px' }}
                        >
                            Log in
                        </button>
                        <button
                            className={`btn ${login ? 'btn-outline-orange btn' : 'btn-orange'}`}
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>

                    <div className='component'>
                        {login ? <LogIn /> : <Register />}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;