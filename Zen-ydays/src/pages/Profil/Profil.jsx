import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./Profil.css";
import SubManager from "../../SubManager/SubManager.jsx";
import Info_profil from "../../components/info_profil.jsx";
import Oeuvres_profil from "../../components/oeuvres_profil.jsx";
import Last_lecture_profil from "../../components/last_lecture_profil.jsx";
import Header from "../../layout/home/Header.jsx";
import Nav from "../../layout/Nav.jsx";

function Profil() {
  const currentUserId = useContext(UserContext);

  const handleFollow = (targetUserId) => {
    SubManager.follow(currentUserId, targetUserId);
    console.log(`Vous suivez l'utilisateur avec l'ID : ${targetUserId}`);
  };

  return (
    <>
      <Header />
      <Info_profil />
      <Oeuvres_profil />
      <Last_lecture_profil />
      <Nav />
    </>
  );
}

export default Profil;
