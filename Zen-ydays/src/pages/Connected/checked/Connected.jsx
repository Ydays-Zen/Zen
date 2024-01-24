import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../../../context/userContext.jsx";
import { auth } from "../../../db/firebase-config.jsx";
const cookies = new Cookies();

import "./style.css";

import Header from "../../../layout/home/Header.jsx";
import Main from "../../../layout/home/Main.jsx";

const Connected = () => {
  const navigate = useNavigate();

  //Recuperation de l'utilisateur connecté
  const { currentUser } = useContext(UserContext);

  const userId = currentUser.uid;
  

    console.log('User ID:', userId);
    console.log('Pseudo:', currentUser.displayName);

  // Deconnexion
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
