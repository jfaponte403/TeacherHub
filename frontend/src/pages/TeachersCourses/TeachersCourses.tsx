import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import Course from "../../components/Course/Course.tsx";

const TeacherProfileByCourse = () => {
    return (
        <>
            <NavbarLogged teacher={false} courses={false} profile={false} />
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
                        <div className="user-options courses-list d-flex flex-column my-3 overflow-auto" style={{maxHeight: '600px'}}>
                            <Course link="/teachers-profile-by-course" course="Integral calculus" />
                            <Course link="/teachers-profile-by-course" course="Equations Differential" />
                            <Course link="/teachers-profile-by-course" course="Differential calculus" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherProfileByCourse
