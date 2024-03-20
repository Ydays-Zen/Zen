import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import { auth, firestore } from "../../db/firebase-config.jsx";

const SignUp = () => {
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signUp } = useContext(UserContext);
  const formRef = useRef();
  const navigate = useNavigate();

  const UserRef = collection(firestore, "users");

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in and user profile is updated
        // Store UID and display name in the "users" collection
        addDoc(UserRef, {
          ID: user.uid,
          displayName: user.displayName || inputs.current[0].value,
        })
          .then(() => {
            // Document successfully written
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        formRef.current.reset();
        setValidation("");
        navigate("/check/connected");
      }
    });

    return () => unsubscribe();
  }, [UserRef, navigate]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (inputs.current[2].value !== inputs.current[3].value) {
      setValidation("Les mots de passe ne correspondent pas");
    } else if (
      inputs.current[2].value.length < 6 ||
      inputs.current[3].value.length < 6
    ) {
      setValidation("Le mot de passe doit avoir 6 caractères minimum");
    } else if (inputs.current[0].value.length < 3) {
      setValidation("Le pseudo doit avoir 3 caractères minimum");
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
        inputs.current[1].value
      )
    ) {
      setValidation("Email invalide");
    } else if (
      inputs.current[0].value == "" ||
      inputs.current[1].value == "" ||
      inputs.current[2].value == "" ||
      inputs.current[3].value == ""
    ) {
      setValidation("Veuillez remplir tous les champs");
    } else {
      try {
        const cred = await signUp(
          inputs.current[1].value,
          inputs.current[2].value
        );

        // Ajoutez la vérification ici pour voir si l'utilisateur existe déjà
        const userRef = collection(firestore, "users");
        const userQuery = query(userRef, where("ID", "==", cred.user.uid));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          // L'utilisateur n'existe pas, alors ajoutez-le
          await addDoc(userRef, {
            ID: cred.user.uid,
            displayName: cred.user.displayName || inputs.current[0].value,
          });
        }

        formRef.current.reset();
        setValidation("");
        navigate("/check/connected");
      } catch (error) {
        setValidation("Erreur lors de l'inscription");
      }
    }
  };

  return (
    <div>
      <h2>Sign up</h2>

      <form onSubmit={handleForm} ref={formRef}>
        <div>
          <input
            ref={addInputs}
            type="text"
            name="displayName"
            placeholder="Pseudo"
            id="displayName"
          />
        </div>

        <div>
          <input
            ref={addInputs}
            type="email"
            name="email"
            placeholder="Email"
            id="signup"
          />
        </div>

        <div>
          <input
            ref={addInputs}
            type="password"
            name="password"
            placeholder="Password"
            id="password"
          />
        </div>

        <div>
          <input
            ref={addInputs}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            id="confirmPassword"
          />
        </div>
        <p>{validation}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
