import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.tsx";
import { useState } from "react";
import { axiosInstance, getData } from "../../api";

const UsersAdmin = () => {
    const initialData = [
        {
            "id": "394819fc-70cf-4ea8-939d-a54560392da4",
            "nickname": "FaihdP",
            "email": "faihdpineda321@gmail.com",
            "id_role": 1,
            "_active": true
        },
        {
            "id": "1da2674c-0e00-49e0-8ef6-561dc86c46b7",
            "nickname": "DavidK1412",
            "email": "dhcasallasb@udistrital.edu.co",
            "id_role": 2,
            "_active": true
        },
        {
            "id": "76ef64b1-feb9-4387-9466-20d9945c257b",
            "nickname": "ElBarto",
            "email": "jfaponteg@udistrital.edu.co",
            "id_role": 1,
            "_active": true
        }
    ];

    const [data, setData] = useState(initialData);

    function test() {
        console.log(localStorage.getItem('token'));
        getData(
            axiosInstance,
            'teacherhub/api/users',
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
            <NavbarAdmin courses={false} teacher={false} users={true} />
            <div className="container">

                <div className="text-center mt-4">
                    <h1>Users</h1>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Nickname</th>
                        <th>Email</th>
                        <th>ID Role</th>
                        <th>Active</th>
                        <th>Modify</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.nickname}</td>
                            <td>{item.email}</td>
                            <td>{item.id_role}</td>
                            <td>{item._active ? "Active" : "Inactive"}</td>
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
}

export default UsersAdmin;
