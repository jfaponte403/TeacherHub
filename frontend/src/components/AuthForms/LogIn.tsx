import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  { isValidEmail } from "../../utils/inputValidators";
import { showAlert } from "../../utils/alertPrompts";

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

        navigate('/home-user');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">Log In</button>
        </form>
    );
};

export default LogIn;
