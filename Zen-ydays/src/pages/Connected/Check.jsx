import { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const Private = () => {
    const { currentUser } = useContext(UserContext); // Correction de la faute de frappe
    const location = useLocation();
    if (!currentUser) {
        return <Navigate to={'/'} state={{ from: location }} />;
    }

    return (
        <div>
            <h5>Private</h5>
            <Outlet />
        </div>
    );
};

export default Private;
