import React, { useState } from 'react';
import { auth, firestore, storage } from "../../db/firebase-config.jsx";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Header from "../../layout/HeaderAll.jsx";

function ChangeProfileImagePage() {
  const [nouvelleImage, setNouvelleImage] = useState(null); // État local pour stocker la nouvelle image de profil

  // Fonction pour changer l'image de profil de l'utilisateur
  const changeProfileImage = async () => {
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

        // Téléchargez la nouvelle image vers le stockage
        const storageRef = ref(storage, `profile_images/${currentUser.uid}`);
        await uploadBytes(storageRef, nouvelleImage);

        // Obtenez l'URL de téléchargement de la nouvelle image
        const img = await getDownloadURL(storageRef);

        // Mettez à jour le champ imageUrl avec l'URL de la nouvelle image
        await updateDoc(doc(userRef, userId), {
          img: img
        });

        console.log("Nouvelle image de profil enregistrée avec succès:", img);
        setNouvelleImage(null); // Réinitialiser l'état de la nouvelle image après la mise à jour
      } else {
        console.error("Document de l'utilisateur connecté non trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'image de profil:", error.message);
    }
  };

  // Gérer le changement de fichier d'entrée
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNouvelleImage(file);
  };

  return (
    <div>
      <Header />
      <h2>Modifier l image de profil</h2>
      <div>
        <label>Nouvelle image de profil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button onClick={changeProfileImage}>Enregistrer</button>
    </div>
  );
}

export default ChangeProfileImagePage;
