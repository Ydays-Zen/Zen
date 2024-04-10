import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu.jsx";
import Nav from "../../components/Nav.jsx";
import NavBar from "../../components/NavBar.jsx";
import { UserContext } from "../../context/userContext.jsx";
import { firestore } from "../../db/firebase-config.jsx";
import "./Readbook.css";

const Readbooks = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(UserContext);

  const fetchBook = async () => {
    try {
      const bookRef = doc(firestore, "Books", bookId);
      const bookDoc = await getDoc(bookRef);

      if (!bookDoc.exists()) {
        console.log("Ce livre n'existe pas.");
        return;
      }

      const bookData = bookDoc.data();
      const bookUid = bookDoc.id;

      const commentsRef = collection(firestore, "Comments");
      const bookCommentsQuery = query(
        commentsRef,
        where("bookUid", "==", bookUid)
      );
      const commentsSnapshot = await getDocs(bookCommentsQuery);

      const bookWithComments = {
        ...bookData,
        id: bookUid,
        comments: commentsSnapshot.docs.map((commentDoc) => commentDoc.data()),
      };

      setBook(bookWithComments);
    } catch (error) {
      console.error("Erreur lors de la récupération du livre :", error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsRef = collection(firestore, "Comments");
      const commentsQuery = query(commentsRef, where("bookUid", "==", bookId));
      const commentsSnapshot = await getDocs(commentsQuery);

      const commentsData = commentsSnapshot.docs.map((doc) => doc.data());

      setComments(commentsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.log("Vous devez être connecté pour commenter.");
      return;
    }

    if (!newComment) {
      console.log("Vous ne pouvez pas commenter un champ vide.");
      return;
    }

    try {
      const commentsRef = collection(firestore, "Comments");
      await addDoc(commentsRef, {
        bookUid: bookId,
        content: newComment,
        createdAt: new Date().toISOString(),
        userUid: currentUser.uid,
      });

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Erreur lors de la soumission du commentaire :", error);
    }
  };

  return (
    <div>
      <Nav />
      <Menu />
      <NavBar />
      <div className="readbooks">
        <div className="readbooks__book">
          <div className="readbooks__book__image">
            <img src={book.image} alt={book.title} />
          </div>
          <div className="readbooks__book__content">
            <h1>{book.title}</h1>
            <p>{book.content}</p>
          </div>
        </div>
        <hr />
        <div className="readbooks__comments">
          <h2>Commentaires</h2>
          <form onSubmit={handleComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Commenter</button>
          </form>
          {comments.map((comment) => (
            <div key={comment.id} className="readbooks__comments__comment">
              <p className="info_comment">{comment.createdAt}</p>
              <p className="content_comment">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Readbooks;
