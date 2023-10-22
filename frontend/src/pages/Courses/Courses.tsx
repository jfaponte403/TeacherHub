import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";

const Courses = () => {
    return (
        <>
            <NavbarLogged teacher={false} courses={true} profile={false} />
            <div className="container d-flex align-items-center flex-column" style={{ minHeight: '100vh' }}>
                <div className="container-search mt-4">
                    <div className="input-group">
                        <input type="text" className="form-control mx-2" placeholder="Search your teacher" />
                        <div className="input-group-append">
                            <button className="btn-orange btn" type="button">Search</button>
                        </div>
                    </div>
                </div>
                {/* list */}
                <div className="courses-list d-flex flex-column my-3">
                    <button className="btn-outline-orange btn my-3">courses 1</button>
                    <button className="btn-outline-orange btn">courses 2</button>
                </div>
            </div>
        </>
    );
}
export default Courses;