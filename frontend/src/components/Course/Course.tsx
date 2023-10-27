import bookIcon  from '../../assets/book.png';
import {Link} from "react-router-dom";
const Course = ({ course, link } : { course: string, link: string }) => {
    return (
        <div className="row justify-content-center border p-3 m-2">
            <div className="col-2">
                <img src={bookIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 d-flex flex-column align-items-start">
                <p className="font-weight-bold"> {course} </p>
                {/* Redirige a tu URL deseada */}
                <Link to={link}> See more {course} teachers</Link>
            </div>
        </div>
    );
}

export default Course;