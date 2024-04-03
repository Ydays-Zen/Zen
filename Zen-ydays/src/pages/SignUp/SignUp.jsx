import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { UserContext } from "../../context/userContext.jsx";
import { firestore, storage } from "../../db/firebase-config.jsx";

const SignUp = () => {
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signUp } = useContext(UserContext);
  const formRef = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();

    // Tout les champs doivent etre remplis
    if (
      !inputs.current[0].value ||
      !inputs.current[1].value ||
      !inputs.current[2].value ||
      !inputs.current[3].value
    ) {
      setValidation("Veuillez remplir tous les champs.");
      return;
    }

    //regex pour vérifier si l'email est valide
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(inputs.current[1].value)) {
      setValidation("Veuillez entrer un email valide.");
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (inputs.current[2].value !== inputs.current[3].value) {
      setValidation("Les mots de passe ne correspondent pas.");
      return;
    }

    // regex pour vérifier si le mot de passe contient au moins 8 caractères une lettre majuscule un chiffre et un caractère spécial
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(inputs.current[2].value)) {
      setValidation(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial."
      );
      return;
    }
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
        imageUrl
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
          <label>E-mail:</label>
          <input
            ref={(el) => (inputs.current[1] = el)}
            type="email"
            name="email"
            placeholder="E-mail"
            id="signup"
          />
        </div>

        <div>
          <label>Mot de passe:</label>
          <input
            ref={(el) => (inputs.current[2] = el)}
            type="password"
            name="password"
            placeholder="Mot de passe"
            id="password"
          />
        </div>

        <div>
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
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
        <p>
          Vouz avez déjà un compte ?{" "}
          <span onClick={signin}>Connectez-vous</span>
        </p>

        <p>{validation}</p>

        <button type="submit">Créer compte</button>
      </form>

      {/* <div className="separation">
        <span className="line"></span>
        <p>Ou</p>
        <span className="line"></span>
      </div> */}

      {/* <button className="second-btn" onClick={signin}>
        Se connecter
      </button> */}
    </div>
  );
};

export default SignUp;
