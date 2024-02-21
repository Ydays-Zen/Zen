import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Subscription  from "../../components/Subscription.jsx";
import SubManager from "../../components/SubManager.jsx";
import Last_lecture_profil from "../../components/last_lecture_profil.jsx";
// import SubManager from "../../components/SubManager.jsx";
import Info_profil from "../../components/Info_profil.jsx";
import Oeuvres_profil from "../../components/Oeuvres_profil.jsx";
import Header from "../../layout/home/Header.jsx";
import "./Profil.css";

function Profil() {
  const { currentUser } = useContext(UserContext);

  const handleFollow = async (targetUserId) => {
    try {
      const targetUserDoc = await firestore.collection('utilisateurs').doc(targetUserId).get();
  
      if (targetUserDoc.exists) {
        const targetDisplayName = targetUserDoc.data().displayName;
  
        const subscription = new Subscription(currentUser.displayName);
        await subscription.followUser(targetUserId);
  
        const subManager = new SubManager(currentUser.displayName, targetDisplayName);
        await subManager.follow();
  
        console.log(`Vous suivez l'utilisateur avec l'ID : ${targetUserId}`);
      } else {
        console.error("Utilisateur cible non trouvé");
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur cible :', error);
    }
  };
  

  return (
    <>
      <Header />
      <Info_profil />
      <Oeuvres_profil />
      <Last_lecture_profil />
      <Subscription onFollow={handleFollow} />
    </>
  );
}

export default Profil;
