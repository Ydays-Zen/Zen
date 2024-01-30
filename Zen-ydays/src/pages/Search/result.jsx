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

      const booksQuery = query(booksRef, where('title', '==', searchQuery));
      const usersQuery = query(usersRef, where('displayName', '==', searchQuery));

      const booksSnapshot = await getDocs(booksQuery);
      const usersSnapshot = await getDocs(usersQuery);

      const booksResults = booksSnapshot.docs.map(bookDoc => {
        const bookData = bookDoc.data();
        return {
          title: bookData.title,
          userId: bookData.userId || '',
          imageUrl: bookData.image || '',
          resume: bookData.resume || '',
          source: 'Books',
        };
      });

      const usersResults = usersSnapshot.docs.map(userDoc => {
        const userData = userDoc.data();
        return {
          displayName: userData.displayName,
          Id: userData.ID,
          source: 'users',
        };
      });

      const combinedResults = [...booksResults, ...usersResults];

      const resultsWithDetails = await Promise.all(
        combinedResults.map(async (result) => {
          if (result.source === 'Books') {
            const userDoc = await getDoc(doc(usersRef, result.userId));
            const userData = userDoc.exists() ? userDoc.data() : {};

            console.log('User name:', userData.displayName);

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
            <strong>{result.title}</strong> posté par {result.postedBy} <br />
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
