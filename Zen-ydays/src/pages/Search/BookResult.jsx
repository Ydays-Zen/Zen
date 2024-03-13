import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../db/firebase-config";
import { Link } from "react-router-dom"; // Importation de Link

const BookResult = ({ book }) => {
  const [userData, setUserData] = useState(null);

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
  }, [book.userId]); // Je vous recommande d'ajouter book.userId ici pour ré-exécuter l'effet si l'ID de l'utilisateur change, c'est plus optimisé.

  return (
    <div className="book-result">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.resume}</p>
      {userData && (
        <p>Posté par : <Link to={`/user/${userData.ID}`}>{userData.displayName}</Link></p> // Utilisation de Link ici
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
