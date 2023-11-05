import teacherIcon  from '../../assets/teacher.png';
import {Link} from "react-router-dom";
import { Teacher as ObjectTeacher } from '../../interfaces/teacher';

const Teacher = ({ teacher } : { teacher: ObjectTeacher }) => {
    return (
        <div className="row justify-content-center border p-3 m-4">
            <div className="col-2">
                <img src={teacherIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 d-flex flex-column align-items-start">
                <p className="fs-3"><b>{teacher.name}</b></p>
                <Link to={teacher.id}>See his courses</Link>
            </div>
        </div>

    );
}

export default Teacher;