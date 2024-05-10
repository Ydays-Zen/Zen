// Result.jsx
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Script from "../../components/Script";
import { firestore } from "../../db/firebase-config";
// import HeaderAll from "../../layout/HeaderAll";
import BookResult from "./BookResult";
import UserResult from "./UserResult";
import "./result.css";

const Result = () => {
  const location = useLocation();
  const searchQueryName = location.state?.searchQuery || "";
  const [bookResults, setBookResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Recherche de livres
        const booksRef = collection(firestore, "Books");
        const booksQuery = query(
          booksRef,
          where("title", "==", searchQueryName)
        );
        const booksSnapshot = await getDocs(booksQuery);
        const booksData = booksSnapshot.docs.map((doc) => doc.data());
        setBookResults(booksData);

        // Recherche d'utilisateurs par nom d'affichage
        const usersRef = collection(firestore, "users");
        const usersQuery = query(
          usersRef,
          where("displayName", "==", searchQueryName)
        );
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        setUserResults(usersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats :", error);
      }
    };

    fetchResults();
  }, [searchQueryName]);

  // Définissez la fonction handleUser pour gérer le clic sur le bouton Message
  const handleUser = (selectedUser) => {
    console.log("Utilisateur sélectionné:", selectedUser.displayName);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate("/result", { state: { searchQuery } });
    } else {
      alert("Veuillez entrer une requête de recherche valide.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="head_name_page">
        <h2>Recherche</h2>
      </div>
      <div className="searchBar">
        <input
          className="Search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Rechercher..."
        />
        <button className="searchButton" onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color="white" />
        </button>
      </div>

      <Script />

      <div className="resultContainer">
        <div className="bookResults">
          <h3>Résultats des livres :</h3>
          {bookResults.length === 0 ? (
            <h4>Aucun livre trouvé.</h4>
          ) : (
            bookResults.map((book, index) => (
              <div key={book.id}>
                <Link
                  key={index}
                  to={`/check/readbooks/${book.id}`}
                  className="link"
                >
                  <BookResult book={book} />
                </Link>
              </div>
            ))
          )}
        </div>
        <div className="userResults">
          <h3>Résultats des utilisateurs :</h3>
          {userResults.length === 0 ? (
            <h4>Aucun utilisateur trouvé.</h4>
          ) : (
            userResults.map((user, index) => (
              <UserResult key={index} user={user} handleUser={handleUser} /> // Passez handleUser comme prop
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Result;
