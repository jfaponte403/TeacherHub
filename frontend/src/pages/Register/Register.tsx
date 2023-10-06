import {Link} from "react-router-dom";

const Register = () => {
    return (
        <div>
            <h1>TeacherHub</h1>
            <div>
                <form>
                    <label>Nickname</label>
                    <input type="text"/>

                    <label>Email</label>
                    <input type="email"/>

                    <label>Password</label>
                    <input type="password"/>

                    <label>Confirm your password</label>
                    <input type="password"/>
                </form>
                <Link to="/">Register</Link>
            </div>
        </div>
    );
}
export default Register;