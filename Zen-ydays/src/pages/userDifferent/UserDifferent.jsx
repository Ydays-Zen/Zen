import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../db/firebase-config';

const UserDifferent = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [displayName, setDisplayName] = useState('');
};

useEffect(() => {
  const fetchUser = async () => {
    try {
      const userDoc = doc(firestore, 'users', userId);
      const userSnapshot = await getDoc(userDoc);
      setUser(userSnapshot.data());
      setDisplayName(userSnapshot.data().displayName);
    } catch (error) {
      setError('Erreur lors de la récupération des données utilisateur.');
    } finally {
      setLoading(false);
    }
  
    return (
      <div>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h2>Profil de {displayName}</h2>
          </div>
        )}
      </div>
    );
  }

  fetchUser();
}, [displayName]);



// return (
//   <div>
//     {loading ? (
//       <p>Chargement...</p>
//     ) : error ? (
//       <p>{error}</p>
//     ) : (
//       <div>
//         <h2>Profil de {displayName}</h2>
//       </div>
//     )}
//   </div>
// );



export default UserDifferent;
