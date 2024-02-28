import React, { useState, useEffect, useContext } from 'react';
import { firestore } from '../db/firebase-config';

export function Info_userDifferent({ userId }) { 
    const [profileUser, setProfileUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileUserData = await getProfileUserFromDatabase(userId); 
                setProfileUser(profileUserData);

                // Vérifie si l'utilisateur actuel suit l'utilisateur cible
                const isCurrentUserFollowing = profileUserData.followers.includes(currentUser.uid); 
                setIsFollowing(isCurrentUserFollowing);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du profil :', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                // Si l'utilisateur suit déjà, arrêtez de suivre
                await unfollowUser(currentUser.uid, userId);
            } else {
                // Sinon, commencez à suivre
                await followUser(currentUser.uid, userId);
            }

            // Met à jour l'état après le suivi / non-suivi réussi
            setIsFollowing(!isFollowing);
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

const getProfileUserFromDatabase = async (userId) => {
    try {
        const userSnapshot = await firestore.collection('utilisateurs').doc(userId).get();

        if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            return {
                name: userData.name || 'Nom de l\'utilisateur',
                followersCount: userData.followers ? userData.followers.length : 0,
                followingCount: userData.following ? userData.following.length : 0,
                followers: userData.followers || [],
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

const followUser = async (followerId, userIdToFollow) => {
    try {
        await firestore.collection('utilisateurs').doc(userIdToFollow).update({
            followers: firestore.FieldValue.arrayUnion(followerId)
        });
    } catch (error) {
        console.error('Erreur lors du suivi de l\'utilisateur :', error);
    }
};

const unfollowUser = async (followerId, userIdToUnfollow) => {
    try {
        await firestore.collection('utilisateurs').doc(userIdToUnfollow).update({
            followers: firestore.FieldValue.arrayRemove(followerId)
        });
    } catch (error) {
        console.error('Erreur lors du désabonnement de l\'utilisateur :', error);
    }
};

export default Info_userDifferent;
