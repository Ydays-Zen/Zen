import { useState, useRef, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signUp } = useContext(UserContext);
  const formRef = useRef();
  const navigate = useNavigate();

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Les mots de passe ne correspondent pas");
    } else if (
      inputs.current[1].value.length < 6 ||
      inputs.current[2].value.length < 6
    ) {
      setValidation("6 caractères minimum");
    } else {
      try {
        const cred = await signUp(
          inputs.current[0].value,
          inputs.current[1].value
        );

        formRef.current.reset();
        setValidation("");
        navigate("/check/connected");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setValidation("Email déjà utilisé");
        }

        if (error.code === "auth/invalid-email") {
          setValidation("Email invalide");
        }
        setTimeout(() => {
          setValidation("");
        }, 2000);
      }
    }
  };

  return (
    <div>
      <h2>Sign up</h2>

      <form onSubmit={handleForm} ref={formRef}>
        <input
          ref={addInputs}
          type="email"
          name="email"
          placeholder="Email"
          id="signup"
          required
        />
        {/*<input type="text" name="pseudo" placeholder="Pseudo" id="pseudo" required/>*/}
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
