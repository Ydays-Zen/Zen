import { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "../../layout/Header.jsx";
import Nav from "../../layout/Nav.jsx";
import '../../pages/Connected/checked/Check.css';

const Private = () => {
    const { currentUser } = useContext(UserContext);

    const location = useLocation();
    if (!currentUser) {
        return <Navigate to={"/"} state={{ from: location }} />;
    }
    return (
        <div className="test2">
            <Header />
            <h5>Private</h5>
            <Outlet />
            <Nav />
        </div>
    );
};

export default Private;