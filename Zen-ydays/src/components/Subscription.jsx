import { auth, firestore } from "../db/firebase-config";
import firebase from 'firebase/compat/app';
import React from 'react';

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.currentdisplayName = props.currentdisplayName;
  }

  render() {
    return null;
  }

  async followUser(targetUserId) {
    try {
      if (!auth.currentUser) {
        console.error("Utilisateur non authentifié.");
        return;
      }

      const currentUserId = await this.getUserIdByDisplayName(this.currentdisplayName);

      if (!currentUserId || !targetUserId) {
        console.error("Erreur lors de la récupération des identifiants d'utilisateur.");
        return;
      }

      await this.updateUserSubscriptions(currentUserId, targetUserId);
      await this.updateUserFollowers(targetUserId, currentUserId);

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

      const currentUserId = await this.getUserIdByDisplayName(this.currentdisplayName);

      if (!currentUserId || !targetUserId) {
        console.error("Erreur lors de la récupération des identifiants d'utilisateur.");
        return;
      }

      await this.updateUserSubscriptions(currentUserId, targetUserId, true);
      await this.updateUserFollowers(targetUserId, currentUserId, true);

      console.log('Désabonnement réussi');
    } catch (error) {
      console.error('Erreur lors du désabonnement :', error);
    }
  }

  async getUserIdByDisplayName(displayName) {
    const querySnapshot = await firestore.collection('utilisateurs').where('displayName', '==', displayName).get();
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    } else {
      return null;
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

export default Subscription;
