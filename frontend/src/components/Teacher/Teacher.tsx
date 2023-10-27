import teacherIcon  from '../../assets/teacher.png';
import {Link} from "react-router-dom";
const Teacher = ({ name, link, description } : { name: string, link: string, description: string }) => {
    return (
        <div className="row justify-content-center border p-3 m-2">
            <div className="col-2">
                <img src={teacherIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 d-flex flex-column align-items-start">
                <p className="font-weight-bold">{name}</p>
                <Link to={link}> {description} </Link>
            </div>
        </div>

    );
}

export default Teacher;