import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/userContext";
import { firestore } from "../db/firebase-config";

import "../pages/Profil/Profil.css";

export function Oeuvres_profil() {
  const [booksList, setBooksList] = useState([]);
  const { currentUser } = useContext(UserContext);

  // Récupérez les données des livres et des commentaires
  const fetchData = async () => {
    try {
      const booksRef = collection(firestore, "Books");
      const bookProfil = query(
        booksRef,
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(bookProfil);

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
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <div>
      <div className="container_oeuvres">
        <h3>VOS OEUVRES</h3>
        <div className="all_oeuvres">
          {booksList.map((book) => (
            <div key={book.id}>
              <p>{book.title}</p>
              {/* Affichege de notre couverture de livre  */}
              <img src={book.image} alt="Couverture" />
              <div>
                <FontAwesomeIcon icon={faHeartSolid} size="xl" color={"red"} />
                <p>{book.likedBy ? book.likedBy.length : 0}</p>
              </div>

              {book.comments.map((comment, index) => (
                <div key={index}>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Oeuvres_profil;