import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore, provider } from "../../db/firebase-config.jsx";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = cookies.get("auth-token");

    // Vérifier si le cookie auth-token existe
    if (authToken) {
      // Utilisateur connecté, rediriger vers la page Connected
      navigate("/check/connected");
    }
  }, [navigate]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      navigate("/check/connected");

      const userRef = collection(firestore, "users");
      const userQuery = query(userRef, where("ID", "==", result.user.uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        // L'utilisateur n'existe pas, alors ajoutez-le
        await addDoc(userRef, {
          ID: result.user.uid,
          displayName: result.user.displayName,
          img: result.user.photoURL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signin = () => {
    navigate("/signin");
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <div className="auth">
      <h1>Hi, Sign up or sign in</h1>
      <button onClick={signin}>Sign in</button>
      <button onClick={signup}>Sign up</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};

export default Home;
