import Plume from "../assets/plume.svg";

import {
  faBookmark,
  faHouse,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/menu.css";

const Menu = () => {
  return (
    <>
      <nav>
        <div className="contenue">
          <div className="iconsFa">
            <a href="/check/connected">
              {" "}
              <FontAwesomeIcon icon={faHouse} size="xl" color="black" />
            </a>

            <a href="/result">
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

            <a href="/check/Profil">
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