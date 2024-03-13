import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Info_userDifferent from "../../components/Info_userDifferent";
import Oeuvres_profil from "../../components/Oeuvres_Profil"; // Assurez-vous que ce composant accepte un userId comme prop
import { firestore } from "../../db/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const UserDifferent = ({ match }) => {
  const [targetUser, setTargetUser] = useState(null);
  const { userId } = match.params;

  const fetchUserData = async () => {
    const userDocRef = doc(firestore, "utilisateurs", userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      setTargetUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]); 
  return (
    <>
      {targetUser && <Info_userDifferent user={targetUser} />}
      {targetUser && <Oeuvres_profil userId={userId} />}
    </>
  );
};

export default UserDifferent;
