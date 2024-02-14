import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "../../components/Search.jsx"; // Assurez-vous d'ajuster le chemin
import { firestore } from "../../db/firebase-config.jsx";
import HeaderAll from "../../layout/HeaderAll.jsx";

import "./result.css";

const Result = () => {
  const location = useLocation();
  const searchQuery = location.state.searchQuery;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const booksRef = collection(firestore, "Books");
      const usersRef = collection(firestore, "users");

      const booksQuery = query(booksRef, where("title", "==", searchQuery));
      const usersQuery = query(
        usersRef,
        where("displayName", "==", searchQuery)
      );

      const booksSnapshot = await getDocs(booksQuery);
      const usersSnapshot = await getDocs(usersQuery);

      const booksResults = booksSnapshot.docs.map((bookDoc) => {
        const bookData = bookDoc.data();
        return {
          title: bookData.title,
          userId: bookData.userId || "",
          imageUrl: bookData.image || "",
          resume: bookData.resume || "",
          source: "Books",
        };
      });

      const usersResults = usersSnapshot.docs.map((userDoc) => {
        const userData = userDoc.data();
        return {
          displayName: userData.displayName,
          ID: userData.ID,
          source: "users",
        };
      });

      const combinedResults = [...booksResults, ...usersResults];

      const resultsWithDetails = await Promise.all(
        combinedResults.map(async (result) => {
          if (result.source === "Books" && result.userId) {
            const userDoc = await getDoc(doc(usersRef, result.userId));
            const userData = userDoc.exists() ? userDoc.data() : {};
      
            console.log("User name:", userData.displayName);
      
            return {
              ...result,
              postedBy: userData.displayName || "Utilisateur sans nom",
              imageUrl: result.imageUrl || "Aucune image disponible",
              resume: result.resume || "Aucun résumé disponible",
            };
          }
          return result;
        })
      );

      setSearchResults(resultsWithDetails);
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div>
      <HeaderAll />
      <Search />

      {searchResults.length === 0 ? (
        <h3>Aucun résultat trouvé</h3>
      ) : (
        <h3>Résultats de recherche pour {searchQuery}</h3>
      )}

      <div className="contentResult">
        {searchResults.map((result, index) => (
          <div className="result" key={index}>
            <h2>{result.title}</h2>
            <p>Posté par {result.postedBy} </p>
            <p> Image du livre: </p>
            <img src={result.imageUrl} alt={`Image de ${result.title}`} />
            <p className="resume">Résumé du livre: {result.resume}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
