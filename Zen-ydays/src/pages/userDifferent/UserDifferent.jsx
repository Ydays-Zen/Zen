import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../db/firebase-config';

const UserDifferent = () => {
  const {users } = useParams();
  const [ID, setID] = useState('');
  const [displayName, setDisplayName] = useState('');
};

useEffect(() => {
  const fetchUserData = async () => {
    const userDoc = doc(firestore, 'users', users);
    const userSnap = await getDoc(userDoc);
    const userData = userSnap.data();
    setID(userData.ID);
    setDisplayName(userData.displayName);
  };

  fetchUserData();
}, [users]);

return (
  <div className="user-different">
    <h1>{displayName}</h1>
    <p>ID: {ID}</p>
  </div>
);

export default UserDifferent;