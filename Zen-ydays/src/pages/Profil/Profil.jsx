import { useContext } from "react";
import SubManager from "../../components/SubManager.jsx";
import Subscription from "../../components/Subscription.jsx";
import { UserContext } from "../../context/userContext";
// import SubManager from "../../components/SubManager.jsx";
import { firestore } from "../../db/firebase-config";
import Header from "../../layout/profil/Header.jsx";
import Main from "../../layout/profil/Main.jsx";

import "./Profil.css";

function Profil() {
  const { currentUser } = useContext(UserContext);

  const handleFollow = async (targetUserId) => {
    try {
      const targetUserDoc = await firestore
        .collection("utilisateurs")
        .doc(targetUserId)
        .get();

      if (targetUserDoc.exists) {
        const targetDisplayName = targetUserDoc.data().displayName;

        const subscription = new Subscription(currentUser.displayName);
        await subscription.followUser(targetUserId);

        const subManager = new SubManager(
          currentUser.displayName,
          targetDisplayName
        );
        await subManager.follow();

        console.log(`Vous suivez l'utilisateur avec l'ID : ${targetUserId}`);
      } else {
        console.error("Utilisateur cible non trouvé");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur cible :",
        error
      );
    }
  };

  return (
    <>
      <Header />
      <Main />

      <Subscription onFollow={handleFollow} />
    </>
  );
}

export default Profil;
