import Navbar from "../../components/Navbar/Navbar.tsx";

const Courses = () => {
    return (
        <div>
            <Navbar />
            <div>
                <p>Nickname</p>
                <p>example@example.com</p>
            </div>
            <div>
                <button>Change password</button>
                <button>Change Email</button>
                <button>Change Nickname</button>
            </div>
        </div>
    );
}
export default Courses;