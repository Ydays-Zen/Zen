import { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import { Outlet, useLocation, Navigate } from "react-router-dom";


const Private = () => {
  const { currentUser } = useContext(UserContext);

  const location = useLocation();
  if (!currentUser) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Private;