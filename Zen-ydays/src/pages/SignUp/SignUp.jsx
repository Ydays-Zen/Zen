import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import { auth, firestore, storage } from "../../db/firebase-config.jsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

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
        imageUrl, // Pass the image URL to the signUp function
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

  return (
    <div>
      <h2>Sign up</h2>

      <form onSubmit={handleForm} ref={formRef}>
        <div>
          <input
            ref={(el) => (inputs.current[0] = el)}
            type="text"
            name="displayName"
            placeholder="Pseudo"
            id="displayName"
          />
        </div>

        <div>
          <input
            ref={(el) => (inputs.current[1] = el)}
            type="email"
            name="email"
            placeholder="Email"
            id="signup"
          />
        </div>

        <div>
          <input
            ref={(el) => (inputs.current[2] = el)}
            type="password"
            name="password"
            placeholder="Password"
            id="password"
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            id="confirmPassword"
          />
        </div>
        <p>{validation}</p>

        <label>Image (URL):</label>
        <input
          type="file"
          name=""
          id=""
          onChange={(event) => {
            const selectedFile = event.target.files[0];
            setImage(selectedFile); // Met à jour l'état de l'image
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
