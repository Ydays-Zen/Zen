import Plume from "../assets/plume.svg";
import Home from "../assets/home.svg";
import Search from "../assets/search.svg";
import Bookmark from "../assets/bookmark.svg";
import User from "../assets/user.svg";

import "./styles/menu.css";

const Menu = () => {
  return (
    <>
      <nav>
        <div className="contenue">
          <div>
            <a href="#">
              {" "}
              <img className="icon" src={Home} alt="Library" />
            </a>

            <a href="#">
              {" "}
              <img className="icon" src={Search} alt="Message" />
            </a>
          </div>

          <div className="write">
            <a href="/check/post">
              {" "}
              <img className="post" src={Plume} alt="Logo Zen" />
            </a>
          </div>

          <div>
            <a href="#">
              {" "}
              <img className="icon" src={Bookmark} alt="Library" />
            </a>

            <a href="/messagerie">
              {" "}
              <img className="icon" src={User} alt="Message" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
