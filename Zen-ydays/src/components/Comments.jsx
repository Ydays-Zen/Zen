import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../db/firebase-config";

const DisplayBooks = () => {
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les livres
        const booksRef = collection(firestore, "Books");
        const querySnapshot = await getDocs(booksRef);

        // Traiter les données
        const booksData = [];
        querySnapshot.forEach((doc) => {
          booksData.push(doc.data());
        });

        // Mettre à jour le state avec les données récupérées
        setBooksList(booksData);
      } catch (error) {
        console.error("Erreur lors de la récupération des books :", error);
      }
    };

    // Appeler la fonction fetchData
    fetchData();
  }, []); // Le tableau vide en tant que dépendance signifie que cela ne se déclenchera qu'une fois au montage

  return (
    <div>
      <h2>Books List</h2>
      {booksList.map((book, index) => (
        <p key={index}>{book.title}</p>
      ))}
    </div>
  );
};

export default DisplayBooks;
