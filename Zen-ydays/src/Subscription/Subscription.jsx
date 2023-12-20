import { auth, firestore } from "../db/firebase-config";
import firebase from 'firebase/compat/app'; 

export const followUser = async (currentUserId, targetUserId) => {
  try {
    // Assurez-vous que l'utilisateur est authentifié
    if (!auth.currentUser) {
      // Si l'utilisateur n'est pas authentifié, vous pouvez soit le rediriger vers la page de connexion,
      // soit afficher un message d'erreur.
      console.error("Utilisateur non authentifié.");
      return;
    }

    // Mettez à jour les abonnements de l'utilisateur actuel
    await firestore.collection('utilisateurs').doc(currentUserId).update({
      abonnements: firebase.firestore.FieldValue.arrayUnion(targetUserId),
    
    
  
    });    // Mettez à jour les abonnés de l'utilisateur suivi
    await firestore.collection('utilisateurs').doc(targetUserId).update({
      abonnes: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });
    console.log('Abonnement réussi');
  } catch (error) {
    console.error('Erreur lors de l\'abonnement :', error);
  }
};
export default followUser;