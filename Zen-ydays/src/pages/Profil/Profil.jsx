import { useContext } from "react";
import { UserContext } from "../../context/userContext";
// import "./Profil.css";


function Profil() {
  const currentUserId = useContext(UserContext); 

  // const handleFollow = (targetUserId) => {
  //   SubManager.follow(currentUserId, targetUserId);
  //   console.log(`Vous suivez l'utilisateur avec l'ID : ${targetUserId}`);
  // };

  return (
    <>
      <div className="Profil">
        <h1>Profil</h1>
        <div className="Profil-Container">
          <div className="Profil-Container-Info">
            <div>
              <h2>Profil de l&apos;utilisateur</h2>
              {/* Ajoutez les parenthèses pour appeler correctement handleFollow */}
              <button onClick={() => handleFollow()}>Follow</button>
            </div>
            <div className="Profil-Container-Info-Name">
              <h2>Nom</h2>
              <p>Prénom</p>
            </div>
            <div className="Profil-Container-Info-Email">
              <h2>Email</h2>
              <p>Adresse email</p>
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
