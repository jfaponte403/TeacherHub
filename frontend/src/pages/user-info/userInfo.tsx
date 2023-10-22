import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import './userInfo.css'
const  UserInfo = () => {
    return (
        <>
            <NavbarLogged teacher={false} courses={false} profile={true} />
            <div className='container-main'>
                <div className='info-user border d-flex justify-content-center align-items-center flex-column h-100'>
                    <img
                        src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png"
                        alt="Profile"
                        style={{ borderRadius: '50%', maxHeight: '128px' }}
                        className="my-2"
                    />
                    <p className="my-2">Nickname: juan</p>
                    <p className="my-2">Email: xd@udistrital.edu.co</p>
                </div>
                <div className='user-opc'>
                    <div className="d-flex justify-content-center align-items-center flex-column h-100">
                        <button type="submit" className="btn btn-outline-orange my-2">Change nickname</button>
                        <button type="submit" className="btn btn-outline-orange my-2">Change email</button>
                        <button type="submit" className="btn btn-outline-orange my-2">Change password</button>
                    </div>
                </div>
            </div>
        </>


    )
}

export default UserInfo;
