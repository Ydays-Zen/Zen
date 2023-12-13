import { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import { Outlet, useLocation, Navigate } from "react-router-dom";
<<<<<<< HEAD
=======
import Header from "../../layout/Header.jsx";
import Nav from "../../layout/Nav.jsx";
import '../../pages/Connected/checked/Check.css';
>>>>>>> 4820c9669889840e48fdc72df872882c039a5bf4

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