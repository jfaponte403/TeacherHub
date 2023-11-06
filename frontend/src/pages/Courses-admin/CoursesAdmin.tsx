import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.tsx";
import { axiosInstance, getData } from "../../api";
import { useState } from 'react';

const CoursesAdmin = () => {
    const initialData = [
        {
            "id": "bf17389a-69f1-4226-9b38-6dddef3932b1",
            "name": "Calculo Integral"
        },
        {
            "id": "d2c83095-be06-4821-8348-0c4ea81949fa",
            "name": "Calculo Multivariado"
        },
        {
            "id": "ec9d9811-9722-4957-8546-f00b80b4cbdd",
            "name": "Aplicaciones para internet"
        }
    ];

    const [data, setData] = useState(initialData);

    function test() {
        console.log(localStorage.getItem('token'));
        getData(
            axiosInstance,
            '/teacherhub/api/subjects',
            {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        ).then(response => {
            console.log(response);
        });
    }

    const handleDelete = (id: string) => {
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
    };

    const handleModify = (id: string) => {
        console.log(id)
    };

    return (
        <>
            <NavbarAdmin courses={true} teacher={false} users={false} />
            <div className="container">

                <div className="text-center mt-4">
                    <h1>Courses</h1>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Name</th>
                        <th>Modify</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleModify(item.id)}
                                >
                                    Modify
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="text-center mt-4">
                    <button onClick={test} className="btn btn-outline-orange">Create</button>
                </div>

            </div>
        </>
    );
};

export default CoursesAdmin;
