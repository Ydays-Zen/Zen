// Filename: Profil.jsx
// Description: This file contains the code for displaying a user's profile information on their own page and editing it if they have permission to do so
// Last Modified: 2021-08-31T14:50:00-03:00

import "./Profil.css";
import SubManager from './SubManager';
function Profil() {

    const UserProfil = ({targetUserId}) => {
        const currentUserId = 'ID_utilisateur'

        const handleFollow = () =>{
            SubManager.follow(currentUserId, targetUserId)
        }
    }

    return (
        <>
        <div className="Profil">
            <h1>Profil</h1>
            <div className="Profil-Container">
                <div className="Profil-Container-Info">
                    <div>
                        <h2>
                            Profil de l'utilisateur
                        </h2>
                        <button onClick={handleFollow}>Follow</button>
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
