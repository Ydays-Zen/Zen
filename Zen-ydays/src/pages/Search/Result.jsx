import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Search from "../../components/Search";
import { firestore } from "../../db/firebase-config";
import HeaderAll from "../../layout/HeaderAll";
import BookResult from "./BookResult";
import UserResult from "./UserResult";

const Result = () => {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";
  const [bookResults, setBookResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Recherche de livres
        const booksRef = collection(firestore, "Books");
        const booksQuery = query(booksRef, where("title", "==", searchQuery));
        const booksSnapshot = await getDocs(booksQuery);
        const booksData = booksSnapshot.docs.map((doc) => doc.data());
        setBookResults(booksData);

        // Recherche d'utilisateurs par nom d'affichage
        const usersRef = collection(firestore, "users");
        const usersQuery = query(
          usersRef,
          where("displayName", "==", searchQuery)
        );
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        setUserResults(usersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats :", error);
      }
    };

    fetchResults();
  }, [searchQuery]);

  // Définissez la fonction handleUser pour gérer le clic sur le bouton Message
  const handleUser = (selectedUser) => {
    console.log("Utilisateur sélectionné:", selectedUser.displayName);
  };

  return (
    <>
      <HeaderAll />
      <Search />
      <div className="resultContainer">
        <h2>Résultats de recherche pour `{searchQuery}`</h2>
        <div className="bookResults">
          <h3>Résultats des livres :</h3>
          {bookResults.length === 0 ? (
            <p>Aucun livre trouvé.</p>
          ) : (
            bookResults.map((book, index) => (
              <BookResult key={index} book={book} />
            ))
          )}
        </div>
        <div className="userResults">
          <h3>Résultats des utilisateurs :</h3>
          {userResults.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            userResults.map((user, index) => (
              <UserResult key={index} user={user} handleUser={handleUser} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Result;
