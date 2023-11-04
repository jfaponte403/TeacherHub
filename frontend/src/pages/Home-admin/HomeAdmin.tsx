import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.tsx";

const HomeAdmin = () => {
    return (
        <>
            <NavbarAdmin teacher={false} courses={false} users={false}/>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <h1>Welcome admin</h1>
            </div>
        </>
    )
}

export default HomeAdmin;
