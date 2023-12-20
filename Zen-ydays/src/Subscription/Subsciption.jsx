import { auth, firestore } from "../db/firebase-config";
import firebase from 'firebase/compat/app'; 

export const followUser = async (currentUserId, targetUserId) => {
  try {
    // Mettez à jour les abonnements de l'utilisateur actuel
    await firestore.collection('utilisateurs').doc(currentUserId).update({
      abonnements: firebase.firestore.FieldValue.arrayUnion(targetUserId),
    });

    // Mettez à jour les abonnés de l'utilisateur suivi
    await firestore.collection('utilisateurs').doc(targetUserId).update({
      abonnes: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });

    console.log('Abonnement réussi');
  } catch (error) {
    console.error('Erreur lors de l\'abonnement :', error);
  }
};

export default followUser;
