import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { firestore } from "../db/firebase-config";
import { UserContext } from "../context/userContext";

const DisplayBooks = () => {
  const [booksList, setBooksList] = useState([]);
  const { currentUser } = useContext(UserContext);

  // Utilisez un tableau d'états pour stocker les commentaires pour chaque livre
  const [newComments, setNewComments] = useState([]);

  const fetchData = async () => {
    try {
      const booksRef = collection(firestore, "Books");
      const querySnapshot = await getDocs(booksRef);

      const booksData = [];

      for (const doc of querySnapshot.docs) {
        const bookData = doc.data();
        const bookUid = doc.id;

        const commentsRef = collection(firestore, "Comments");
        const bookCommentsQuery = query(
          commentsRef,
          where("bookUid", "==", bookUid)
        );
        const commentsSnapshot = await getDocs(bookCommentsQuery);

        const bookWithComments = {
          ...bookData,
          id: bookUid,
          comments: commentsSnapshot.docs.map((commentDoc) =>
            commentDoc.data()
          ),
        };

        booksData.push(bookWithComments);
      }

      setBooksList(booksData);

      // Initialisez le tableau des nouveaux commentaires avec des chaînes vides pour chaque livre
      setNewComments(Array(booksData.length).fill(""));
    } catch (error) {
      console.error("Erreur lors de la récupération des books :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCommentSubmit = async (bookUid, index) => {
    try {
      if (!currentUser) {
        console.error("Utilisateur non connecté.");
        return;
      }

      if (!bookUid || !newComments[index].trim()) {
        console.error("Identifiant du livre ou commentaire non défini.");
        return;
      }

      const commentsRef = collection(firestore, "Comments");
      await addDoc(commentsRef, {
        bookUid,
        userUid: currentUser.uid,
        text: newComments[index],
        date: new Date(),
      });

      // Réinitialiser le commentaire spécifique au livre
      setNewComments((prevComments) => {
        const newCommentsCopy = [...prevComments];
        newCommentsCopy[index] = "";
        return newCommentsCopy;
      });

      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  return (
    <div>
      <h2>Books List</h2>
      {booksList.map((book, index) => (
        <div key={book.id}>
          <p>{book.title}</p>
          <ul>
            {book.comments &&
              book.comments.map((comment, commentIndex) => (
                <li key={commentIndex}>{comment.text}</li>
              ))}
          </ul>
          {currentUser && (
            <div>
              <textarea
                value={newComments[index]}
                onChange={(e) => {
                  setNewComments((prevComments) => {
                    const newCommentsCopy = [...prevComments];
                    newCommentsCopy[index] = e.target.value;
                    return newCommentsCopy;
                  });
                }}
              />
              <button onClick={() => handleCommentSubmit(book.id, index)}>
                Add Comment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayBooks;
