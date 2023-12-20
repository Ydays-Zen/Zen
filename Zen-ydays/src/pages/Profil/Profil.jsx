import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import firebase from "firebase"; // Importez le module Firebase

import "./Profil.css";
import SubManager from '../../SubManager/SubManager.jsx';

function Profil() {
  const currentUserId = useContext(UserContext);

  const handleFollow = (targetUserId) => {
    // Utilisez la fonction d'authentification de Firebase, par exemple
    const auth = firebase.auth();

    // Votre logique de gestion du suivi ici
    SubManager.follow(currentUserId, targetUserId);
    console.log("Vous avez cliqué sur le bouton Follow !");
    // Vous pouvez ajouter d'autres actions à effectuer ici
  };

  // Remplacez targetUserId par la valeur appropriée
  const targetUserId = "ID_de_l_utilisateur_cible";

  return (
    <>
      {/* ... (le reste de votre composant) */}
      <div className="Profil-Container-Info">
        <div>
          <h2>Profil de l&apos;utilisateur</h2>
          <button onClick={() => handleFollow(targetUserId)}>Follow</button>
        </div>
        {/* ... (autres éléments du profil) */}
      </div>
      {/* ... (le reste de votre composant) */}
    </>
  );
}

export default Profil;
