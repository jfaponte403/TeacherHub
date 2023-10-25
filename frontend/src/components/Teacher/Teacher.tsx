import teacherIcon  from '../../assets/teacher.png';
const Teacher = (  ) => {
    return (
        <div className="row justify-content-center border p-3 m-2">
            <div className="col-2">
                <img src={teacherIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 d-flex flex-column align-items-start">
                <p className="font-weight-bold">Racistang Mongod</p>
                {/* Redirige a tu URL deseada */}
                <p>
                    <a href="#">see racistang courses</a>
                </p>
            </div>
        </div>

    );
}

export default Teacher;