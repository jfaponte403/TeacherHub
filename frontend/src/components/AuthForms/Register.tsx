import React, { useState } from "react";
import { isValidEmail } from "../../utils/inputValidators";
import { showAlert } from "../../utils/alertPrompts";

const Register = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    // const [uuid, setUuid] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Add new function
        setConfirmPassword(event.target.value);
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

        if (password !== confirmPassword) {
            showAlert(
                {
                    icon: 'error',
                    title: 'Passwords do not match',
                    text: 'Please, check your password',
                    buttonText: 'Ok',
                }
            )

            return;
        }

        // TODO: Send request to backend | POST /auth/register
        // setUuid(crypto.randomUUID()); // Generate a random UUID

        showAlert(
            { 
                icon: 'success',
                title: 'Account created successfully',
                text: 'Welcome to TeacherHub!',
                buttonText: 'Ok',
            }
        )
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
                    <label htmlFor="nickname">Nickname:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <div className="text-center m-2">
                    <button type="submit" className="btn-outline-orange btn">Register</button>
                </div>
            </form>
        </div>

    );
};

export default Register;
