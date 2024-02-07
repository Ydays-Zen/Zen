// ReadStory.js

import React from "react";
import { useParams } from "react-router-dom"; // Utilisez useParams pour obtenir les paramètres d'URL
import { firestore } from "../../db/firebase-config.jsx";
import { doc, getDoc } from "firebase/firestore";
import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import NavBar from "../../components/NavBar";
import "./Readbooks.css";


const ReadStory = () => {
  const { bookId } = useParams(); // Obtenez l'ID du livre depuis les paramètres d'URL
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    const fetchBook = async () => {
      const bookDocRef = doc(firestore, "Books", bookId);
      const bookDocSnap = await getDoc(bookDocRef);

      if (bookDocSnap.exists()) {
        setBook(bookDocSnap.data());
      } else {
        console.log("Le livre n'a pas été trouvé.");
      }
    };

    fetchBook();
  }, [bookId]);

  return (
    <div>
      <Nav />
      <Menu />
      <NavBar />

      {book && (
        <div className="read-story">
          <h2>{book.title}</h2>
          <div>
            <img src={book.image} alt={book.title} />
          </div>
          <p>{book.content}</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ReadStory;
