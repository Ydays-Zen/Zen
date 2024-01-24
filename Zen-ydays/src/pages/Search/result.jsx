import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../db/firebase-config.jsx';

const Result = () => {
  const location = useLocation();
  const searchQuery = location.state.searchQuery;
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const booksRef = collection(firestore, 'Books');
      const usersRef = collection(firestore, 'users');

      // Requête pour les documents dans la table 'Books' où le champ 'title' correspond à searchQuery
      const booksQuery = query(booksRef, where('title', '==', searchQuery));
      const usersQuery = query(usersRef, where('displayName', '==', searchQuery));

      // Exécutez les deux requêtes
      const booksSnapshot = await getDocs(booksQuery);
      const usersSnapshot = await getDocs(usersQuery);

      // Vérifiez si les résultats existent avant de les traiter avec 'map'
      const booksResults = booksSnapshot.docs.length > 0 ? booksSnapshot.docs.map(bookDoc => {
        const bookData = bookDoc.data();
        return {
          title: bookData.title,
          userId: bookData.userId,
          imageUrl: bookData.image || '', // Ajout de la récupération de l'image
          resume: bookData.resume || '', // Ajout de la récupération du résumé
          source: 'Books',
        };
      }) : [];

      const usersResults = usersSnapshot.docs.length > 0 ? usersSnapshot.docs.map(userDoc => {
        const userData = userDoc.data();
        return {
          displayName: userData.displayName,
          userId: userData.userId,
          source: 'Users',
        };
      }) : [];

      // Combinez les résultats des deux tables
      const combinedResults = [...booksResults, ...usersResults];

      // Pour chaque résultat, récupérez le nom de l'utilisateur, l'URL de l'image, le résumé et d'autres détails
      const resultsWithDetails = await Promise.all(
        combinedResults.map(async (result) => {
          if (result.source === 'Books') {
            // Récupérez le nom de l'utilisateur, l'URL de l'image, le résumé et d'autres détails à partir de la table Users et Books
            const userDoc = await getDoc(doc(usersRef, result.userId));
            const userData = userDoc.exists() ? userDoc.data() : {};

            return {
              ...result,
              postedBy: userData.displayName || 'Utilisateur sans nom',
              imageUrl: result.imageUrl || 'Aucune image disponible',
              resume: result.resume || 'Aucun résumé disponible',
            };
          }
          return result;
        })
      );

      // Mettez à jour l'état avec les résultats combinés
      setSearchResults(resultsWithDetails);
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div>
      <h1>Résultats de recherche pour {searchQuery}</h1>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <strong>{result.title}</strong> posté par {result.postedBy}
            <br />
            Image du livre: <img src={result.imageUrl} alt={`Image de ${result.title}`} />
            <br />
            Résumé du livre: {result.resume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
