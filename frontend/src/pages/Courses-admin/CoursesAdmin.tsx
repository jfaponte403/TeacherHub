import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.tsx";
import {axiosInstance, deleteData, getData, postData, putData} from "../../api";
import {ChangeEvent, useEffect, useState} from 'react';
import {showAlert} from "../../utils/alertPrompts.ts";

interface Course {
    id: string;
    name: string;
}
// asd
const CoursesAdmin = () => {
    const [data, setData] = useState<Course[]>([]);
    const [courseToModify, setCourseToModify] = useState<Course>({
        id: '',
        name: ''
    })
    const [formToModify, setFormToModify] = useState<boolean>(false)
    const [formToCreate, setFormToCreate] = useState<boolean>(false)
    const [nameCourse, setNameCourse] = useState<string>('')
    const fetchCoursesList = (): void => {
        getData(axiosInstance, '/teacherhub/api/subjects', {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
            .then(response => {
                if (response.data) {
                    setData(response.data);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(()=>{
        fetchCoursesList()
    }, [])

    const deleteCourse = (id: string): void => {
        deleteData(
            axiosInstance,
            `/teacherhub/api/subjects/${id}`,
            {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        ).then(response => {
            if (response.status === 200) {
                showAlert(
                    {
                        icon: 'success',
                        title: 'Course has been deleted',
                        text: 'Thanks for using TeacherHub',
                        buttonText: 'Ok',
                    }
                )
                fetchCoursesList()
            }
        }).catch(error => {
            console.error(error);
        });
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        field: keyof Course
    ) => {
        if (courseToModify) {
            const { value } = event.target;
            setCourseToModify((prevData: Course) => {
                if (prevData) {
                    return {
                        ...prevData,
                        [field]: value,
                    };
                }
                return prevData;
            });
        }
    };

    const handlerShowForm = (item: Course) => {
        setFormToModify(true)
        setCourseToModify(item)
    }

    const handlerShowFormToCreate = () => {
        setFormToCreate(true)
    }

    const handlerExitForm = () => {
        setFormToModify(false)
    }

    const handlerExitFormToCreate = () => {
        setFormToCreate(false)
    }

    const modifyCourse = () =>{
        if (courseToModify) {
            putData(
                axiosInstance,
                `/teacherhub/api/subjects`,
                courseToModify,
                {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        setFormToModify(false);
                        showAlert({
                            icon: "success",
                            title: "The subject has been modify",
                            text: "Thanks for using TeacherHub",
                            buttonText: "Ok",
                        });
                        fetchCoursesList()
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const createCourse = () => {

        const newCourse: Course = {
            id: crypto.randomUUID(),
            name: nameCourse
        }

        postData(axiosInstance,
            '/teacherhub/api/subjects',
            newCourse,
            {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }).then( response => {
                if (response.status === 200){
                    setFormToCreate(false)
                    showAlert({
                        icon: "success",
                        title: "The subject has been created",
                        text: "Thanks for using TeacherHub",
                        buttonText: "Ok",
                    });
                    fetchCoursesList()
                }
        }).catch(  error => {
            console.error(error)
        })
    }

    return (
        <>
            <NavbarAdmin courses={true} teacher={false} users={false} />

            {
                formToCreate && (
                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">CREATE NEW COURSE</h5>
                                    <button type="button" className="btn btn-outline-orange" onClick={handlerExitFormToCreate}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email">Type the new course:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                onChange={(event)=>{setNameCourse(event.target.value)}}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-orange" onClick={handlerExitFormToCreate}>
                                        Exit
                                    </button>
                                    <button type="button" className="btn btn-orange" onClick={createCourse}>
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            {
                formToModify && (
                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">EDIT COURSE</h5>
                                    <button type="button" className="btn btn-outline-orange" onClick={handlerExitForm}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email">Type de the new course name:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={courseToModify.name}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, "name")}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-orange" onClick={handlerExitForm}>
                                        Exit
                                    </button>
                                    <button type="button" className="btn btn-orange" onClick={modifyCourse}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="container">

                <div className="text-center mt-4">
                    <h1>Courses</h1>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={()=>{
                                        handlerShowForm(item)
                                    }}
                                >
                                    Modify
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={()=>{deleteCourse(item.id)}}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="text-center mt-4">
                    <button  className="btn btn-outline-orange" onClick={handlerShowFormToCreate}>Create</button>
                </div>

            </div>
        </>
    );
};

export default CoursesAdmin;
