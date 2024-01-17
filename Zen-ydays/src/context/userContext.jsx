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
  const [userList, setUserList] = useState([]); // Utiliser l'état pour stocker la liste des utilisateurs

  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  useEffect(() => {
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
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ signUp, currentUser, signIn, userList }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
