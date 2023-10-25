import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import Course from "../../components/Course/Course.tsx";

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
                <div className="courses-list d-flex flex-column my-3 overflow-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                    <Course />
                </div>
            </div>
        </>
    );
}
export default Courses;