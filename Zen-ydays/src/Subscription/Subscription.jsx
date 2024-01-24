import { auth, firestore } from "../db/firebase-config";
import firebase from 'firebase/compat/app';

class UserInteraction {
  constructor(currentUserId) {
    this.currentUserId = currentUserId;
  }

  async followUser(targetUserId) {
    try {
      if (!auth.currentUser) {
        console.error("Utilisateur non authentifié.");
        return;
      }

      await this.updateUserSubscriptions(this.currentUserId, targetUserId);
      await this.updateUserFollowers(targetUserId, this.currentUserId);

      console.log('Abonnement réussi');
    } catch (error) {
      console.error('Erreur lors de l\'abonnement :', error);
    }
  }

  async unfollowUser(targetUserId) {
    try {
      if (!auth.currentUser) {
        console.error("Utilisateur non authentifié.");
        return;
      }

      await this.updateUserSubscriptions(this.currentUserId, targetUserId, true);
      await this.updateUserFollowers(targetUserId, this.currentUserId, true);

      console.log('Désabonnement réussi');
    } catch (error) {
      console.error('Erreur lors du désabonnement :', error);
    }
  }

  async updateUserSubscriptions(currentUserId, targetUserId, remove = false) {
    const fieldUpdate = remove
      ? firebase.firestore.FieldValue.arrayRemove(targetUserId)
      : firebase.firestore.FieldValue.arrayUnion(targetUserId);

    await firestore.collection('utilisateurs').doc(currentUserId).update({
      abonnements: fieldUpdate,
    });
  }

  async updateUserFollowers(targetUserId, currentUserId, remove = false) {
    const fieldUpdate = remove
      ? firebase.firestore.FieldValue.arrayRemove(currentUserId)
      : firebase.firestore.FieldValue.arrayUnion(currentUserId);

    await firestore.collection('utilisateurs').doc(targetUserId).update({
      abonnes: fieldUpdate,
    });
  }
}

export default UserInteraction;
