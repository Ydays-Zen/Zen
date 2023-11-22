import { useState, useRef, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

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

    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );

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
        <p>{validation}</p>
        <button>Connect</button>
      </form>
    </div>
  );
};

export default SignIn;
