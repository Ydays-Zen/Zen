import { useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../db/firebase-config";
import { UserContext } from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const Main = () => {
  const [booksList, setBooksList] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [activeResume, setActiveResume] = useState(null);

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
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  // Affichage du résumé
  const handleResumeClick = (bookId) => {
    setActiveResume(bookId === activeResume ? null : bookId);
  };

  return (
    <>
      <main className="mainDisplayBooks">
        {booksList.map((book) => (
          <div key={book.id} className="displaybooks">
            <h2>{book.title}</h2>

            {/* Affichage de la couverture du livre */}
            <img className="couverture" src={book.image} alt="Couverture" />

            <div className="tags">
              <p className="tag">{book.tags}</p>
            </div>

            {currentUser && (
              <div className="content">
                {/* Système de like */}

                <div className="likes">
                  <FontAwesomeIcon
                    onClick={() => handleLikeSubmit(book.id)}
                    icon={
                      book.likedBy && book.likedBy.includes(currentUser.uid)
                        ? faHeartSolid
                        : faHeartRegular
                    }
                    size="xl"
                    color={
                      book.likedBy && book.likedBy.includes(currentUser.uid)
                        ? "red"
                        : "black"
                    }
                  />

                  <p>{book.likedBy ? book.likedBy.length : 0}</p>
                </div>
                {/* Resume */}
                <button onClick={() => handleResumeClick(book.id)}>
                  Résumé
                </button>
                {/* Affichage du Résumé  */}

                <div
                  className={`resume ${
                    activeResume === book.id ? "active" : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="xl"
                    onClick={() => handleResumeClick(book.id)}
                    className={` ${activeResume === book.id ? "active" : ""}`}
                  />
                  <h3>Résumé</h3>
                  <p>{book.resume}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </>
  );
};

export default Main;
