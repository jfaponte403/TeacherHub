import { useLocation } from "react-router-dom";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
//import CardTeacher from "../../components/Teacher/CardTeacher.tsx";
import { Course as ObjectCourse } from "../../interfaces/course.ts";

const CourseTeachers = () => { 

    const course: ObjectCourse = useLocation().state.course;

    return (
        <>
            <NavbarLogged teacher={false} courses={true} profile={false} />
            <div className="container d-flex align-items-center flex-column" style={{ minHeight: '100vh' }}>
                <div className="container-search mt-4">
                    <div className="input-group">
                        <p className="h1">"{ course.name }" teachers</p>
                    </div>
                </div>
                <div className="courses-list d-flex flex-column my-3 overflow-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    Courses
                </div>
            </div>
        </>

    );
}
export default CourseTeachers;