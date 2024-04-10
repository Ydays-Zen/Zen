import React, { useState } from 'react';
import { auth, firestore } from "../../db/firebase-config.jsx";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

import Header from "../../layout/HeaderAll.jsx";

function SettingsPage() {
  const [nouveauPseudo, setNouveauPseudo] = useState(""); // État local pour stocker le nouveau pseudo en cours de saisie

  // Fonction pour changer le pseudo de l'utilisateur
  const changeDisplayName = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("Aucun utilisateur connecté.");
        return;
      }

      const userRef = collection(firestore, "users");

      // Recherchez le document de l'utilisateur connecté
      const currentUserQuerySnapshot = await getDocs(query(userRef, where("ID", "==", currentUser.uid)));

      // Vérifiez s'il y a un document correspondant pour l'utilisateur connecté
      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const userId = currentUserDoc.id; // Obtenez l'ID du document de l'utilisateur connecté

        // Mettez à jour le champ displayName avec le nouveau pseudo
        await updateDoc(doc(userRef, userId), {
          displayName: nouveauPseudo
        });

        console.log("Nouveau pseudo enregistré avec succès:", nouveauPseudo);
        setNouveauPseudo(""); // Réinitialiser le champ de saisie après la mise à jour
      } else {
        console.error("Document de l'utilisateur connecté non trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pseudo:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <h2>Modifier le pseudo</h2>
      <div>
        <label>Nouveau pseudo:</label>
        <input
          type="text"
          value={nouveauPseudo}
          onChange={(e) => setNouveauPseudo(e.target.value)}
        />
      </div>
      <button onClick={changeDisplayName}>Enregistrer</button>
    </div>
  );
}

export default SettingsPage;
