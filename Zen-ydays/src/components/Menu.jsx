import Message from "../assets/Message.svg";
import Library from "../assets/library.svg";
import Plume from "../assets/plume.svg";

import "./styles/menu.css";

const Menu = () => {
  return (
    <>
      <nav>
        <div className="contenue">
          <div>
            <a href="#">
              {" "}
              <img className="icon" src={Library} alt="Library" />
            </a>

            <a href="#">
              {" "}
              <img className="icon" src={Message} alt="Message" />
            </a>
          </div>

          <div className="write">
            <img className="post" src={Plume} alt="Logo Zen" />
          </div>

          <div>
            <a href="#">
              {" "}
              <img className="icon" src={Library} alt="Library" />
            </a>

            <a href="/messagerie">
              {" "}
              <img className="icon" src={Message} alt="Message" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
