
// Readbooks.js

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
import ReactPaginate from "react-paginate";
import "./Readbook.css";

const Readbooks = () => {
  const { bookId } = useParams();
  const { userId} = useParams();
  const [user, setUser] = useState(null);
  const [book, setBook] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(UserContext);
  const [activeResume, setActiveResume] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);
  
  // Récupération des données du livre
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

  // Récupération des données de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userQuery = query(
          collection(firestore, "users"),
          where("ID", "==", book.userId)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUser(userData);

        
        } else {
          console.log(
            "Aucun document trouvé pour l'utilisateur avec l'ID:",
            book.userId
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      }
    };

    fetchUser();
  }, [book.userId]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  // Affichage du résumé
  const handleResumeClick = (bookId) => {
    setActiveResume(bookId === activeResume ? null : bookId);
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

  // Affichage du contenu
  const handleContentClick = (bookId) => {
    setActiveContent(bookId === activeContent ? null : bookId);
    setIsContentVisible(bookId === activeContent ? !isContentVisible : true);
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
          <div className="readbooks__book__info">
        <h1>{book.title}</h1>
        <div className="readbooks_head"> 
        <h3>Écrit par: {user && user.displayName}</h3>
        <h2>Genre: {book.tags}</h2> 
        </div>
        
          <div className="readbooks__book__image">
            <img src={book.image} alt={book.title} />
          </div>
              </div>
           {/* Resume */}
           <div className="readbooks__book__resume">
            <button className="second-btn" onClick={() => handleResumeClick(book.id)}>Voir le Résumé</button>
            {/* Affichage Resume */}
            {activeResume === book.id && (
              <div className="readbooks__book__resume__content">
                <p>{book.resume}</p>
              </div>
            )}

          </div>
                  <div className="readbooks__book__content">
          <button className="second-btn" onClick={() => handleContentClick(book.id)}>Commencez la Lecture</button>
          {/* Affichage Contenu */}
          <div className={`readbooks__book__content__content ${activeContent === book.id ? 'visible' : ''}`}>
            <div className="book-text">
            <p>{book.content && book.content.slice(pageNumber * 800, (pageNumber + 1) * 800)}</p>
            </div>
            <ReactPaginate
              pageCount={book.content ? Math.ceil(book.content.length / 800) : 0}//Nombre de pages
              marginPagesDisplayed={2} //Nombre de pages affichées avant et après la page actuelle
              pageRangeDisplayed={5} //Nombre de pages affichées
              onPageChange={handlePageClick} //Fonction appelée lorsqu'on change de page
              containerClassName={"pagination"} //Nom de la classe du conteneur
              activeClassName={"active"} //Nom de la classe de la page active
              previousLabel={<span className="arrow">&larr;</span>} // Utilisation de la classe CSS pour styliser la flèche vers la gauche
              nextLabel={<span className="arrow">&rarr;</span>} // Utilisation de la classe CSS pour styliser la flèche vers la droite
            />
          </div>
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
            <div className="readbooks__comments__comment">
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
