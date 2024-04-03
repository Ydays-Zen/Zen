import { useContext } from "react";
import SubManager from "../../components/SubManager.jsx";
import Subscription from "../../components/Subscription.jsx";
import { UserContext } from "../../context/userContext";
// import SubManager from "../../components/SubManager.jsx";
import Header from "../../layout/profil/Header.jsx";
import Main from "../../layout/profil/Main.jsx";

import "./Profil.css";

function Profil() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default Profil;
