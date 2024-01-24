// info_userDifferent.jsx
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import  Subscription  from "./Subscription.jsx";

export function Info_userDifferent({ displayName }) { // Change the prop name to displayName
    const { currentUser } = useContext(UserContext);
    const [profileUser, setProfileUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const profileUserData = await getProfileUserFromDatabase(displayName); // Change the argument to displayName
            setProfileUser(profileUserData);

            // Vérifier si l'utilisateur actuel suit déjà le profil de l'utilisateur sélectionné
            const isCurrentUserFollowing = currentUser && currentUser.following.includes(displayName); // Change the argument to displayName
            setIsFollowing(isCurrentUserFollowing);
        };

        fetchData();
    }, [currentUser, displayName]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                // Désabonner l'utilisateur actuel du profil de l'utilisateur sélectionné
                await Subscription.unfollowUser(currentUser.displayName, displayName); // Change the arguments to displayName
            } else {
                // Abonner l'utilisateur actuel au profil de l'utilisateur sélectionné
                await Subscription.followUser(currentUser.displayName, displayName); // Change the arguments to displayName
            }

            // Mettre à jour isFollowing après l'action
            setIsFollowing(!isFollowing);

            // Met à jour le compteur personnel d'abonnements sur la page du profil de l'utilisateur actuel
            const updatedProfileUserData = await getProfileUserFromDatabase(currentUser.displayName); // Change the argument to displayName
            setProfileUser(updatedProfileUserData);
        } catch (error) {
            console.error('Erreur lors de la gestion d\'abonnement/désabonnement :', error);
        }
    };

    if (!profileUser) {
        return <div>Loading...</div>;
    }

    return (
        <div>
          <div>
            <h4>{profileUser.name}</h4>
            <div>Followers: {profileUser.followersCount}</div>
            <div>Following: {profileUser.followingCount}</div>
          </div>
          <button onClick={handleFollowToggle}>
            {isFollowing ? 'Ne plus suivre' : 'Suivre'}
          </button>
        </div>
      );
}

// récupére les informations du profil de l'utilisateur depuis la base de données
const getProfileUserFromDatabase = async (displayName) => { // Change the argument to displayName
    try {
        const userSnapshot = await firestore.collection('utilisateurs').where('displayName', '==', displayName).get();

        if (userSnapshot.size > 0) {
            const userData = userSnapshot.docs[0].data();
            return {
                name: userData.name || 'Nom de l\'utilisateur',
                followersCount: userData.followers ? userData.followers.length : 0,
                followingCount: userData.following ? userData.following.length : 0,
            };
        } else {
            console.error("L'utilisateur n'existe pas.");
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données du profil :', error);
        return null;
    }
};

export default Info_userDifferent;
