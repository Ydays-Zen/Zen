import { useContext } from 'react';
import { UserContext } from '../context/userContext';

import "../pages/Profil/Profil.css";

export function Info_profil() {
  const { followerCount, followingCount, currentUser } =
    useContext(UserContext);

  //const userName = currentUser ? currentUser.displayName : "Utilisateur";
  const userEmail = currentUser ? currentUser.email : "utilisateur@example.com";

  return (
    <div className="container_info">
      <div className="info_profil">
        <div className="name">
          <div className="imgProfil">
            <img src={currentUser.photoURL} alt="" />
          </div>
          <h2>{userEmail.slice(0, 5).toUpperCase()}...</h2>
        </div>
        <div className="info_follow">
          <div className="followers">
            <p>Followers</p>
            <p>{followerCount}</p>
          </div>
          <div className="following">
            <p>Following</p>
            <p>{followingCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info_profil;
