// ReadStory.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../db/firebase-config.jsx";
import { doc, getDoc } from "firebase/firestore";
import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./read-story.css"; // Importez le fichier CSS ici

const ReadStory = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookDoc = await getDoc(doc(firestore, "Books", bookId));
        if (bookDoc.exists()) {
          setBook(bookDoc.data());
        } else {
          console.log("Aucun livre trouvé avec l'ID spécifié.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du livre :", error);
      }
    };

    fetchBook();
  }, [bookId]);

  return (
    <div>
      <Nav />
      <Menu />
      <NavBar />
      <div className="read-story">
        {book ? (
          <>
            <h2>{book.title}</h2>
            <img src={book.image} alt={book.title} />
            <p>{book.content}</p>
            {/* Ajoutez d'autres éléments en fonction des détails du livre */}
          </>
        ) : (
          <p>Chargement du livre...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ReadStory;
