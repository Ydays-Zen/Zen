import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.jsx";
import Check from "./pages/Connected/Check.jsx";
import Connected from "./pages/Connected/checked/Connected.jsx";
import Home from "./pages/Home/Home.jsx";
import Message from "./pages/Messages/Message.jsx";
import Post from "./pages/Post/post.jsx";
import Profil from "./pages/Profil/Profil.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import UserDifferent from "./pages/UserDifferent/UserDifferent.jsx";
import Readbooks from "./pages/Readbooks/readbooks.jsx";


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
          <Route path="/check/Readbooks/:bookId" element={<Readbooks />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
};

export default App;
