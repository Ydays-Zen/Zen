import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SendMessage from "../../components/SendMessage";
import { auth, firestore } from "../../db/firebase-config";
import "./userDifferent.css";

const UserDifferent = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [showSendMessage, setShowSendMessage] = useState(false); // État pour contrôler l'affichage de SendMessage
  const [isFollowing, setIsFollowing] = useState(false);
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    const checkFollowing = async () => {
      const currentUser = auth.currentUser;
      const userRef = collection(firestore, "users");

      const userQuerySnapshot = await getDocs(
        query(userRef, where("ID", "==", userId))
      );
      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0].data();
        setIsFollowing(userDoc.follow.includes(currentUser.uid)); // Vérifie si l'utilisateur est dans la liste des suivis
      }
    };

    checkFollowing();
  }, [userId]);

  const handleUser = (userData) => {
    setUser(userData);
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

          // Récupérer le nombre de follow et followers
          const followCount = userData.follow ? userData.follow.length : 0;
          const followersCount = userData.followers
            ? userData.followers.length
            : 0;

          setFollowCount(followCount);
          setFollowersCount(followersCount);
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
  }, []);

  useEffect(() => {
    const countBooks = async () => {
      try {
        const booksRef = collection(firestore, "Books");
        const bookProfil = query(booksRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(bookProfil);
        setBooksCount(querySnapshot.size);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    countBooks();
  }, []);

  const handleMessageSent = () => {
    setShowSendMessage(false);
  };

  const handleClickMessage = () => {
    handleUser(user); // Passez l'utilisateur sélectionné à la fonction handleUser
    setShowSendMessage(true); // Afficher le composant SendMessage lorsque le bouton est cliqué
  };

  const handleClickUnfollow = async () => {
    const currentUser = auth.currentUser;
    console.log("Current user:", currentUser);

    const userRef = collection(firestore, "users");
    console.log("User reference:", userRef);

    // Recherchez le document avec le champ ID correspondant à l'UID de l'utilisateur ciblé
    const userQuerySnapshot = await getDocs(
      query(userRef, where("ID", "==", userId))
    );

    // Recherchez le document de l'utilisateur connecté
    const currentUserQuerySnapshot = await getDocs(
      query(userRef, where("ID", "==", currentUser.uid))
    );

    // Vérifiez s'il y a un document correspondant pour l'utilisateur ciblé
    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id; // Obtenez l'ID du document de l'utilisateur ciblé
      console.log("User ID:", userId);

      // Supprimez l'UID de l'utilisateur connecté du champ follow de l'utilisateur ciblé
      await updateDoc(doc(userRef, userId), {
        followers: arrayRemove(currentUser.uid),
      });

      // Vérifiez s'il y a un document correspondant pour l'utilisateur connecté
      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const currentUserId = currentUserDoc.id; // Obtenez l'ID du document de l'utilisateur connecté
        console.log("Current user ID:", currentUserId);

        // Supprimez l'UID de l'utilisateur ciblé du champ followers de l'utilisateur connecté
        await updateDoc(doc(userRef, currentUserId), {
          follow: arrayRemove(userId),
        });
      } else {
        console.error("Current user document not found.");
      }

      console.log(`Unfollowed user: ${user.displayName}`);
      console.log(`Unfollowed userID: ${userId}`);
      console.log("UserConnected : ", currentUser.uid);
    } else {
      console.error("User document not found.");
    }
    setIsFollowing(false);
  };

  const handleClickFollow = async () => {
    const currentUser = auth.currentUser;
    console.log("Current user:", currentUser);

    const userRef = collection(firestore, "users");
    console.log("User reference:", userRef);

    // Recherchez le document avec le champ ID correspondant à l'UID de l'utilisateur ciblé
    const userQuerySnapshot = await getDocs(
      query(userRef, where("ID", "==", userId))
    );

    // Recherchez le document de l'utilisateur connecté
    const currentUserQuerySnapshot = await getDocs(
      query(userRef, where("ID", "==", currentUser.uid))
    );

    // Vérifiez s'il y a un document correspondant pour l'utilisateur ciblé
    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id; // Obtenez l'ID du document de l'utilisateur ciblé
      console.log("User ID:", userId);

      // Ajoutez l'UID de l'utilisateur connecté au champ follow de l'utilisateur ciblé
      await updateDoc(doc(userRef, userId), {
        followers: arrayUnion(currentUser.uid),
      });

      // Vérifiez s'il y a un document correspondant pour l'utilisateur connecté
      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const currentUserId = currentUserDoc.id; // Obtenez l'ID du document de l'utilisateur connecté
        console.log("Current user ID:", currentUserId);

        // Ajoutez l'UID de l'utilisateur ciblé au champ followers de l'utilisateur connecté
        await updateDoc(doc(userRef, currentUserId), {
          follow: arrayUnion(userId),
        });
      } else {
        console.error("Current user document not found.");
      }

      console.log(`Followed user: ${user.displayName}`);
      console.log(`Followed userID: ${userId}`);
      console.log("UserConnected : ", currentUser.uid);
    } else {
      console.error("User document not found.");
    }
    setIsFollowing(true);
  };

  // Récupérez les données des livres et des commentaires
  const fetchData = async () => {
    try {
      const booksRef = collection(firestore, "Books");
      const bookProfil = query(booksRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(bookProfil);

      const booksData = [];
      querySnapshot.forEach((doc) => {
        booksData.push({ id: doc.id, ...doc.data() });
      });

      setBooksList(booksData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="mainProfil">
      <div className="container_info">
        <div className="imgProfil">
          <img src={user?.img} alt="" />
          <div className="stats">
            <div>
              <p>Posts</p>
              <p>{booksCount}</p>
            </div>
            <div>
              <p>Followers</p>
              <p>{followersCount}</p>
            </div>
            <div>
              <p>Follow</p>
              <p>{followCount}</p>
            </div>
          </div>
        </div>
        <h2>{user?.displayName}</h2>

        <div className="containerBtn">
          <button className="btnProfil" onClick={handleClickMessage}>
            Message
          </button>
          <button
            className="btnProfil"
            onClick={isFollowing ? handleClickUnfollow : handleClickFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>

        {showSendMessage && (
          <SendMessage selectedUser={user} onMessageSent={handleMessageSent} />
        )}
        <div className="menuProfil">
          <div>
            <a href="#">Posts</a>
            <a href="#">Reposts</a>
            <a href="#">Sauvegarder</a>
            <a href="#">Brouillont</a>
          </div>
          <div className="line"></div>
        </div>
      </div>

      <div className="container_oeuvres">
        {booksList.map((book) => (
          <div key={book.id} className="book">
            <Link to={`/check/readbooks/${book.id}`} className="link">
              <img src={book.image} alt="Couverture" className="couverture" />
              <div className="likes">
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  size="lg"
                  color={"white"}
                />
                <p>{book.likedBy ? book.likedBy.length : 0}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UserDifferent;
