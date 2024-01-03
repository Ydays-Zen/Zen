import Plume from "../assets/plume.svg";
import Home from "../assets/home.svg";
import Search from "../assets/search.svg";
import Bookmark from "../assets/bookmark.svg";
import User from "../assets/user.svg";
import Message from "../assets/Message.svg";

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
            <a href="#">
              {" "}
              <img className="icon" src={Home} alt="home" />
            </a>

            <a href="/messagerie">
              {" "}
              <img className="icon" src={Message} alt="Message" />
            </a>

            <a href="#">
              {" "}
              <img className="icon" src={Search} alt="search" />
            </a>

            <a href="#">
              {" "}
              <img className="icon" src={Bookmark} alt="save" />
            </a>

            <a href="#">
              {" "}
              <img className="icon" src={User} alt="User" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
