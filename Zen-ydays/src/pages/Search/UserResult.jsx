import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../db/firebase-config";

const UserResult = ({ user }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const usersCol = collection(firestore, "users");
    const userSnapshot = await getDocs(usersCol);
    const usersList = userSnapshot.docs.map((doc) => doc.data());
    console.log("Liste des utilisateurs:", usersList); 
    const userData = usersList.find((userData) => userData.ID === user.id);
    console.log("Données utilisateur trouvées:", userData); 
    setUserData(userData);
  };

  useEffect(() => {
    fetchUserData();
  }, [user.id]);

  return (
    <div className="user-result">
      {userData ? (
        <Link to={`/check/userDifferent/${userData.ID}`}>{userData.displayName}</Link>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

UserResult.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserResult;
