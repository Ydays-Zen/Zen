import { useContext } from 'react';
import { UserContext } from '../context/userContext';

import '../pages/Profil/profil.css';
import profil_image from '../assets/exemple_pp.jpeg';
import edit_image from '../assets/edit.svg';

export function Info_profil() {
    const { followerCount, followingCount, currentUser } = useContext(UserContext);

    //const userName = currentUser ? currentUser.displayName : "Utilisateur";
    const userEmail = currentUser ? currentUser.email : "utilisateur@example.com";

    return (
        <div>
            <div className="container_info">
                <div className="image_profil">
                    <img src={profil_image} alt="" />
                </div>
                <div className="info_profil">
                    <div className="name">
                        {/* <h4>{userName}</h4> */}
                        <h4>{userEmail}</h4>
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
                <div className="edit_profil">
                    <img src={edit_image} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Info_profil;
