import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h2>Welcome, {user.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
            <p>This is your protected Dashboard.</p>
        </div>
    );
};

export default Dashboard;
