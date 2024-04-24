import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { firestore } from "../db/firebase-config";
import "./styles/Search.css";

const Script = () => {
  const { currentUser } = useContext(UserContext);
  const [booksList, setBooksList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      const likedBooksRef = collection(firestore, "Books");
      const q = query(
        likedBooksRef,
        where("likedBy", "array-contains", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      const booksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBooksList(booksData);
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const fetchUserForSuggestions = async () => {
      const suggestionsWithAuthors = await Promise.all(
        booksList.map(async (book) => {
          try {
            const userQuery = query(
              collection(firestore, "users"),
              where("ID", "==", book.userId)
            );
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              return {
                ...book,
                author: userData.displayName,
                img: userData.img,
              };
            } else {
              console.log(
                "Aucun document trouvé pour l'utilisateur avec l'ID:",
                book.userId
              );
              return { ...book, author: "Auteur inconnu" };
            }
          } catch (error) {
            console.error(
              "Erreur lors de la récupération de l'utilisateur:",
              error
            );
            return { ...book, author: "Auteur inconnu" };
          }
        })
      );

      setSuggestions(suggestionsWithAuthors);
    };

    if (booksList.length > 0) {
      fetchUserForSuggestions();
    }
  }, [booksList]);

  return (
    <>
      <main className="sugestionsBook">
        {/* Afficher les suggestions de livres avec les auteurs */}
        {suggestions.map((book) => (
          <div key={book.id}>
            <Link to={`/check/readbooks/${book.id}`} className="link">
              <div className="bookSuggestions">
                <div className="author imgProfil">
                  <img
                    src={book.img}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />

                  <p>{book.author}</p>
                </div>

                <h3>{book.title}</h3>
                <img src={book.image} alt="" className="couverture" />
              </div>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default Script;
