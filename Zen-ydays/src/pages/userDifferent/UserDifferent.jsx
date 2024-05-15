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
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SendMessage from "../../components/SendMessage";
import { auth, firestore } from "../../db/firebase-config";
import HeaderAll from "../../layout/HeaderAll";
import "./userDifferent.css";

const UserDifferent = ({ handleUser }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [booksList, setBooksList] = useState([]);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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
  }, [userId]);

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
  }, [userId]);

  useEffect(() => {
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

    fetchData();
  }, [userId]);

  useEffect(() => {
    const checkFollowing = async () => {
      const currentUser = auth.currentUser;
      const userRef = collection(firestore, "users");

      const userQuerySnapshot = await getDocs(
        query(userRef, where("ID", "==", user?.ID))
      );
      if (!userQuerySnapshot.empty) {
        const userDoc = userQuerySnapshot.docs[0].data();
        setIsFollowing(userDoc.follow?.includes(currentUser?.uid));
      }
    };

    checkFollowing();
  }, [user?.ID]);

  const handleClickMessage = () => {
    handleUser(user);
    setShowSendMessage(true);
  };

  const handleMessageSent = () => {
    setShowSendMessage(false);
  };

  const handleClickFollow = async () => {
    const currentUser = auth.currentUser;

    const userRef = collection(firestore, "users");

    const userQuerySnapshot = await getDocs(
      query(userRef, where("ID", "==", user?.ID))
    );

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id;
      await updateDoc(doc(userRef, userId), {
        follow: arrayUnion(currentUser?.uid),
      });

      const currentUserQuerySnapshot = await getDocs(
        query(userRef, where("ID", "==", currentUser?.uid))
      );

      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const currentUserId = currentUserDoc.id;
        await updateDoc(doc(userRef, currentUserId), {
          followers: arrayUnion(user?.ID),
        });
      } else {
        console.error("Current user document not found.");
      }
    } else {
      console.error("User document not found.");
    }
    setIsFollowing(true);
  };

  const handleClickUnfollow = async () => {
    const currentUser = auth.currentUser;

    const userRef = collection(firestore, "users");

    const userQuerySnapshot = await getDocs(
      query(userRef, where("ID", "==", user?.ID))
    );

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userId = userDoc.id;
      await updateDoc(doc(userRef, userId), {
        follow: arrayRemove(currentUser?.uid),
      });

      const currentUserQuerySnapshot = await getDocs(
        query(userRef, where("ID", "==", currentUser?.uid))
      );

      if (!currentUserQuerySnapshot.empty) {
        const currentUserDoc = currentUserQuerySnapshot.docs[0];
        const currentUserId = currentUserDoc.id;
        await updateDoc(doc(userRef, currentUserId), {
          followers: arrayRemove(user?.ID),
        });
      } else {
        console.error("Current user document not found.");
      }
    } else {
      console.error("User document not found.");
    }
    setIsFollowing(false);
  };

  return (
    <>
      <HeaderAll />

      <main className="mainProfil">
        <div className="container_info">
          <div className="imgProfil">
            <img src={user?.img} alt="" />
            <div className="stats">
              <div>
                <p>Publications</p>
                <p>{booksCount}</p>
              </div>
              <div>
                <p>Abonnés</p>
                <p>{followersCount}</p>
              </div>
              <div>
                <p>Suivis</p>
                <p>{followCount}</p>
              </div>
            </div>
          </div>
          <h2>{user?.displayName}</h2>

          <div className="containerBtn">
            <button onClick={handleClickMessage}>Message</button>

            <button
              className="btnProfil"
              onClick={isFollowing ? handleClickUnfollow : handleClickFollow}
            >
              {isFollowing ? "Abonner" : "Abonné"}
            </button>
          </div>

          {showSendMessage && (
            <SendMessage
              selectedUser={user}
              onMessageSent={handleMessageSent}
            />
          )}
          <div className="menuProfil">
            <div>
              <a href="#">Publications</a>
              <a href="#">Republications</a>
              <a href="#">Sauvegarder</a>
              <a href="#">Brouillon</a>
            </div>
            <div className="line"></div>
          </div>
        </div>

        <div className="container_oeuvres">
          {booksList.map((book) => (
            <div key={book.id} className="book">
              <Link to={`/check/readbooks/${book.id}`} className="link">
                {book.image && (
                  <img
                    src={book.image}
                    alt="Couverture"
                    className="couverture"
                  />
                )}
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
    </>
  );
};

UserDifferent.propTypes = {
  handleUser: PropTypes.func.isRequired,
};

export default UserDifferent;
