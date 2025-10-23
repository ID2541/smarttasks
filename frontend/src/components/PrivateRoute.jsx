// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Non loggato → redirect a login
        return <Navigate to="/login" replace />;
    }

    // Loggato → renderizza il componente protetto
    return children;
};

export default PrivateRoute;
