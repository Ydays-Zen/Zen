import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { firestore } from "../db/firebase-config";

import "./styles/infoProfil.css";

export function Info_profil() {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userQuery = query(
          collection(firestore, "users"),
          where("ID", "==", currentUser.uid)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUserData(userData);

          // Récupérer le nombre de follow et followers
          const followCount = userData.follow ? userData.follow.length : 0;
          const followersCount = userData.followers
            ? userData.followers.length
            : 0;

          setFollowCount(followCount);
          setFollowersCount(followersCount);

          // Si vous stockez également le nombre de "books" dans userData, vous pouvez l'extraire de la même manière
          // const booksCount = userData.books ? userData.books.length : 0;
          // setBooksCount(booksCount);
        } else {
          console.log(
            "Aucun document trouvé pour l'utilisateur avec l'ID:",
            currentUser.uid
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      }
    };

    if (currentUser) {
      fetchUser();
    }
  }, [currentUser]);

  useEffect(() => {
    const countBooks = async () => {
      try {
        const booksRef = collection(firestore, "Books");
        const bookProfil = query(
          booksRef,
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(bookProfil);
        setBooksCount(querySnapshot.size);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    countBooks();
  }, [currentUser]);

  return (
    <div className="container_info">
      <div className="imgProfil">
        <img src={userData?.img} alt="" />
        <div className="stats">
          <div>
            <p>Posts</p>

            <p>{booksCount}</p>
          </div>

          <div>
            <p>Followers</p>

            <p>{followCount}</p>
          </div>

          <div>
            <p>Follow</p>

            <p>{followersCount}</p>
          </div>
        </div>
      </div>
      <h2>{userData?.displayName}</h2>

      <div className="menuProfil">
        <div>
          <a href="#">Posts</a>
          <a href="#">Reposts</a>
          <a href="#">Sauvegarder</a>
          <a href="#">Brouillon</a>
        </div>

        <div className="line"></div>
      </div>
    </div>
  );
}

export default Info_profil;
