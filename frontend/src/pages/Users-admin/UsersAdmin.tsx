import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {axiosInstance, deleteData, getData, postData, putData} from "../../api";
import {showAlert} from "../../utils/alertPrompts.ts";

interface User {
    id: string;
    nickname: string;
    email: string;
    id_role: number;
    _active: boolean;
}

interface ModifyUser {
    id: string;
    nickname: string;
    email: string;
    id_role: number;
    _active: boolean;
}

interface CreateUser {
    id: string;
    email: string;
    nickname: string;
    password: string;
}

const UsersAdmin = () => {
    const [data, setData] = useState<User[]>([]);
    const [formModifyUser, setFormModifyUser] = useState<boolean>(false)
    const [editingUser, setEditingUser] = useState<ModifyUser | null>(null);
    const [formCreateUser, setFormCreateUser] = useState<boolean>(false)
    const [userData, setUserData] = useState<CreateUser>({
        id: "",
        email: "",
        nickname: "",
        password: "",
    })


    const fetchUserList = () => {
        getData(axiosInstance, 'teacherhub/api/users', {
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
    };

    useEffect(()=>{
        fetchUserList()
    }, [])

    const deleteUser = (id: string): void => {
        deleteData(
            axiosInstance,
            `teacherhub/api/users/${id}`,
            {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        ).then(response => {
            if (response.status === 200) {
                showAlert(
                    {
                        icon: 'success',
                        title: 'user delete',
                        text: 'Thanks for using TeacherHub',
                        buttonText: 'Ok',
                    }
                )
                fetchUserList()
            }
        }).catch(error => {
                console.error(error);
            });
    }

    const handleExitCreate = () => {
        setFormCreateUser(false)
    }

    const handleModifyForm = (user: ModifyUser) => {
        setEditingUser(user);
        setFormModifyUser(true);
    };

    const handleExitModify = () => {
        setEditingUser(null);
        setFormModifyUser(false);
    };

    const modifyUser = () => {
        if (editingUser) {
            putData(
                axiosInstance,
                `teacherhub/api/users`,
                editingUser,
                {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        setFormModifyUser(false);
                        showAlert({
                            icon: "success",
                            title: "User modify",
                            text: "Thanks for using TeacherHub",
                            buttonText: "Ok",
                        });
                        fetchUserList()
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditingUser((prevUser) => {
            if (prevUser) {
                return {
                    ...prevUser,
                    nickname: event.target.value,
                };
            }
            return null;
        });
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditingUser((prevUser) => {
            if (prevUser) {
                return {
                    ...prevUser,
                    email: event.target.value,
                };
            }
            return null;
        });
    };

    const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditingUser((prevUser) => {
            if (prevUser) {
                return {
                    ...prevUser,
                    id_role: parseInt(event.target.value, 10),
                };
            }
            return null;
        });
    };


    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        field: keyof CreateUser
    ) => {
        if (userData) {
            const { value } = event.target;
            setUserData((prevData: CreateUser) => {
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

    const showFormCreateUser = () => {
        setFormCreateUser(true)
    }

    const registerUser = () => {
        const id = crypto.randomUUID();

        const newUser: CreateUser = {
            id: id,
            email: userData?.email,
            nickname: userData?.nickname,
            password: userData?.password,
        };

        postData(axiosInstance,
            '/auth/register',
            newUser,
            {
                'Content-Type': 'application/json'
            }).then( response => {
            if (response.status === 200) {
                getData(axiosInstance, 'teacherhub/api/users', {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                })
                    .then((response) => {
                        if (response.data) {

                            const consultUser = response.data.find((user: User) => user.id === newUser.id);

                            const modifyUser: ModifyUser = {
                                id: newUser?.id,
                                nickname: newUser?.nickname,
                                email: newUser?.email,
                                id_role: consultUser?.id_role,
                                _active: true
                            }


                            putData(
                                axiosInstance,
                                `teacherhub/api/users`,
                                modifyUser,
                                {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                }
                            )
                                .then((response) => {
                                    if (response.status === 200) {
                                        fetchUserList()
                                        showAlert(
                                            {
                                                icon: 'success',
                                                title: 'The user has been created',
                                                text: 'Thanks for using TeacherHub',
                                                buttonText: 'Ok',
                                            }
                                        )
                                        setFormCreateUser(false)
                                    }
                                })
                                .catch((error) => {
                                    console.error(error)
                                });


                        }
                    })
                    .catch((error) => {
                        console.error('Error al obtener la lista de usuarios:', error);
                    });
            }
        }).catch(  error => {
            console.error(error)
        })

    }

    return (
        <>
            <NavbarAdmin courses={false} teacher={false} users={true} />
            <div className="container">

                {formCreateUser && (
                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create the new user</h5>
                                    <button type="button" className="btn btn-outline-orange" onClick={handleExitCreate}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, "email")}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nickname">Nickname:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nickname"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, "nickname")}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, "password")}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-orange" onClick={handleExitCreate}>
                                        Exit
                                    </button>
                                    <button type="button" className="btn btn-orange" onClick={registerUser}>
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {formModifyUser && (
                    <div className="modal" tabIndex={-1} role="dialog" style={{ display: "block" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit User</h5>
                                    <button type="button" className="btn btn-outline-orange" onClick={handleExitModify}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Nickname</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editingUser?.nickname || ""}
                                                onChange={handleNicknameChange}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editingUser?.email || ""}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>ID Role</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editingUser?.id_role || ""}
                                                onChange={handleRoleChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-orange" onClick={handleExitModify}>
                                        Exit
                                    </button>
                                    <button type="button" className="btn btn-orange" onClick={modifyUser}>
                                        Modify
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mt-4">
                    <h1>Users</h1>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Modify</th>
                        <th>Delete</th>

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
                                    onClick={() => handleModifyForm(item)}
                                >
                                    Modify
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={()=>{
                                        deleteUser(item.id)
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="text-center mt-4">
                    <button className="btn btn-outline-orange" onClick={showFormCreateUser}>Create</button>
                </div>

            </div>
        </>
    );
}

export default UsersAdmin;
