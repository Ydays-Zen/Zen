import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../db/firebase-config'; // Assurez-vous d'importer firestore également
import { collection, doc, updateDoc, arrayUnion, arrayRemove, getDocs, query, where } from 'firebase/firestore'; // Importez les méthodes nécessaires depuis firestore
import PropTypes from 'prop-types';
import SendMessage from '../../components/SendMessage';

const UserResult = ({ user, handleUser }) => {
  const { displayName, ID } = user;
  const [showSendMessage, setShowSendMessage] = useState(false); // État pour contrôler l'affichage de SendMessage
  const [isFollowing, setIsFollowing] = useState(false); // État pour déterminer si l'utilisateur est suivi ou non

  const handleClickMessage = () => {
    handleUser(user); // Passez l'utilisateur sélectionné à la fonction handleUser
    setShowSendMessage(true); // Afficher le composant SendMessage lorsque le bouton est cliqué
  };

  const handleClickFollow = async () => {
    const currentUser = auth.currentUser;
    console.log("Current user:", currentUser);

    const userRef = collection(firestore, "users");
    console.log("User reference:", userRef);

    // Recherchez le document avec le champ ID correspondant à l'UID de l'utilisateur ciblé
    const userQuerySnapshot = await getDocs(query(userRef, where("ID", "==", user.ID)));

    // Recherchez le document de l'utilisateur connecté
    const currentUserQuerySnapshot = await getDocs(query(userRef, where("ID", "==", currentUser.uid)));

    // Vérifiez s'il y a un document correspondant pour l'utilisateur ciblé
    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id; // Obtenez l'ID du document de l'utilisateur ciblé
      console.log("User ID:", userId);

      // Ajoutez l'UID de l'utilisateur connecté au champ follow de l'utilisateur ciblé
      await updateDoc(doc(userRef, userId), {
        follow: arrayUnion(currentUser.uid)
      });

      // Vérifiez s'il y a un document correspondant pour l'utilisateur connecté
      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const currentUserId = currentUserDoc.id; // Obtenez l'ID du document de l'utilisateur connecté
        console.log("Current user ID:", currentUserId);

        // Ajoutez l'UID de l'utilisateur ciblé au champ followers de l'utilisateur connecté
        await updateDoc(doc(userRef, currentUserId), {
          followers: arrayUnion(ID)
        });
      } else {
        console.error("Current user document not found.");
      }

      console.log(`Followed user: ${displayName}`);
      console.log(`Followed userID: ${userId}`);
      console.log("UserConnected : ", currentUser.uid);
    } else {
      console.error("User document not found.");
    }
  };

  const handleClickUnfollow = async () => {
    const currentUser = auth.currentUser;
    console.log("Current user:", currentUser);

    const userRef = collection(firestore, "users");
    console.log("User reference:", userRef);

    // Recherchez le document avec le champ ID correspondant à l'UID de l'utilisateur ciblé
    const userQuerySnapshot = await getDocs(query(userRef, where("ID", "==", user.ID)));

    // Recherchez le document de l'utilisateur connecté
    const currentUserQuerySnapshot = await getDocs(query(userRef, where("ID", "==", currentUser.uid)));

    // Vérifiez s'il y a un document correspondant pour l'utilisateur ciblé
    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id; // Obtenez l'ID du document de l'utilisateur ciblé
      console.log("User ID:", userId);

      // Supprimez l'UID de l'utilisateur connecté du champ follow de l'utilisateur ciblé
      await updateDoc(doc(userRef, userId), {
        follow: arrayRemove(currentUser.uid)
      });

      // Vérifiez s'il y a un document correspondant pour l'utilisateur connecté
      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const currentUserId = currentUserDoc.id; // Obtenez l'ID du document de l'utilisateur connecté
        console.log("Current user ID:", currentUserId);

        // Supprimez l'UID de l'utilisateur ciblé du champ followers de l'utilisateur connecté
        await updateDoc(doc(userRef, currentUserId), {
          followers: arrayRemove(ID)
        });
      } else {
        console.error("Current user document not found.");
      }

      console.log(`Unfollowed user: ${displayName}`);
      console.log(`Unfollowed userID: ${userId}`);
      console.log("UserConnected : ", currentUser.uid);
    } else {
      console.error("User document not found.");
    }
  };

  return (
    <div className="user-result">
      <h4>{displayName}</h4>
      <h4>{ID}</h4>
      <button onClick={handleClickMessage}>Message</button>
        <button onClick={handleClickFollow}>Follow</button>
        <button onClick={handleClickUnfollow}>Unfollow</button>
      {showSendMessage && <SendMessage selectedUser={user} />}
    </div>
  );
};

UserResult.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
  }).isRequired,
  handleUser: PropTypes.func.isRequired, // Ajoutez handleUser comme prop
};

export default UserResult;
