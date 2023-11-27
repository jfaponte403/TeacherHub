import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import CardTeacherCourse from "../../components/TeacherCourse/CardTeacherCourse.tsx";
import { useLocation } from "react-router-dom";
import { Course as ObjectCourse } from "../../interfaces/course.ts";

const TeacherCourses = () => {

    const teacher = useLocation().state.teacher;

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
                            <p className="my-2">{ teacher.name }</p>
                        </aside>
                    </div>
                    <div className="col-md-8">
                        <div className="user-options courses-list d-flex flex-column my-3 overflow-auto" style={{maxHeight: '600px'}}>
                            {teacher.subjects?.length > 0 
                                ? teacher
                                    .subjects
                                    .map(
                                        (course: ObjectCourse) => 
                                            <CardTeacherCourse 
                                                key={course.id}
                                                course={course}
                                                teacher={teacher.name}
                                            />
                                    ) 
                                : "Don't have courses"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherCourses
