import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, firestore } from "../db/firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingData(false);

      if (user) {
        fetchFollowerFollowingCounts(user.uid);
      } else {
        setFollowerCount(0);
        setFollowingCount(0);
      }
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
    <UserContext.Provider value={{ signUp, currentUser, signIn, followerCount, followingCount }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
