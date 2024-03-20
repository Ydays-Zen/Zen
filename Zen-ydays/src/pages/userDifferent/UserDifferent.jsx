import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../db/firebase-config';

const UserDifferent = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      console.log(`Fetching user data for ID: ${userId}`);
      try {
        const userRef = doc(firestore, "users", userId );
        console.log("userRef:", userRef); 
        const userSnap = await getDoc(userRef);
        console.log("userSnap:", userSnap); 
        if (userSnap.exists()) {
          console.log("User data:", userSnap.data());
          setUser(userSnap.data());
        } else {
          console.log("No such user!");
          setError('Aucun utilisateur trouvé avec cet ID.');
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", err);
        setError('Erreur lors de la récupération des données de l’utilisateur.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [userId]);
  

  if (loading) {
    return <div>Chargement des données de l'utilisateur...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>Profil de l'utilisateur</h2>
          <p>Nom : {user.displayName}</p>
          <div>Email : {user?.email}</div>
          <div>Bio : {user?.bio}</div>
        </div>
      ) : (
        <p>Utilisateur non trouvé.</p>
      )}
    </div>
  );
};

export default UserDifferent;
