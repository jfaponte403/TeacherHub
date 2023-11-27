import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import Course from "../../components/Course/CardCourse.tsx";
import { Course as ObjectCourse } from "../../interfaces/course.ts";
import { useState, useEffect } from "react";
import { axiosInstance, getData } from "../../api";
import {generarPDF} from "../Pdf-Generator/Pdfgeneratorcourses.ts";

const Courses = () => {
    const [courses, setCourses] = useState<[ObjectCourse] | []>([]);

    useEffect(() => {
        const fetchCourses = () => {
            getData(
                axiosInstance,
                'teacherhub/api/subjects',
                // TODO: change the token for a token load in cookies
                {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                }
    
            ).then(({ data }) => {
                setCourses(data as [ObjectCourse]);
            }).catch((error) => {
                console.error(error);
            })
        };

        fetchCourses();
    }, [setCourses]);

    const funcion = () => {
        generarPDF(courses, "Lista de cursos");
    };

    return (
        <>
            <NavbarLogged teacher={false} courses={true} profile={false} pdf={false} />
            <div className="container d-flex align-items-center flex-column">
                <div className="container-search mt-4">
                    <div className="input-group">
                        <input type="text" className="form-control mx-2" placeholder="Search a course" />
                        <div className="input-group-append">
                            <button className="btn-orange btn" type="button">Search</button>
                        </div>
                    </div>
                </div>
                <div className="input-group-append">
                    <button className="btn-orange btn" type="button" onClick={funcion}>PDF</button>
                </div>
                <div className="courses-list d-flex flex-column my-3 overflow-auto">

                    {courses.length > 0 
                        ? courses.map(course => <Course key={course.id} course={course}/>) 
                        : "Loading courses..."}
                </div>
            </div>
        </>
    );
}
export default Courses;