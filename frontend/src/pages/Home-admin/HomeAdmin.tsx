import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";

const HomeAdmin = () => {
    return (
        <>
            <NavbarLogged
                teacher={false}
                courses={false}
                profile={false} />
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <h1>Welcome admin</h1>
            </div>
        </>
    )
}

export default HomeAdmin;
