import { Link } from "react-router-dom";
import bookIcon  from '../../assets/book.png';
import { Course as ObjectCourse } from '../../interfaces/course';
import { Teacher } from "../../interfaces/teacher";

function CardTeacherCourse({ course, teacher }: { course: ObjectCourse, teacher: Teacher }) {
  return (
    <div className="justify-content-center border m-4 rounded">
      <Link to="/teacher-profile" state={{ course, teacher }} className="row p-3 link-offset-2 link-underline link-underline-opacity-0">
        <div className="col-2">
            <img src={bookIcon} alt="" className="img-fluid" />
        </div>
        <div className="col-10 d-flex flex-column align-items-center ">
          <p className="h3 text-white"><b>{ course.name }</b></p>
        </div>
      </Link>
    </div>
  )
}

export default CardTeacherCourse
