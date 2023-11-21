import React, { useState } from "react";
import { showAlert } from "../../utils/alertPrompts";
import  { isValidEmail } from "../../utils/inputValidators";
import { axiosInstance, postData } from "../../api";
import {useNavigate} from "react-router-dom";
import "../../styles/login.css"
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
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form_group">

                    <input
                        type="email"
                        className="form_input"
                        id="email"
                        placeholder=" "
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label className='form_label'>Email</label>
                </div>
                <div className="form_group">

                    <input
                        type="text"
                        className="form_input"
                        id="nickname"
                        placeholder=" "
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    <label className='form_label'>Nickname</label>
                </div>
                <div className="form_group">

                    <input
                        type="password"
                        className="form_input"
                        id="password"
                        placeholder=" "
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <label className='form_label'>Password</label>
                </div>
                <div className="form_group">

                    <input
                        type="password"
                        className="form_input"
                        id="confirmPassword"
                        placeholder=" "
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <label className='form_label'>Confirm Password</label>
                </div>
                    <button type="submit" className="form_button">Register</button>
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
                                            className="form_input"
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
