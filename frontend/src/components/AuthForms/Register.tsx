import React, { useState } from "react";
import { showAlert } from "../../utils/alertPrompts";
import  { isValidEmail } from "../../utils/inputValidators";
import { axiosInstance, postData } from "../../api";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmationCode, setConfirmationCode] = useState<boolean>(false)
    const [code, setCode] = useState("")
    const [id, setId] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

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

    const handleCode = (event: React.ChangeEvent<HTMLInputElement>) => { // Add new function
        setCode(event.target.value);
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
        const id = crypto.randomUUID(); // Generate a random UUID
        setId(id)
        postData(axiosInstance, '/auth/register', {
            id,
            email,
            nickname,
            password
        }, {
            'Content-Type': 'application/json'
        }).then( response => {
            if (response.status === 200) {
                setLoading(false)
                setConfirmationCode(true)
            }
        }).catch(  error => {
            showAlert(
                {
                    icon: 'error',
                    title: 'Something went wrong',
                    text: 'Please, try again later.',
                    buttonText: 'Ok',
                }
            )
            console.error(error)
        })
    };

    const handleConfirmationCode = () => {
      postData(axiosInstance, '/auth/verifyCode', {
          studentId: id,
          verificationCode: code
      }, {'Content-Type': 'application/json'}).then(response => {
          if (response.status === 200){
              showAlert(
                  {
                      icon: 'success',
                      title: 'Account created successfully',
                      text: 'Welcome to TeacherHub!.',
                      buttonText: 'Ok',
                  }
              )
              setConfirmationCode(false)
              navigate('/home')
          }
      }).catch( error => {
          showAlert(
              {
                  icon: 'error',
                  title: 'Something went wrong',
                  text: 'Please, try again later.',
                  buttonText: 'Ok'
              }
          )
          console.error(error)
      } )
    }

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
                {
                    loading && (
                        <div className='d-flex align-items-center justify-content-center'>
                            <p className='text-center'>Loading...</p>
                        </div>
                    )
                }
            </form>
            {
                confirmationCode && (
                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Check you email {email}</h5>
                                    <button  type="button" className="btn btn-outline-orange" onClick={()=>{setConfirmationCode(false)}}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <p>Type the Confirmation code</p>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="code"
                                            onChange={handleCode}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-orange" onClick={()=>{setConfirmationCode(false)}}> Exit </button>
                                    <button type="button" className="btn btn-orange" onClick={handleConfirmationCode}> Register </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    );
};

export default Register;
