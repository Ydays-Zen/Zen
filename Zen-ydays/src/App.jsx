import { Route, Routes } from "react-router-dom";
import Search from "./components/Search.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import Check from "./pages/Connected/Check.jsx";
import Connected from "./pages/Connected/checked/Connected.jsx";
import Home from "./pages/Home/Home.jsx";
import Message from "./pages/Messages/Message.jsx";
import Post from "./pages/Post/Post.jsx";
import Profil from "./pages/Profil/Profil.jsx";
import Result from "./pages/Search/Result.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
// import UserDifferent from "./pages/UserDifferent/UserDifferent.jsx";
import Published_books from "./pages/Published_book/Published_books.jsx";
import Readbooks from "./pages/Readbooks/Readbook.jsx";
import Settings from "./pages/Settings/Settings.jsx";



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
            {/* <Route path="/check/userDifferent" element={<UserDifferent />} /> */}
            <Route path="/result" element={<Result />} />
            <Route path="/search" element={<Search />} />
            <Route path="/check/Settings" element={<Settings />} />
            <Route path="/check/readbooks/:bookId" element={<Readbooks />} />
            <Route
              path="/check/published_book/"
              element={<Published_books />}
            />
          </Routes>
        </CategoryProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;