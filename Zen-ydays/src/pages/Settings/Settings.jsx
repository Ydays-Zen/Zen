import React, { useState, useEffect } from 'react';
import { auth, firestore } from "../../db/firebase-config.jsx";
import { doc, updateDoc } from 'firebase/firestore';
import Header from "../../layout/home/Header.jsx";

function SettingsPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [nouveauPseudo, setNouveauPseudo] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe; // Assurez-vous de retourner la fonction de désabonnement directement
  }, []);
  
  const updatePseudo = async () => {
    try {
      if (!currentUser) {
        console.error("Aucun utilisateur connecté.");
        return; // Sortir de la fonction si aucun utilisateur n'est connecté
      }

      const userDocRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: nouveauPseudo
      });
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
