// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Kanban from "./pages/Kanban";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Routes>
            {/* Rotte pubbliche */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotte protette */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/kanban"
                element={
                    <PrivateRoute>
                        <Kanban />
                    </PrivateRoute>
                }
            />

            {/* Redirect default */}
            <Route path="*" element={<Login />} />
        </Routes>
    );
}

export default App;
