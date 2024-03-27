import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import { auth, firestore } from '../../db/firebase-config';
import { collection, doc, updateDoc, arrayUnion, getDocs, query, where } from 'firebase/firestore';
import PropTypes from 'prop-types';
import SendMessage from '../../components/SendMessage';

const UserResult = ({ user, handleUser }) => {
  console.log(user);
  const { displayName, ID } = user;
  const [showSendMessage, setShowSendMessage] = useState(false);

  const handleClickMessage = () => {
    handleUser(user);
    setShowSendMessage(true);
  };

  const handleClickFollow = async () => {
    const currentUser = auth.currentUser;
    console.log("Current user:", currentUser);
  
    const userRef = collection(firestore, "users");
    console.log("User reference:", userRef);
  
    const userQuerySnapshot = await getDocs(query(userRef, where("ID", "==", user.ID)));
    const currentUserQuerySnapshot = await getDocs(query(userRef, where("ID", "==", currentUser.uid)));
  
    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id;
      console.log("User ID:", userId);
  
      await updateDoc(doc(userRef, userId), {
        follow: arrayUnion(currentUser.uid)
      });
  
      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const currentUserId = currentUserDoc.id;
        console.log("Current user ID:", currentUserId);
  
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
  
  return (
    <div className="user-result">
      {/* Utilisez <Link> pour rendre le nom de l'utilisateur cliquable */}
      <h4><Link to={`/check/userDifferent/${ID}`}>{displayName}</Link></h4>
      <h4>{ID}</h4>
      <button onClick={handleClickMessage}>Message</button>
      <button onClick={handleClickFollow}>Follow</button>
      <button>Unfollow</button>
      {showSendMessage && <SendMessage selectedUser={user} />}
    </div>
  );
};

UserResult.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
  }).isRequired,
  handleUser: PropTypes.func.isRequired,
};

export default UserResult;
