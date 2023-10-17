import {Link} from "react-router-dom";

const Register = () => {
    return (
        <div>
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
            </div>
        </div>
    );
}
export default Register;