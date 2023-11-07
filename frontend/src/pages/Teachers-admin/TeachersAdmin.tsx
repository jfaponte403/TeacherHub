import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.tsx";
const TeachersAdmin = () => {
    return (
        <>
            <NavbarAdmin courses={false} teacher={true} users={false} />
            <div className="container">
                <div className="text-center mt-4">
                    <h1>Teachers</h1>
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-outline-orange">Create</button>
                </div>
            </div>
        </>
    );
}

export default TeachersAdmin