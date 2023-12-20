import { useContext } from 'react';
import { UserContext } from '../context/userContext';

import '../pages/Profil/profil.css';
import profil_image from '../assets/exemple_pp.jpeg';

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
                            Followers: {followerCount}
                        </div>
                        <div className="following">
                            Following: {followingCount}
                        </div>
                    </div>
                </div>
                <div className="edit_profil"></div>
            </div>
        </div>
    );
}

export default Info_profil;
