import { useContext, useEffect, useState } from "react";
import SubManager from "../../components/SubManager.jsx";
import Subscription from "../../components/Subscription.jsx";
import { UserContext } from "../../context/userContext";
// import SubManager from "../../components/SubManager.jsx";
import Info_profil from "../../components/Info_profil.jsx";
import Oeuvres_profil from "../../components/Oeuvres_profil.jsx";
import { firestore } from "../../db/firebase-config";

import "./Profil.css";
import NavBar from "../../components/NavBar.jsx";
import NavBarDesktop from "../../components/NarBarDesktop.jsx";

function Profil() {
  const { currentUser } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768 est un exemple de largeur pour basculer vers la version mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifie la taille de l'écran au chargement de la page

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <header>
      {isMobile ? <NavBar /> : <NavBarDesktop />}
      </header>
      <main className="mainProfil">
        <Info_profil />
        <Oeuvres_profil />
      </main>

      <Subscription onFollow={handleFollow} />
    </>
  );
}

export default Profil;
