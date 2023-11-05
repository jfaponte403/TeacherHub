import bookIcon  from '../../assets/book.png';
import {Link} from "react-router-dom";
import { Course as ObjectCourse } from '../../interfaces/course';

const Course = ({ course } : { course: ObjectCourse}) => {
    return (
        <div className="row justify-content-center border p-3 m-4 rounded">
            <div className="col-2">
                <img src={bookIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 d-flex flex-column align-items-start">
                <p className="fs-3"><b>{ course.name }</b></p>
                <Link to={course.id}> See {course.name.toLowerCase()} teachers</Link>
            </div>
        </div>
    );
}

export default Course;