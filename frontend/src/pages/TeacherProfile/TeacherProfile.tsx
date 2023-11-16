import { useLocation } from "react-router-dom";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import { Course } from "../../interfaces/course.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {axiosInstance, getData, postData} from "../../api";
import {jwtDecode} from "jwt-decode";
import {Teacher} from "../../interfaces/teacher.ts";
import CardComment from "../../components/comment/Comment.tsx";

interface FormData {
    comment: string;
    grade: string;
}

interface PayLoadComment {
    id: string,
    idStudent: string,
    idTeacherSubject: string,
    comment: string,
    isPositive: boolean,
    note: number
}

interface Student {
    id: string;
    nickname: string;
    email: string;
}

interface Comment {
    id: string;
    student: Student;
    comment: string;
    isPositive: boolean;
    note: number;
}

const TeacherProfile = () => {
    const { teacher, course }: { teacher: Teacher; course: Course } = useLocation().state;
    const [commentList, setCommentList] = useState<Comment[]>([])
    const [formData, setFormData] = useState<FormData>({
        comment: '',
        grade: '1',
    });

    const fetchData = () => {
        getData(
            axiosInstance,
            `teacherhub/api/grades/798d9acf-1ab1-43cc-bb78-ef7e2c6a9a20`,
            {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        ).then(response => {
            console.log(response)

            if(response.status === 200){
                console.log('response')

                setCommentList(response.data)
            }
        }).catch(error => {
            console.error(error)
        })
    }

    useEffect(()=>{
        fetchData()
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            grade: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        interface JwtPayload {
            user_id: string;
        }

        const user: JwtPayload = jwtDecode(`${localStorage.getItem('token')}`);

        const payload: PayLoadComment = {
            id: crypto.randomUUID(),
            idStudent: user.user_id,
            idTeacherSubject: '798d9acf-1ab1-43cc-bb78-ef7e2c6a9a20',
            comment: formData.comment,
            isPositive: Number(formData.grade) >= 3,
            note: Number(formData.grade)
        }

        console.log(payload)

        postData(
            axiosInstance,
            'teacherhub/api/grades',
            payload,
            {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        ).then(response => {
            console.log(response)
        }).catch(error => console.error(error))

    }

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
                            <p className="my-2">{teacher.name}</p>
                            <p className="my-2">{course.name}</p>
                            <p className="my-2">Defeat: </p>
                            <p className="my-2">Grade: </p>
                        </aside>
                    </div>
                    <div className="col-md-8">
                        <div className="user-options courses-list d-flex flex-column my-3">
                            <form className="mb-5" onSubmit={handleSubmit}>
                                <div className="form-group my-2">
                                    <label htmlFor="comment">Write your review</label>
                                    <textarea
                                        className="form-control"
                                        id="comment"
                                        rows={3}
                                        placeholder="Write your comment"
                                        value={formData.comment}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="form-group my-2 d-flex align-items-center justify-content-end">
                                    <label htmlFor="calificacion" className="mr-2">
                                        Grade
                                    </label>
                                    <select
                                        className="form-control mx-2"
                                        id="calificacion"
                                        style={{ width: '80px' }}
                                        value={formData.grade}
                                        onChange={handleSelectChange}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                    <button type="submit" className="btn btn-primary mx-2">
                                        Send
                                    </button>
                                </div>
                            </form>

                            {commentList.map((comment: Comment) => (
                                <CardComment comment={comment} />
                            ))}

                            <div className="comments-list">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherProfile
