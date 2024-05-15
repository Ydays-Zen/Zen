import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { UserContext } from "../../context/userContext.jsx";
import { firestore, storage } from "../../db/firebase-config.jsx";

const SignUp = () => {
  const displayNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const formRef = useRef(null);

  const [validation, setValidation] = useState("");
  const [image, setImage] = useState(null);
  const { signUp } = useContext(UserContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    // Vérifiez si les références aux éléments du formulaire sont définies
    if (
      !displayNameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current
    ) {
      console.error(
        "Les références aux éléments du formulaire ne sont pas définies."
      );
      return;
    }

    // Récupérer les valeurs des champs du formulaire
    const displayName = displayNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Vérifier si tous les champs sont remplis
    if (!displayName || !email || !password || !confirmPassword) {
      setValidation("Veuillez remplir tous les champs.");
      return;
    }

    //regex pour vérifier si l'email est valide
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setValidation("Veuillez entrer un email valide.");
      return;
    }

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      setValidation("Les mots de passe ne correspondent pas.");
      return;
    }

    // regex pour vérifier si le mot de passe contient au moins 8 caractères une lettre majuscule un chiffre et un caractère spécial
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(confirmPassword)) {
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
      // Effectuer l'inscription
      const cred = await signUp(email, password);

      // Enregistrer l'utilisateur dans Firestore
      const imgRef = ref(storage, `images/${v4()}/${image.name + v4()}`);
      await uploadBytes(imgRef, image);
      console.log("Image téléchargée avec succès.");
      const imageUrl = await getDownloadURL(imgRef);
      console.log("Image URL:", imageUrl);

      await addDoc(collection(firestore, "users"), {
        ID: cred.user.uid,
        displayName: cred.user.displayName || displayName,
        img: imageUrl || "",
        follow: [],
        followers: [],
      });

      // Réinitialiser le formulaire et l'état
      formRef.current.reset();
      setValidation("");
      setImage(null);
      navigate("/check/connected");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setValidation("Erreur lors de l'inscription : " + error.message);
    }
  };
  return (
    <div className="auth">
      <h2>Inscription</h2>
      <form onSubmit={handleForm} ref={formRef}>
        {/* Champs du formulaire */}
        <div>
          <label htmlFor="displayName">Pseudo:</label>
          <input type="text" ref={displayNameRef} placeholder="Pseudo" />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" ref={emailRef} placeholder="E-mail" />
        </div>

        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" ref={passwordRef} placeholder="Mot de passe" />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            ref={confirmPasswordRef}
            placeholder="Confirmer le mot de passe"
          />
        </div>

        {/* Champ pour l'image */}
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>

        {/* Bouton de soumission */}
        <button type="submit">Créer un compte</button>
      </form>

      {/* Affichage des messages de validation */}
      <p>{validation}</p>
    </div>
  );
};

export default SignUp;
