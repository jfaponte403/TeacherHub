import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";

const HomeUser = () => {
    return (
        <>
            <NavbarLogged
                teacher={false}
                courses={false}
                profile={false} />

            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <h1>Hello to TeacherHub... I know that you know</h1>
            </div>
        </>

    );
}
export default HomeUser;