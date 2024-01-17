import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../db/firebase-config.jsx"; // Import your Firebase config
import { collection, addDoc } from "firebase/firestore";

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
      setValidation("6 caractères minimum");
    } else {
      try {
        const cred = await signUp(
          inputs.current[1].value,
          inputs.current[2].value
        );
      } catch (error) {
        // ... (your existing error handling code)
      }
    }
  };

  return (
    <div>
      <h2>Sign up</h2>

      <form onSubmit={handleForm} ref={formRef}>
        <input
          ref={addInputs}
          type="text"
          name="displayName"
          placeholder="Pseudo"
          id="displayName"
          required
        />
        <input
          ref={addInputs}
          type="email"
          name="email"
          placeholder="Email"
          id="signup"
          required
        />
        <input
          ref={addInputs}
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          required
        />
        <input
          ref={addInputs}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          id="confirmPassword"
          required
        />
        <p>{validation}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
