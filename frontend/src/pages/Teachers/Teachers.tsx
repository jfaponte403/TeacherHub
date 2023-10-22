import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";

const Teachers = () => {
    return (
        <>
            <NavbarLogged teacher={true} courses={false} profile={false} />
            <div className="container d-flex align-items-center flex-column" style={{ minHeight: '100vh' }}>
                <div className="container-search mt-4">
                    <div className="input-group">
                        <input type="text" className="form-control mx-2" placeholder="Search your teacher" />
                        <div className="input-group-append">
                            <button className="btn-orange btn" type="button">Search</button>
                        </div>
                    </div>
                </div>
                {/* Courses list */}
                <div className="courses-list d-flex flex-column my-3">
                    <button className="btn-outline-orange btn my-3">Teacher 1</button>
                    <button className="btn-outline-orange btn">Teacher 2</button>
                </div>
            </div>
        </>
    );
}
export default Teachers;