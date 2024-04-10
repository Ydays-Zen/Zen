import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { firestore } from "../db/firebase-config";

const Script = () => {
  const { currentUser } = useContext(UserContext);
  const [booksList, setBooksList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      const likedBooksRef = collection(firestore, "Books");
      const q = query(
        likedBooksRef,
        where("likedBy", "array-contains", currentUser.uid),
      );
      const querySnapshot = await getDocs(q);

      const booksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBooksList(booksData);
    };

    fetchData();
  }, [currentUser]); // Assurez-vous de rappeler fetchData lorsque currentUser change

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Extraire les IDs des livres aimés par l'utilisateur
      const likedBookIds = booksList.map((book) => book.id);

      // Rechercher d'autres livres avec les mêmes tags, mais qui ne sont pas déjà aimés par l'utilisateur
      const booksRef = collection(firestore, "Books");
      const q = query(booksRef);
      const querySnapshot = await getDocs(q);

      const suggestionsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((book) => !likedBookIds.includes(book.id)); // Filtrer les livres déjà aimés

      setSuggestions(suggestionsData);
    };

    if (booksList.length > 0) {
      fetchSuggestions();
    }
  }, [booksList, currentUser]);

  return (
    <>


      {booksList.map((book) => (
        <div key={book.id} className="book">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.tags}</p>
        </div>
      ))}

      <hr />


      {suggestions.map((book) => (
        <div key={book.id} className="book">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.tags}</p>
        </div>
      ))}
    </>
  );
};

export default Script;
