import { UserContext } from "../../../context/userContext.jsx";
import { useContext } from "react";
import { auth } from "../../../db/firebase-config.jsx";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      {currentUser && <h2>Welcome {currentUser.email}</h2>}
      {currentUser && <button onClick={logOut}>Log Out</button>}
    </div>
  );
};

export default Connected;
