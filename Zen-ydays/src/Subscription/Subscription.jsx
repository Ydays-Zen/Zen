import { auth, firestore } from "../db/firebase-config";
import firebase from 'firebase/compat/app';

export const followUser = async (currentUserId, targetUserId) => {
  try {
    // Assurez-vous que l'utilisateur est authentifié
    if (!auth.currentUser) {
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

export const unfollowUser = async (currentUserId, targetUserId) => {
  try {
    if (!auth.currentUser) {
      console.error("Utilisateur non authentifié.");
      return;
    }

    // Mettez à jour les abonnements de l'utilisateur actuel
    await firestore.collection('utilisateurs').doc(currentUserId).update({
      abonnements: firebase.firestore.FieldValue.arrayRemove(targetUserId),
    });

    // Mettez à jour les abonnés de l'utilisateur suivi
    await firestore.collection('utilisateurs').doc(targetUserId).update({
      abonnes: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });

    console.log('Désabonnement réussi');
  } catch (error) {
    console.error('Erreur lors du désabonnement :', error);
  }
};

export default followUser;
