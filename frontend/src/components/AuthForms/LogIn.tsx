import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import  { isValidEmail } from "../../utils/inputValidators";
import { showAlert } from "../../utils/alertPrompts";
import { axiosInstance, postData } from "../../api";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../interfaces/token";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        if (!isValidEmail(email)) {
            showAlert(
                {
                    icon: 'error',
                    title: 'Not valid email',
                    text: 'Please, use your @udistrital.edu.co email',
                    buttonText: 'Ok',
                }
            )
            return;
        }

        postData(
            axiosInstance,
            '/auth/login',
            {
                email,
                password,
            },
            {}
        ).then(({ data, status }) => {
            if ( status === 200 ) {
                setLoading(false)
                if (data.token) {
                    const token = data.token;
                    const jwtDecodedData = jwtDecode(token) as DecodedToken;
                    localStorage.setItem('token', token);

                    if (jwtDecodedData.user_role === "ADMIN") navigate("/home-admin");
                    if (jwtDecodedData.user_role === "USER") navigate("/home-user");
                }
            }
        }).catch(() => {
            setLoading(false)
            showAlert(
                {
                    icon: 'error',
                    title: 'Error',
                    text: 'Please, check your email and password',
                    buttonText: 'Ok',
                }
            )
        })
    };

    return (
        <div className="d-flex justify-content-center align-items-center mx-5 my-1">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="text-center m-2">
                    <button type="submit" className="btn-outline-orange btn">Log In</button>

                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <Link to='/recovery-password'>forget your password?</Link>
                </div>
                {
                    loading && (
                        <div className='d-flex align-items-center justify-content-center'>
                            <p className='text-center'>Loading...</p>
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default LogIn;
