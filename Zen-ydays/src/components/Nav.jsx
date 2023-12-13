import Message from "../assets/Message.svg";
import Library from "../assets/library.svg";
import Logo from "../assets/logo_zen.png";

import "./styles/Nav.css";

function Nav() {
  return (
    <>
      <nav>
        <div className="content">
          <img className="logo" src={Logo} alt="Logo Zen" />

          <div>
            <a href="#">
              {" "}
              <img src={Library} alt="Library" />
            </a>

            <a href="/messagerie">
              {" "}
              <img src={Message} alt="Message" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
