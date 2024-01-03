import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
<<<<<<< HEAD
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../db/firebase-config.jsx'; // Assurez-vous que le chemin est correct
=======
import "./Profil.css";
import SubManager from "../../SubManager/SubManager.jsx";
import Info_profil from "../../components/info_profil.jsx";
import Oeuvres_profil from "../../components/oeuvres_profil.jsx";
import Last_lecture_profil from "../../components/last_lecture_profil.jsx";
import Header from "../../layout/home/Header.jsx";
import Nav from "../../layout/Nav.jsx";
>>>>>>> 8f602c239bc612ce025b82cc82d0beaee84d9dda

function Profil() {
  const currentUserId = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, 'utilisateurs', currentUserId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur", error);
      }
    };

    if (currentUserId) {
      fetchUserData();
    }
  }, [currentUserId]);



  return (
    <>
      <div className="Profil">
        <h1>Profil</h1>
        <div className="Profil-Container">
          <div className="Profil-Container-Info">
            <div>
              <h2>Profil de l&apos;utilisateur</h2>
            </div>
            <div className="Profil-Container-Info-Name">
              <h2>Nom</h2>
              <p>{currentUserId.email}</p>
            </div>
            <div className="Profil-Container-Info-Email">
              <h2>Email</h2>
              <p>{userData?.email}</p>
            </div>
            <div className="Profil-Container-Info-Password">
              <h2>Mot de passe</h2>
              <p>**********</p>
            </div>
            <div className="Profil-Container-Info-Edit">
              <button>Modifier</button>
            </div>
          </div>
          <div className="Profil-Container-Posts">
            <h2>Posts</h2>
            <div className="Profil-Container-Posts-Post">
              <h3>Titre</h3>
              <p>Contenu</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profil;
