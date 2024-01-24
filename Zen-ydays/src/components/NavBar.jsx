import Plume from "../assets/plume.svg";
// import Home from "../assets/home.svg";
// import Search from "../assets/search.svg";
// import Bookmark from "../assets/bookmark.svg";
// import User from "../assets/user.svg";
// import Message from "../assets/Message.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

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

<<<<<<< HEAD
            <a href="/check/Messages">
              {" "}
              <img className="icon" src={Message} alt="Message" />
=======
            <a href="/messagerie">
              <FontAwesomeIcon icon={faPaperPlane} size="xl" color="black" />{" "}
>>>>>>> 7e438c0f84660b979cdd97b1c4011bbee6095d40
            </a>

            <a href="#">
              {" "}
              <FontAwesomeIcon icon={faSearch} size="xl" color="black" />{" "}
            </a>

            <a href="#">
              {" "}
              <FontAwesomeIcon icon={faBookmark} size="xl" color="black" />{" "}
            </a>

            <a href="#"></a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
