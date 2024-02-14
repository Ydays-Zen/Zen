// import SubManager from "../../components/SubManager.jsx";
import Info_profil from "../../components/Info_profil.jsx";
import Last_lecture_profil from "../../components/Last_lecture_profil.jsx";
import Oeuvres_profil from "../../components/Oeuvres_profil.jsx";
import Header from "../../layout/home/Header.jsx";

import "./Profil.css";


function Profil() {
  // const currentUserId = useContext(UserContext);

  // const handleFollow = (targetUserId) => {
  //   SubManager.follow(currentUserId, targetUserId);
  //   console.log(`Vous suivez l'utilisateur avec l'ID : ${targetUserId}`);
  // };

  return (
    <>
      <Header />
      <Info_profil />
      <Oeuvres_profil />
      <Last_lecture_profil />
    </>
  );
}

export default Profil;
