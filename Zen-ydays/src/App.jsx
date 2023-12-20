import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Connected from "./pages/Connected/checked/Connected.jsx";
import Check from "./pages/Connected/Check.jsx";
import Post from "./pages/Post/post.jsx";
import Profil from "./pages/Profil/Profil.jsx";
import UserDifferent from "./pages/userDifferent/userDifferent.jsx";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/check" element={<Check />}>
        <Route path="connected" element={<Connected />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/check/Post" element={<Post />} />
        <Route path="/check/Profil" element={<Profil />} />
        <Route path="/check/userDifferent" element={<UserDifferent />} />

      </Routes>
    </div>
  );
};

export default App;
