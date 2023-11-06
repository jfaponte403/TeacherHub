import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.tsx";
import { useState } from "react";
import { axiosInstance, getData } from "../../api";
const TeachersAdmin = () => {
    const initialData = [
        {
            "id": "8bd456db-63ff-4344-9aa0-cc8ad5eb8e41",
            "name": "Gerardo Alberto Castang Montiel",
            "subjects": [
                {
                    "id": "bf17389a-69f1-4226-9b38-6dddef3932b1",
                    "name": "Calculo Integral"
                },
                {
                    "id": "d2c83095-be06-4821-8348-0c4ea81949fa",
                    "name": "Calculo Multivariado"
                }
            ]
        },
        {
            "id": "2865a286-1e4f-4963-a341-ae9c1b5c7941",
            "name": "Edicson Ferney Bareño Romero",
            "subjects": [
                {
                    "id": "bf17389a-69f1-4226-9b38-6dddef3932b1",
                    "name": "Calculo Integral"
                }
            ]
        },
        {
            "id": "bcbf2994-64da-4cb5-8176-a477e60b283e",
            "name": "Juan Carlos Salazar Gualdron",
            "subjects": [
                {
                    "id": "bf17389a-69f1-4226-9b38-6dddef3932b1",
                    "name": "Calculo Integral"
                }
            ]
        },
        {
            "id": "4fe69500-f3a3-40b8-8638-87359cf7ec01",
            "name": "Pepito",
            "subjects": []
        }
    ];

    const [data, setData] = useState(initialData);

    function test() {
        console.log(localStorage.getItem('token'));
        getData(
            axiosInstance,
            'teacherhub/api/teachers',
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
            <NavbarAdmin courses={false} teacher={true} users={false} />
            <div className="container">

                <div className="text-center mt-4">
                    <h1>Users</h1>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Teacher</th>
                        <th>Subjects</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>
                                <ul>
                                    {user.subjects.map(subject => (
                                        <li key={subject.id}>{subject.name}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleModify(user.id)}
                                >
                                    Modify
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user.id)}
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
}


export default TeachersAdmin