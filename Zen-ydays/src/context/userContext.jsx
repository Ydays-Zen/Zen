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
      } catch (error) {
        console.error("Error listing users:", error);
      } finally {
        setLoadingData(false);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      fetchUsers();

      setLoadingData(false);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        signUp,
        currentUser,
        signIn,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
