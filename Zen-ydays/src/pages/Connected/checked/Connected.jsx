import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import { auth } from "../../../db/firebase-config.jsx";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


import Comments from "../../../components/Comments.jsx";
import Header from "../../../layout/Header.jsx";
import UploadImg from "../../../components/UploadImg.jsx";

const Connected = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header />

      {currentUser && <h2>Welcome {currentUser.email}</h2>}
      {currentUser && <button onClick={logOut}>Log Out</button>}

      <Comments />

      <UploadImg />
    </div>
  );
};

export default Connected;