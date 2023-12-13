import { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import "./checked/Check.css";

const Private = () => {
  const { currentUser } = useContext(UserContext);

  const location = useLocation();
  if (!currentUser) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }
  return (
    <div className="test2">
      <Outlet />
    </div>
  );
};

export default Private;