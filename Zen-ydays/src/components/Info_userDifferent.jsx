import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import  Subscription  from "./Subscription.jsx";
import { firestore } from '../db/firebase-config'; 

export function Info_userDifferent({ displayName }) { 
    const { currentUser } = useContext(UserContext);
    const [profileUser, setProfileUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Current User:', currentUser); 
            const profileUserData = await getProfileUserFromDatabase(displayName); 
            console.log('Profile User Data:', profileUserData);
            setProfileUser(profileUserData);

            const isCurrentUserFollowing = currentUser && currentUser.following.includes(displayName); 
            setIsFollowing(isCurrentUserFollowing);
        };

        fetchData();
    }, [currentUser, displayName]);

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await Subscription.unfollowUser(currentUser.displayName, displayName);
            } else {
                await Subscription.followUser(currentUser.displayName, displayName);
            }

            setIsFollowing(!isFollowing);
            const updatedProfileUserData = await getProfileUserFromDatabase(currentUser.displayName);
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

const getProfileUserFromDatabase = async (displayName) => {
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