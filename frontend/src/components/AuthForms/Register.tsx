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
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Nickname:
                <input type="text" value={nickname} onChange={handleNicknameChange} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <label>
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
