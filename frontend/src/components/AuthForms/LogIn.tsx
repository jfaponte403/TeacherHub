import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  { isValidEmail } from "../../utils/inputValidators";
import { showAlert } from "../../utils/alertPrompts";
import { axiosInstance, postData } from "../../api";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            {
                'Content-Type': 'application/json',
            }
        ).then((response) => {
            if ( response.status === 200 ) {
                navigate('/home-user');
            }
        }).catch((error) => {
            console.log(error);
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
            </form>
        </div>

    );
};

export default LogIn;
