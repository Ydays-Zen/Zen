import { collection, getDocs } from "firebase/firestore";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { firestore } from "../../db/firebase-config";

const BookResult = ({ book }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const usersCol = collection(firestore, "users");
      const userSnapshot = await getDocs(usersCol);
      const usersList = userSnapshot.docs.map((doc) => doc.data());
      const userData = usersList.find((user) => user.ID === book.userId);
      setUserData(userData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'utilisateur :",
        error
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bookSuggestions">
      <h3>{book.title}</h3>

      {book.image && (
        <img src={book.image} alt={book.title} className="couverture" />
      )}

      <div className="author imgProfil">
        {userData && userData.img && (
          <img
            src={userData.img}
            alt=""
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
            }}
          />
        )}

        {userData && userData.displayName && <p>{userData.displayName}</p>}
      </div>
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
