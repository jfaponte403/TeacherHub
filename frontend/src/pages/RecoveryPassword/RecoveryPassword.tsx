import Navbar from "../../components/Navbar/Navbar.tsx";
import { useState } from "react";
import {axiosInstance, postData} from "../../api";
import {showAlert} from "../../utils/alertPrompts.ts";
import {useNavigate} from "react-router-dom";

const RecoveryPassword = () => {
    const [email, setEmail] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showFormCode, setShowFormCode] = useState<boolean>(false)
    const navigate = useNavigate()
    // asd
    const handlerRecoveryPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        postData(
            axiosInstance,
            'auth/generateCode',
            {
                email: email
            },
            {}
        ).then(response => {
            if (response.data.status === 200){
                setShowFormCode(true)
            }
        }).catch(error => {
            console.error(error)
        })
    }

    const handlerSendCode = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        postData(
            axiosInstance,
            'auth/generateCode',
            {
                email: email,
                newPassword: password,
                verificationCode: code
            },
            {}
        ).then(response => {
            if (response.data.status === 200){
                showAlert(
                    {
                        icon: 'success',
                        title: 'Password has been changed correct',
                        text: 'Thanks for use TeacherHub',
                        buttonText: 'Ok',
                    }
                )
                navigate('/')
            }
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <>
            <Navbar />
            <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '25vh' }}>
                <h1 className='text-center'>Recovery your password</h1>
            </div>
            {
                showFormCode ?
                    <>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h3 className='text-center'>Check your email</h3>
                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '25vh' }}>
                            <div className="border rounded">
                                <div className="d-flex justify-content-center m-3">
                                    <form>
                                        <div className="form-group">
                                            <label>Type your code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(event) => {
                                                    setCode(event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Type new password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                onChange={(event) => {
                                                    setPassword(event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="text-center m-2">
                                            <button type="submit" className="btn-outline-orange btn" onClick={handlerSendCode}>Recovery</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '25vh' }}>
                        <div className="border rounded">
                            <div className="d-flex justify-content-center m-3">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Type your email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="text-center m-2">
                                        <button type="submit" className="btn-outline-orange btn" onClick={handlerRecoveryPassword}>Recovery</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default RecoveryPassword;
