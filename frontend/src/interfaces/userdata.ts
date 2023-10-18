type role = {
    id: number;
    name: string;
}

interface UserData {
    id: string;
    username: string;
    email: string;
    password: string;
    is_active: boolean;
    role: role;
}