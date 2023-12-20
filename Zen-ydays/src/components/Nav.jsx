import Logo from "../assets/logo_zen.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "./styles/Nav.css";

function Nav() {
  return (
    <>
      <nav>
        <div className="content">
          <img className="logo" src={Logo} alt="Logo Zen" />
          <div>
            <a href="/messagerie">
              {" "}
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="xl"
                color="black"
              />{" "}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
