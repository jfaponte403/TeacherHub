import {useEffect, useState} from "react";
import NavbarLogged from "../../components/NavbarLogged/NavbarLogged.tsx";
import CardTeacher from "../../components/Teacher/CardTeacher.tsx";
import { Teacher as ObjectTeacher } from "../../interfaces/teacher.ts";
import { getData } from "../../api/methods.ts";
import { axiosInstance } from "../../api/index.ts";
import {generarPDF} from "../Pdf-Generator/Pdfgenerator.ts";

const Teachers = () => {
    const [teachers, setTeachers] = useState<[ObjectTeacher] | []>([]);
    
    useEffect(() => {
        const fetchTeachers = () => {
            getData(
                axiosInstance,
                'teacherhub/api/teachers',
                // TODO: change the token for a token load in cookies
                {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
    
            ).then(({ data }) => {
                console.log(data)
                setTeachers(data as [ObjectTeacher]);
            }).catch((error) => {
                console.error(error);
            })
        };

        fetchTeachers();
    }, [setTeachers]);

    const funcion = () => {
        generarPDF(teachers, "Lista de profesores");
    };


    return (
        <>
            <NavbarLogged teacher={true} courses={false} profile={false}/>
            <div className="container d-flex align-items-center flex-column">
                <div className="container-search mt-4">
                    <div className="input-group">
                        <input type="text" className="form-control mx-2" placeholder="Search a teacher" />
                        <div className="input-group-append">
                            <button className="btn-orange btn" type="button">Search</button>
                        </div>
                    </div>
                </div>
                <div className="input-group-append">
                    <button className="btn-orange btn" type="button" onClick={funcion}>PDF</button>
                </div>
                <div className="courses-list d-flex flex-column my-3 overflow-auto">
                    {teachers.length > 0 
                        ? teachers.map(teacher => <CardTeacher key={teacher.id} teacher={teacher}/>) 
                        : "Loading teachers..."}
                </div>
            </div>
        </>
    );
}
export default Teachers;