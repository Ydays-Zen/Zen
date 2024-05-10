import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
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
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Category from "../../../components/Category";
// import NavBar from "../../../components/NavBar";
import { UserContext } from "../../../context/userContext";
import { firestore } from "../../../db/firebase-config";
import { auth } from "../../../db/firebase-config.jsx";

const cookies = new Cookies();

import "./style.css";

import { useCategory } from "../../../context/CategoryContext";

const Connected = () => {
  const navigate = useNavigate();

  const { btnValue } = useCategory();
  const [booksList, setBooksList] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  const userId = currentUser.uid;

  // Récupérez les données des livres et des commentaires
  const fetchData = async () => {
    try {
      const booksRef = collection(firestore, "Books");

      // Utilisez btnValue pour filtrer les livres si elle est définie
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
  }, [btnValue]); // Rafraîchir la liste lorsque btnValue change

  // Gestion du like
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

  console.log("User ID:", userId);
  console.log("Pseudo:", currentUser.displayName);

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
  }, [userId]);

  // Deconnexion
  const logOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* {currentUser && <h2>Welcome {currentUser.email}</h2>} */}
      {currentUser && <button onClick={logOut}>Log Out</button>}
      <div className="connected">
        <Category />

        <main className="mainDisplayBooks">
          {booksList.map((book) => (
            <div key={book.id} className="displaybooks">
              <Link to={`/check/readbooks/${book.id}`} className="link">
                <div className="Head_post_name">
                  <p>{user && user.displayname}</p>
                </div>
                <h2>{book.title}</h2>
                {/* Affichage de la couverture du livre */}
                <img className="couverture" src={book.image} alt="Couverture" />
              </Link>
              <div className="tags">
                <p className="tag">{book.tags}</p>
                {/* Système de like */}

                <div className="like_save">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{ color: "#ffffff", background: "#000000" }}
                    size="xl"
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
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Connected;
