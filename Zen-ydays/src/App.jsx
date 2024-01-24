import { Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext.jsx";
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
import Result from "./pages/Search/result.jsx";
import Search from "./components/Search.jsx";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <CategoryProvider>
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
            <Route path="/results" element={<Result />} />
            <Route path="/search" element={<Search />} />
            
          </Routes>
        </CategoryProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
