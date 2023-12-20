import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { followUser, unfollowUser } from '../../src/Subscription/Subscription';

export function UserDifferent({ userId }) {
    const { currentUser } = useContext(UserContext);
    const [profileUser, setProfileUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const profileUserData = await getProfileUserFromDatabase(userId);
            setProfileUser(profileUserData);

            // Vérifier si l'utilisateur actuel suit déjà le profil de l'utilisateur sélectionné
            const isCurrentUserFollowing = currentUser && currentUser.following.includes(userId);
            setIsFollowing(isCurrentUserFollowing);
        };

        fetchData();
    }, [currentUser, userId]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                // Désabonner l'utilisateur actuel du profil de l'utilisateur sélectionné
                await unfollowUser(currentUser.uid, userId);
            } else {
                // Abonner l'utilisateur actuel au profil de l'utilisateur sélectionné
                await followUser(currentUser.uid, userId);
            }

            // Mettre à jour isFollowing après l'action
            setIsFollowing(!isFollowing);

            // Met à jour le compteur personnel d'abonnements sur la page du profil de l'utilisateur actuel
            const updatedProfileUserData = await getProfileUserFromDatabase(currentUser.uid);
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
const getProfileUserFromDatabase = async (userId) => {
    try {
        const userSnapshot = await firestore.collection('utilisateurs').doc(userId).get();

        if (userSnapshot.exists) {
            const userData = userSnapshot.data();
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
export default UserDifferent;
