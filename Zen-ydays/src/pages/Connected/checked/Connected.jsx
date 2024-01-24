import { UserContext } from "../../../context/userContext.jsx";
import { useContext} from "react";
import { auth} from "../../../db/firebase-config.jsx";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

import "./style.css";

import Header from "../../../layout/home/Header.jsx";
import Main from "../../../layout/home/Main.jsx";

const Connected = () => {
  const navigate = useNavigate();

  //Recuperation de l'utilisateur connecté
  const { currentUser } = useContext(UserContext);

<<<<<<< HEAD
  const userId = currentUser.uid;
  

    console.log('User ID:', userId);
    console.log('Pseudo:', currentUser.displayName);

=======
  // Deconnexion
>>>>>>> 7e438c0f84660b979cdd97b1c4011bbee6095d40
  const logOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      navigate("/signin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="connected">
      <Header />
      {/* {currentUser && <h2>Welcome {currentUser.email}</h2>} */}
      {/* {currentUser && <button onClick={logOut}>Log Out</button>} */}
      <Main />
    </div>
  );
};

export default Connected;
