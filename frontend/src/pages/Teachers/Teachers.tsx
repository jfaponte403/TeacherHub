import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import Teacher from "../../components/Teacher/Teacher.tsx";

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
                {/* Teachers list */}
                <div className="courses-list d-flex flex-column my-3 overflow-auto" style={{ maxHeight: '400px' }}>
                    <Teacher name="Diana martinez" description="see more" link="/teachers-courses" />
                    <Teacher name="FuckN ardila" description="see more" link="/teachers-courses" />
                    <Teacher name="Edilmo Carvajal" description="see more" link="/teachers-courses" />
                    <Teacher name="Racistang" description="see more" link="/teachers-courses" />
                </div>

            </div>
        </>
    );
}
export default Teachers;