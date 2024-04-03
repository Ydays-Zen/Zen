import { useContext } from 'react';
import { UserContext } from '../context/userContext';

import "./styles/infoProfil.css";

export function Info_profil() {
  const { followerCount, followingCount, currentUser } =
    useContext(UserContext);

  return (
    <div className="container_info">
      <div className="imgProfil">
        <img src={currentUser.photoURL} alt="" />
      </div>

      <div className="info_profil">
        <div className="name">
          <h2>{currentUser.displayName}</h2>
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

<<<<<<< HEAD
export default Info_profil;
=======
export default Info_profil;
>>>>>>> e64309d8412e3c09c0cfdbea3f6f3b2f99a77e75
