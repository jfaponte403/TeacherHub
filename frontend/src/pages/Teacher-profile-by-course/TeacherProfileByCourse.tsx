import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import Comment from "../../components/comment/Comment.tsx";

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
                        <div className="user-options courses-list d-flex flex-column my-3">
                            <div>
                                <div className="form-group my-2">
                                    <label htmlFor="comentario">Write your review</label>
                                    <textarea className="form-control" id="comentario" rows={3} placeholder="Write your comment"></textarea>
                                </div>
                                <div className="form-group my-2 d-flex align-items-center justify-content-end">
                                    <label htmlFor="calificacion" className="mr-2">Grade</label>
                                    <select className="form-control mx-2" id="calificacion" style={{ width: "80px" }}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                    <button className="btn btn-primary mx-2">Send</button>
                                </div>


                            </div>
                            <div className="comments-list">
                                <Comment comment='Comment 1, idk what is this' />
                                <Comment comment='Comment 2, idk what is this' />
                                <Comment comment='Comment 3, idk what is this' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherProfileByCourse
