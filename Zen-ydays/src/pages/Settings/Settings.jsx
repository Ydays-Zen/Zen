import React, { useState, useEffect } from 'react';
import { auth, firestore } from "../../db/firebase-config.jsx"; // Assurez-vous que le chemin vers firebase-config.jsx est correct

import Header from "../../layout/home/Header.jsx";

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
  const updatePseudo = () => {
    if (currentUser) {
      firestore.collection("users").doc(currentUser.uid).update({
        displayName: nouveauPseudo // Mettez à jour le displayName de l'utilisateur dans la collection "users"
      }).then(() => {
        console.log("Nouveau pseudo enregistré avec succès:", nouveauPseudo);
        setNouveauPseudo(""); // Réinitialiser le champ de saisie du nouveau pseudo
      }).catch((error) => {
        console.error("Erreur lors de la mise à jour du pseudo:", error.message);
      });
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
