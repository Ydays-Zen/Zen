import Plume from "../assets/plume.svg";

import "./styles/menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  return (
    <>
      <nav>
        <div className="contenue">
          <div className="iconsFa">
            <a href="#">
              {" "}
              <FontAwesomeIcon icon={faHouse} size="xl" color="black" />
            </a>

            <a href="#">
              {" "}
              <FontAwesomeIcon icon={faSearch} size="xl" color="black" />{" "}
            </a>
          </div>

          <div className="write">
            <a href="/check/post">
              {" "}
              <img className="post" src={Plume} alt="Logo Zen" />
            </a>
          </div>

          <div className="iconsFa">
            <a href="#">
              {" "}
              <FontAwesomeIcon icon={faBookmark} size="xl" color="black" />{" "}
            </a>

            <a href="/messagerie">
              {" "}
              <FontAwesomeIcon icon={faUser} size="xl" color="black" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
