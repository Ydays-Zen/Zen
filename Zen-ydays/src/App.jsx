import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Connected from "./pages/Connected/checked/Connected.jsx";
import Check from "./pages/Connected/Check.jsx";
import Post from "./pages/Post/post.jsx";
import Profil from "./pages/Profil/Profil.jsx";
<<<<<<< HEAD
import Message from "./pages/Messages/Message.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
=======
import UserDifferent from "./pages/userDifferent/userDifferent.jsx";

>>>>>>> 7e438c0f84660b979cdd97b1c4011bbee6095d40

const App = () => {
  return (
    <div>
      <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/check" element={<Check />}>
          <Route path="connected" element={<Connected />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/check/Post" element={<Post />} />
        <Route path="/check/Messages" element={<Message />} />
        <Route path="/check/Profil" element={<Profil />} />
        <Route path="/check/userDifferent" element={<UserDifferent />} />

      </Routes>
      </UserContextProvider>
    </div>
  );
};

export default App;
