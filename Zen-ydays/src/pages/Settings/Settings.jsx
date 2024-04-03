import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from "../../db/firebase-config.jsx"; // Assurez-vous que le chemin vers firebase-config.jsx est correct

import Header from "../../layout/HeaderAll.jsx";

function SettingsPage() {
  const [currentUser, setCurrentUser] = useState(null); // État local pour stocker l'utilisateur actuellement authentifié
  const [nouveauPseudo, setNouveauPseudo] = useState(""); // État local pour stocker le nouveau pseudo en cours de saisie

  // Utilisez useEffect pour récupérer l'utilisateur actuellement authentifié
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fonction pour mettre à jour le pseudo
  const updatePseudo = async () => {
    try {
      if (!currentUser) {
        console.error("Aucun utilisateur connecté.");
        return; // Sortir de la fonction si aucun utilisateur n'est connecté
      }
  
      const userDocRef = doc(firestore, 'users', currentUser.uid);
      await setDoc(userDocRef, {
        displayName: nouveauPseudo
      }, { merge: true }); // Utiliser merge: true pour créer le document s'il n'existe pas encore
      console.log("Nouveau pseudo enregistré avec succès:", nouveauPseudo);
      setNouveauPseudo(""); // Réinitialiser le champ de saisie après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pseudo:", error.message);
    }
  };
  
  
  
  

  return (
    <div>
      <Header />
      <h2>Modifier le pseudo</h2>
      <div>
        <label>Ancien pseudo: {currentUser ? currentUser.displayName : "Chargement..."}</label>
      </div>
      <div>
        <label>Nouveau pseudo:</label>
        <input
          type="text"
          value={nouveauPseudo}
          onChange={(e) => setNouveauPseudo(e.target.value)}
        />
      </div>
      <button onClick={updatePseudo}>Enregistrer</button>
    </div>
  );
}

export default SettingsPage;
