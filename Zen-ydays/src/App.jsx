import { Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import Check from "./pages/Connected/Check.jsx";
import Connected from "./pages/Connected/checked/Connected.jsx";
import Home from "./pages/Home/Home.jsx";
import Message from "./pages/Messages/Message.jsx";
import Post from "./pages/Post/Post.jsx";
import Profil from "./pages/Profil/Profil.jsx";
import Readbooks from "./pages/Readbooks/Readbook.jsx";
import Result from "./pages/Search/Result.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import UserDifferent from "./pages/UserDifferent/UserDifferent.jsx";

const App = () => {
  // Définissez votre fonction handleUser ici
  const handleUser = (user) => {
    // Faites quelque chose avec l'utilisateur
    console.log("User:", user);
  };

  return (
    <div>
      <UserContextProvider>
        <CategoryProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/check" element={<Check />}>
              <Route path="connected" element={<Connected />} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/check/Post" element={<Post />} />
            <Route path="/check/Messages" element={<Message />} />
            <Route path="/check/profil" element={<Profil />} />
            <Route path="/result" element={<Result />} />
            {/* <Route path="/search" element={<Search />} /> */}
            <Route path="/check/readbooks/:bookId" element={<Readbooks />} />
            <Route
              path="/check/userDifferent/:userId"
              element={<UserDifferent handleUser={handleUser} />} // Passez handleUser en tant que prop à UserDifferent
            />
          </Routes>
        </CategoryProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
