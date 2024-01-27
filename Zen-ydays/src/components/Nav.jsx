import Logo from "../assets/logo_zen.png";

import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles/Nav.css";

function Nav() {
  return (
    <>
      <nav>
        <div className="content">
          <img className="logo" src={Logo} alt="Logo Zen" />
          <div>
            <a href="/check/Messages">
              {" "}
              <FontAwesomeIcon icon={faMessage} size="xl" color="black" />{" "}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
