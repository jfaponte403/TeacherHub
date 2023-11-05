import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import Teacher from "../../components/Teacher/CardTeacher.tsx";

const TeacherListByCourse = () => {
    return (
        <>
            <NavbarLogged teacher={false} courses={true} profile={false} />
            <div className="container d-flex align-items-center flex-column" style={{ minHeight: '100vh' }}>
                <div className="container-search mt-4">
                    <div className="input-group">
                        {/*?????*/}
                        <p className="h1"> Equation Differential TEACHERS </p>
                    </div>
                </div>
                {/* list */}
                <div className="courses-list d-flex flex-column my-3 overflow-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Teacher name='Diana Martinez' link='/teachers-profile-by-course' description='review'/>
                    <Teacher name='Edilmo Carvajal' link='/teachers-profile-by-course' description='review'/>
                    <Teacher name='FuckN Ardila' link='/teachers-profile-by-course' description='review'/>
                    <Teacher name='Darin Rocha' link='/teachers-profile-by-course' description='review'/>
                </div>
            </div>
        </>

    );
}
export default TeacherListByCourse;