// userContext.jsx

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

import { auth, firestore } from "../db/firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [userList, setUserList] = useState([]); // Utiliser l'état pour stocker la liste des utilisateurs
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });

        setUserList(users);
      } catch (error) {
        console.error("Error listing users:", error);
      } finally {
        setLoadingData(false);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      fetchUsers(); // Call the function to retrieve the list of users

      setLoadingData(false);

      if (user) {
        fetchFollowerFollowingCounts(user.uid);
      } else {
        setFollowerCount(0);
        setFollowingCount(0);
      }
    });

    return () => {
      unsubscribeAuth(); // Unsubscribe from onAuthStateChanged
    };
  }, []);

  const fetchFollowerFollowingCounts = async (userId) => {
    try {
      const userDoc = await firestore
        .collection("utilisateurs")
        .doc(userId)
        .get();
      const userData = userDoc.data();

      if (userData) {
        setFollowerCount(userData.abonnes ? userData.abonnes.length : 0);
        setFollowingCount(
          userData.abonnements ? userData.abonnements.length : 0
        );
      }
    } catch (error) {
      // console.error("Error fetching follower and following counts:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        signUp,
        currentUser,
        signIn,
        followerCount,
        followingCount,
        userList,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}

