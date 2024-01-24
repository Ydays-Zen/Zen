// Readbooks.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../db/firebase-config.jsx";
import { doc, getDoc } from "firebase/firestore";
import Nav from "../../components/Nav.jsx";
import Menu from "../../components/Menu.jsx";
import NavBar from "../../components/NavBar.jsx";
import "./Readbooks.css";
const Readbooks = () => {
const { bookId } = useParams();
const [book, setBook] = useState(null);
const [comments, setComments,] = useState([]);
const [newComments, setNewComments] = useState([]);
const [index, setIndex] = useState(0);


  const fetchComments = async () => {
    try {
      const commentsRef = collection(firestore, "Comments");
      const querySnapshot = await getDoc(commentsRef);

      const commentsData = [];

      for (const doc of querySnapshot.docs) {
        const commentData = doc.data();
        const commentUid = doc.id;

        const commentsRef = collection(firestore, "Comments");
        const bookCommentsQuery = query(
          commentsRef,
          where("commentUid", "==", commentUid)
        );
        const commentsSnapshot = await getDoc(bookCommentsQuery);

        const commentWithComments = {
          ...commentData,
          id: commentUid,
          comments: commentsSnapshot.docs.map((commentDoc) =>
            commentDoc.data()
          ),
        };

        commentsData.push(commentWithComments);
      }

      setComments(commentsData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }


  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const commentRef = collection(firestore, "Comments");
      const payload = {
        content: newComments[index],
        bookUid: book.id,
        userUid: currentUser.uid,
      };
      await addDoc(commentRef, payload);

      setNewComments((prevNewComments) => {
        const newNewComments = [...prevNewComments];
        newNewComments[index] = "";
        return newNewComments;
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  }

  
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
  }, [bookId] , [comments]);

  return (
    <div>
      <Nav />
      <Menu />
      <NavBar />
      <div className="read-books">
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
        <div className="comments">
            <h3>Commentaires</h3>
            {comments.length ? (
            comments.map((comment) => (
                <div key={comment.id}>
                <p>{comment.content}</p>
                <p>{comment.userUid}</p>
                <p>{comment.date}</p>
                <p>{comment.comments}</p>
                </div>
            ))
            ) : (
            <p>Aucun commentaire pour le moment.</p>
            )}
    </div>
    <div className="add-comment">
        <h3>Ajouter un commentaire</h3>
        <form onSubmit={handleCommentSubmit}>
            <textarea
            value={newComments[index]}
            onChange={(event) => {
                const newNewComments = [...newComments];
                newNewComments[index] = event.target.value;
                setNewComments(newNewComments);
            }}
            />
            <button type="submit">Ajouter</button>
        </form>
    
   </div>
    </div>
  );
}

export default Readbooks;
