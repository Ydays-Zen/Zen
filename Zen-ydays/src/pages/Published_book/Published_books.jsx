import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../db/firebase-config";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [publishedBooks, setPublishedBooks] = useState([]);

  useEffect(() => {
    const fetchPublishedBooks = async () => {
      try {
        // Récupérer les livres publiés par l'utilisateur actuel
        const booksRef = collection(firestore, "Books");
        const userBooksQuery = query(booksRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(userBooksQuery);

        // Mettre à jour l'état avec les livres publiés
        const booksData = querySnapshot.docs.map((doc) => doc.data());
        setPublishedBooks(booksData);
      } catch (error) {
        console.error("Erreur lors de la récupération des livres publiés :", error);
      }
    };

    fetchPublishedBooks();
  }, [currentUser]);

  return (
    <div>
      <h2>Livres publiés</h2>
      <div>
        {publishedBooks.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>Auteur: {book.author}</p>
            <p>Date de publication: {book.Date}</p>
            {/* Autres informations sur le livre */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
