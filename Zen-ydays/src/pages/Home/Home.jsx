import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, firestore } from "../../db/firebase-config.jsx";
import { collection, getDocs, addDoc, where, query} from "firebase/firestore";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Home = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      navigate("/check/connected");

      const userRef = collection(firestore, "users");
      const userQuery = query(userRef, where("ID", "==", result.user.uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        await addDoc(userRef, {
          ID: result.user.uid,
          displayName: result.user.displayName,
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
