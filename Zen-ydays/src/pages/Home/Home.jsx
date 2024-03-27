import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import { auth, firestore, provider } from "../../db/firebase-config.jsx";
import "./home.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Home = () => {
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signIn } = useContext(UserContext);
  const formRef = useRef();
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
          follow: [],
          followers: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signup = () => {
    navigate("/signup");
  };

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      inputs.current[0].value.length == "" ||
      inputs.current[1].value.length == ""
    ) {
      setValidation("Veuillez remplir tous les champs");
      return;
    }

    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );

      console.log("Cred:", cred);

      formRef.current.reset();
      setValidation("");
      navigate("/check/connected");
    } catch (error) {
      setValidation("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="auth">
      <h2>Connexion</h2>

      <form onSubmit={handleForm} ref={formRef}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            ref={addInputs}
            type="email"
            name="email"
            placeholder="Email"
            id="signup"
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            ref={addInputs}
            type="password"
            name="password"
            placeholder="Password"
            id="password"
          />
        </div>

        <p>{validation}</p>
        <button>Connexion</button>
      </form>

      <button
        onClick={signInWithGoogle}
        type="button"
        className="login-with-google-btn"
      >
        Sign in with Google
      </button>

      <div className="separation">
        <span className="line"></span>
        <p>Ou</p>
        <span className="line"></span>
      </div>

      <button className="second-btn" onClick={signup}>
        Créer un compte
      </button>
    </div>
  );
};

export default Home;
