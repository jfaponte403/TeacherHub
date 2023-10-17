import React, { useState } from "react";
import { isValidEmail } from "../../utils/inputValidators";

const Register = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [uuid, setUuid] = useState("");
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
            alert("Invalid email address");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // TODO: Send request to backend | POST /auth/register
        setUuid(crypto.randomUUID()); // Generate a random UUID
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
