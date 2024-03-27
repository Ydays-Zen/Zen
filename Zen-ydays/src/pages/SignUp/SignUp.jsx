import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { v4 } from "uuid";
import { UserContext } from "../../context/userContext.jsx";
import {
  auth,
  firestore,
  provider,
  storage,
} from "../../db/firebase-config.jsx";

const cookies = new Cookies();

const SignUp = () => {
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signUp } = useContext(UserContext);
  const formRef = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();

    // Vérifier si une image a été sélectionnée
    if (!image) {
      setValidation("Veuillez sélectionner une photo de profil.");
      return;
    }

    try {
      const imgRef = ref(storage, `images/${v4()}/${image.name + v4()}`);

      // Télécharger l'image vers Firebase Storage
      await uploadBytes(imgRef, image);
      console.log("Image téléchargée avec succès.");

      // Obtenez l'URL de téléchargement de l'image
      const imageUrl = await getDownloadURL(imgRef);
      console.log("Image URL:", imageUrl);

      // Inscrire l'utilisateur avec l'URL de l'image
      const cred = await signUp(
        inputs.current[1].value,
        inputs.current[2].value,
        imageUrl // Pass the image URL to the signUp function
      );

      const userRef = collection(firestore, "users");
      const userSnapshot = await addDoc(userRef, {
        ID: v4(), // Générez un ID unique pour chaque utilisateur
        displayName: cred.user.displayName || inputs.current[0].value,
        img: imageUrl || "",
        follow: [],
        followers: [],
      });

      formRef.current.reset();
      setValidation("");
      setImage(null);
      navigate("/check/connected");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setValidation("Erreur lors de l'inscription : " + error.message);
    }
  };

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

  const signin = () => {
    navigate("/");
  };

  return (
    <div className="auth">
      <h2>Sign up</h2>

      <form onSubmit={handleForm} ref={formRef}>
        <div>
          <label>Pseudo:</label>
          <input
            ref={(el) => (inputs.current[0] = el)}
            type="text"
            name="displayName"
            placeholder="Pseudo"
            id="displayName"
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            ref={(el) => (inputs.current[1] = el)}
            type="email"
            name="email"
            placeholder="Email"
            id="signup"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            ref={(el) => (inputs.current[2] = el)}
            type="password"
            name="password"
            placeholder="Password"
            id="password"
          />
        </div>

        <div>
          <label>Confirm password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            id="confirmPassword"
          />
        </div>
        <div>
          <label>Photo de profil:</label>
          <input
            type="file"
            name=""
            id=""
            onChange={(event) => {
              const selectedFile = event.target.files[0];
              setImage(selectedFile); // Met à jour l'état de l'image
            }}
          />
        </div>

        <p>{validation}</p>

        <button type="submit">Créer compte</button>
      </form>

      <div className="separation">
        <span className="line"></span>
        <p>Ou</p>
        <span className="line"></span>
      </div>

      <button className="second-btn" onClick={signin}>
        Créer un compte
      </button>
    </div>
  );
};

export default SignUp;
