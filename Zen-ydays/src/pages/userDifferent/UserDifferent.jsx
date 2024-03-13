import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Info_userDifferent from "../../components/Info_userDifferent";
import Oeuvres_profil, { Oeuvres_profilDifferent } from "../../components/Oeuvres_profilDifferent"; 
import { firestore } from "../../db/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const UserDifferent = ({ match }) => {
  const [targetUser, setTargetUser] = useState(null);
  const { userId } = match.params;
  console.log(userId);

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
      {targetUser && <Oeuvres_profilDifferent userId={userId} />}
    </>
  );
};

export default UserDifferent;
