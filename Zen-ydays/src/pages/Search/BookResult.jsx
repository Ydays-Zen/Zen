import { collection, getDocs } from "firebase/firestore";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { firestore } from "../../db/firebase-config";

const BookResult = ({ book }) => {
  // Ajoutez un état pour stocker les données de l'utilisateur
  const [userData, setUserData] = useState(null);

  // Récupérez les données de l'utilisateur
  const fetchUserData = async () => {
    const usersCol = collection(firestore, "users");
    const userSnapshot = await getDocs(usersCol);
    const usersList = userSnapshot.docs.map((doc) => doc.data());
    const userData = usersList.find((user) => user.ID === book.userId);
    console.log(userData);
    setUserData(userData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // const fetchUsersData = async () => {
  //   const usersCol = collection(firestore, "users");
  //   const userSnapshot = await getDocs(usersCol);
  //   const usersList = userSnapshot.docs.map((doc) => doc.data());
  //   console.log(usersList);
  // };

  // useEffect(() => {
  //   fetchUsersData();
  // }, []);
  // useEffect(() => {
  //   fetchUserData();
  // }, [book.userId]);

  return (
    <div className="book-result">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.resume}</p>
      {userData && <p>Posté par : {userData.displayName}</p>}{" "}
    </div>
  );
};

// Définition des propTypes pour vérifier les données
BookResult.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired, // Ajouter le propType pour userId
  }).isRequired,
};

export default BookResult;
