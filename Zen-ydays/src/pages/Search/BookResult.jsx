import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../db/firebase-config";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 

const BookResult = ({ book }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const usersCol = collection(firestore, "users");
    const userSnapshot = await getDocs(usersCol);
    const usersList = userSnapshot.docs.map((doc) => doc.data());
    console.log("Liste des utilisateurs:", usersList); 
    const userData = usersList.find((user) => user.ID === book.userId);
    console.log("Données utilisateur trouvées:", userData); 
    setUserData(userData);
  };
  

  useEffect(() => {
    fetchUserData();
  }, [book.userId]); 

  return (
    <div className="book-result">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.resume}</p>
      {userData && (
        <p>Posté par : <Link to={`/check/userDifferent/${userData.ID}`}>{userData.displayName}</Link></p>
      )}
    </div>
  );
};

BookResult.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookResult;
