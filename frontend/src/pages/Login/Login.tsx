import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h1>TeacherHub</h1>
            <div>
                <form>
                    <label>Email</label>
                    <input type="email"/>

                    <label>Password</label>
                    <input type="password"/>
                </form>
                <p>Forget your password?</p>
                <Link to="/home-user">Login</Link>
            </div>
        </div>
    );
}
export default Login;