import { createContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../db/firebase-config";

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [currentUser, setCurrentUser] = useState(); // Déplacez cette déclaration ici
    const [loadingData, setLoadingData] = useState(true); // Déplacez cette déclaration ici
    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            setLoadingData(false);
        });

        return unsubscribe;
    },[] );

    return (
        <UserContext.Provider value={{ signUp, currentUser, signIn }}>
            {!loadingData && props.children}
        </UserContext.Provider>
    );
}
