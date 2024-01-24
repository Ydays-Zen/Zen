// userContext.jsx

import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, query, getDocs } from "firebase/firestore";

import { auth, firestore } from "../db/firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
<<<<<<< HEAD
  const [userList, setUserList] = useState([]); // Utiliser l'état pour stocker la liste des utilisateurs
=======
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
>>>>>>> 7e438c0f84660b979cdd97b1c4011bbee6095d40

  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  useEffect(() => {
<<<<<<< HEAD
    const fetchUsers = async () => {
      try {
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });

        setUserList(users);
      } catch (error) {
        console.error('Error listing users:', error);
      } finally {
        setLoadingData(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      fetchUsers(); // Appeler la fonction pour récupérer la liste des utilisateurs
=======
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingData(false);

      if (user) {
        fetchFollowerFollowingCounts(user.uid);
      } else {
        setFollowerCount(0);
        setFollowingCount(0);
      }
>>>>>>> 7e438c0f84660b979cdd97b1c4011bbee6095d40
    });

    return unsubscribe;
  }, []);

  const fetchFollowerFollowingCounts = async (userId) => {
    try {
      const userDoc = await firestore.collection('utilisateurs').doc(userId).get();
      const userData = userDoc.data();

      if (userData) {
        setFollowerCount(userData.abonnes ? userData.abonnes.length : 0);
        setFollowingCount(userData.abonnements ? userData.abonnements.length : 0);
      }
    } catch (error) {
      console.error('Error fetching follower and following counts:', error);
    }
  };

  return (
<<<<<<< HEAD
    <UserContext.Provider value={{ signUp, currentUser, signIn, userList }}>
=======
    <UserContext.Provider value={{ signUp, currentUser, signIn, followerCount, followingCount }}>
>>>>>>> 7e438c0f84660b979cdd97b1c4011bbee6095d40
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
