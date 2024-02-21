// useLike.js
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import { firestore, doc, updateDoc, getDoc } from "firebase/firestore";

// Hook personnalisé pour gérer les likes d'un post
const useLike = (postID) => {
  const { currentUser } = useContext(UserContext);
  const [likes, setLikes] = useState(0); // État pour le nombre de likes du post
  const [postLiked, setPostLiked] = useState(false); // État pour vérifier si l'utilisateur a aimé le post

  useEffect(() => {
    // Effet pour vérifier si l'utilisateur a aimé le post lors du rendu du composant
    const checkPostLiked = async () => {
      if (currentUser) {
        // Crée une référence au document du post
        const postDocRef = doc(firestore, 'Books', postID);
        // Récupère le document du post
        const postDoc = await getDoc(postDocRef);

        if (postDoc.exists()) {
          // Récupère la valeur actuelle du champ "likes" dans le document du post
          const currentLikes = postDoc.data().likes || 0;
          setLikes(currentLikes);
          
          // Vérifie si l'utilisateur a déjà aimé le post
          setPostLiked(postDoc.data().likedBy && postDoc.data().likedBy.includes(currentUser.uid));
        }
      }
    };

    checkPostLiked();
  }, [currentUser, postID]);

  // Fonction pour gérer le like d'un post
  const handleLike = async () => {
    if (!currentUser) {
      console.log('Vous devez être connecté pour aimer un post.');
      return;
    }

    // Crée une référence au document du post
    const postDocRef = doc(firestore, 'Books', postID);

    // Récupère le document du post
    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      // Récupère la valeur actuelle du champ "likedBy" dans le document du post
      const likedBy = postDoc.data().likedBy || [];

      if (!postLiked) {
        // Si l'utilisateur n'a pas encore aimé le post, ajoute son ID à la liste "likedBy"
        likedBy.push(currentUser.uid);
        setLikes(likes + 1);
      } else {
        // Si l'utilisateur a déjà aimé le post, retire son ID de la liste "likedBy"
        const index = likedBy.indexOf(currentUser.uid);
        if (index !== -1) {
          likedBy.splice(index, 1);
          setLikes(likes - 1);
        }
      }

      // Met à jour le champ "likedBy" dans le document du post
      await updateDoc(postDocRef, { likedBy });
      // Inverse l'état postLiked après l'opération de like
      setPostLiked(!postLiked);
    }
  };

  // Retourne les données nécessaires pour gérer les likes dans le composant
  return { likes, postLiked, handleLike };
};

export default useLike;