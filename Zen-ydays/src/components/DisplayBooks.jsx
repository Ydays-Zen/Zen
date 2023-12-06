import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { firestore } from "../db/firebase-config";
import { UserContext } from "../context/userContext";

const DisplayBooks = () => {
  const [booksList, setBooksList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(UserContext);

  const fetchData = async () => {
    try {
      // Récupérer les livres
      const booksRef = collection(firestore, "Books");
      const querySnapshot = await getDocs(booksRef);

      // Traiter les données
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
    } catch (error) {
      console.error("Erreur lors de la récupération des books :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [newComment]);

  const handleCommentSubmit = async (bookUid) => {
    try {
      if (!currentUser) {
        console.error("Utilisateur non connecté.");
        return;
      }

      if (!bookUid) {
        console.error("Identifiant du livre non défini.");
        return;
      }

      const commentsRef = collection(firestore, "Comments");
      await addDoc(commentsRef, {
        bookUid,
        userUid: currentUser.uid,
        text: newComment,
        date: new Date(),
      });

      setNewComment("");

      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  return (
    <div>
      <h2>Books List</h2>
      {booksList.map((book) => (
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
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleCommentSubmit(book.id)}>
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
