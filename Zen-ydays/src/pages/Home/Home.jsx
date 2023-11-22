import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const signin = () => {
    navigate("/signin");
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>Hi, Sign up or sign in</h1>
      <button onClick={signin}>Sign in</button>
      <button onClick={signup}>Sign up</button>
    </div>
  );
};

export default Home;
