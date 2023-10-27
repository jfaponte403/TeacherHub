import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import {useState} from "react";
const  UserInfo = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showNickname, setShowNickname] = useState<boolean>(false)
    const [showEmail, setShowEmail] = useState<boolean>(false)

    const handleShowPassword = () => {
        setShowPassword(true);
    }

    const handleClosePassword = () => {
        setShowPassword(false);
    }

    const handleShowNickname = () => {
        setShowNickname(true);
    }

    const handleCloseNickname = () => {
        setShowNickname(false);
    }

    const handleShowEmail = () => {
        setShowEmail(true);
    }

    const handleCloseEmail = () => {
        setShowEmail(false);
    }

    return (
        <>
            <NavbarLogged teacher={false} courses={false} profile={true} />
            <div className="container main-container my-5">
                <div className="row">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <aside className="user-info">
                            <img
                                src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png"
                                alt="Profile"
                                className="rounded-circle img-fluid my-2"
                                style={{ maxWidth: '128px' }}
                            />
                            <p className="my-2">Diana Martinez</p>
                            <p className="my-2">Equation Differential</p>
                            <p className="my-2">Defeat: 20%</p>
                            <p className="my-2">Grade: 5.0 (the best teacher)</p>
                        </aside>
                    </div>
                    <div className="col-md-8">
                        <div className="user-options courses-list d-flex flex-column my-3 align-items-center">
                            <button onClick={handleShowPassword} className='btn btn-outline-orange m-5' style={{maxWidth: '12rem'}}>Change password</button>
                            {
                                showPassword && (
                                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Change your password</h5>
                                                    <button onClick={handleClosePassword} type="button" className="btn btn-outline-orange">
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline-orange"  onClick={handleClosePassword}> Exit </button>
                                                    <button type="button" className="btn btn-orange" > Save </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <button onClick={handleShowNickname} className='btn btn-outline-orange m-5' style={{maxWidth: '12rem'}}>Change Nickname</button>
                            {
                                showNickname && (
                                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Change your Nickname</h5>
                                                    <button onClick={handleCloseNickname} type="button" className="btn btn-outline-orange">
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Nickname"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline-orange"  onClick={handleCloseNickname}> Exit </button>
                                                    <button type="button" className="btn btn-orange" > Save </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <button onClick={handleShowEmail} className='btn btn-outline-orange m-5' style={{maxWidth: '12rem'}}>Change Email</button>
                            {
                                showEmail && (
                                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Change your email</h5>
                                                    <button onClick={handleCloseEmail} type="button" className="btn btn-outline-orange">
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="email"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline-orange"  onClick={handleCloseEmail}> Exit </button>
                                                    <button type="button" className="btn btn-orange" > Save </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo;
