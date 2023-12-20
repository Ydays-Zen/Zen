import { useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../db/firebase-config";
import { UserContext } from "../context/userContext";

const DisplayBooks = () => {
  const [booksList, setBooksList] = useState([]);
  const { currentUser } = useContext(UserContext);
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

      setNewComments(Array(booksData.length).fill(""));
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
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

  const handleLikeSubmit = async (bookUid) => {
    try {
      if (!currentUser) {
        console.error("Utilisateur non connecté.");
        return;
      }

      const bookRef = doc(firestore, "Books", bookUid);
      const bookDoc = await getDoc(bookRef);

      if (!bookDoc.exists()) {
        console.error("Livre non trouvé.");
        return;
      }

      const likedBy = bookDoc.data().likedBy || [];

      // Vérifiez si l'utilisateur a déjà liké ce livre
      if (likedBy.includes(currentUser.uid)) {
        // Si oui, retirez le like
        await updateDoc(bookRef, {
          likedBy: likedBy.filter((uid) => uid !== currentUser.uid),
        });
      } else {
        // Si non, ajoutez le like
        await updateDoc(bookRef, {
          likedBy: [...likedBy, currentUser.uid],
        });
      }

      fetchData();
    } catch (error) {
      console.error("Erreur lors de la gestion du like :", error);
    }
  };

  return (
    <div>
      <h2>Books List</h2>
      {booksList.map((book, index) => (
        <div key={book.id}>
          <p>{book.title}</p>
          {/* Affichege de notre couverture de livre  */}
          <img src={book.image} alt="" />
          <p>Likes: {book.likedBy ? book.likedBy.length : 0}</p>
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
              <button onClick={() => handleLikeSubmit(book.id)}>
                {book.likedBy && book.likedBy.includes(currentUser.uid)
                  ? "Unlike"
                  : "Like"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayBooks;
