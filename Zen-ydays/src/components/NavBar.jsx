import Plume from "../assets/plume.svg";
// import Home from "../assets/home.svg";
// import Search from "../assets/search.svg";
// import Bookmark from "../assets/bookmark.svg";
// import User from "../assets/user.svg";
// import Message from "../assets/Message.svg";

import {
  faBookmark,
  faHouse,
  faMessage,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles/navbar.css";

const NavBar = () => {
  return (
    <>
      <nav>
        <div className="navBar">
          <div className="plume">
            <a href="/check/post">
              {" "}
              <img className="post" src={Plume} alt="write" />
            </a>
          </div>

          <div className="icons">
            <a href="/check/connected">
              {" "}
              {/* <img className="icon" src={Home} alt="home" /> */}
              <FontAwesomeIcon icon={faHouse} size="xl" color="black" />
            </a>

            <a href="/check/Messages">
              {" "}
              <FontAwesomeIcon icon={faMessage} size="xl" color="black" />{" "}
            </a>

            <a href="/search">
              {" "}
              <FontAwesomeIcon icon={faSearch} size="xl" color="black" />{" "}
            </a>

            <a href="#">
              {" "}
              <FontAwesomeIcon icon={faBookmark} size="xl" color="black" />{" "}
            </a>
            <a href="/check/Profil">
              {" "}
              <FontAwesomeIcon icon={faUser} size="xl" color="black" />
            </a>

            <a href="#"></a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;