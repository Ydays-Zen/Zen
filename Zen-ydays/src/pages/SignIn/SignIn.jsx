import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";

const SignIn = () => {
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signIn } = useContext(UserContext);
  const formRef = useRef();
  const navigate = useNavigate();

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
    <div>
      <h2>Sign in</h2>

      <form onSubmit={handleForm} ref={formRef}>
        <input
          ref={addInputs}
          type="email"
          name="email"
          placeholder="Email"
          id="signup"
        />
        <input
          ref={addInputs}
          type="password"
          name="password"
          placeholder="Password"
          id="password"
        />
        <p>{validation}</p>
        <button>Connect</button>
      </form>
    </div>
  );
};

export default SignIn;
