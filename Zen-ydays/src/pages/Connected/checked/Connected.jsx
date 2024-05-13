import {
  faBookmark,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { firestore } from "../../../db/firebase-config";

import { useCategory } from "../../../context/CategoryContext";
import HeaderAll from "../../../layout/HeaderAll";
import NavBarCategory from "../../../layout/NavBarCategory";
import "./style.css";

const Connected = () => {
  const { btnValue } = useCategory();
  const [booksList, setBooksList] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const userId = currentUser.uid;

  const fetchData = async () => {
    try {
      const booksRef = collection(firestore, "Books");
      const filteredBooksQuery = btnValue
        ? query(booksRef, where("tags", "array-contains", btnValue))
        : booksRef;
      const querySnapshot = await getDocs(filteredBooksQuery);
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
  }, [btnValue]);

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

      if (likedBy.includes(currentUser.uid)) {
        await updateDoc(bookRef, {
          likedBy: likedBy.filter((uid) => uid !== currentUser.uid),
        });
      } else {
        await updateDoc(bookRef, {
          likedBy: [...likedBy, currentUser.uid],
        });
      }

      fetchData();
    } catch (error) {
      console.error("Erreur lors de la gestion du like :", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userQuery = query(
          collection(firestore, "users"),
          where("ID", "==", userId)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUser(userData);
        } else {
          console.log(
            "Aucun document trouvé pour l'utilisateur avec l'ID:",
            userId
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
  }, [userId]);

  return (
    <div>
      <div className="connected">
        <HeaderAll />
        <NavBarCategory />

        <main className="mainDisplayBooks">
          {booksList.map((book) => (
            <div key={book.id} className="displaybooks">
              <Link to={`/check/readbooks/${book.id}`} className="link">
                <h2>{book.title}</h2>
                <img className="couverture" src={book.image} alt="Couverture" />
              </Link>
              <div className="tags">
                <p className="tag">Genre: {book.tags}</p>
                <div className="like_save">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{ color: "#ffffff", background: "#000000" }}
                  />
                  <div className="like">
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
                          : "white"
                      }
                    />
                    <p>{book.likedBy ? book.likedBy.length : 0}</p>
                  </div>
                </div>
              </div>
              {/* Affichage des commentaires avec la date formatée */}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Connected;
