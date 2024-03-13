import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../db/firebase-config'; // Ajustez le chemin selon votre structure de projet

const UserDifferent = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        console.log(`Fetching user data for ID: ${userId}`);
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);
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
  

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Erreur : {error}</div>;

  
  return (
    <div>
      <h2>Profil Utilisateur</h2>
      <div>Nom : {user?.name}</div>
      <div>Email : {user?.email}</div>
      <div>Bio : {user?.bio}</div>
    </div>
  );
};

export default UserDifferent;
