import {
  faBookmark,
  faCog,
  faEnvelope,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../context/userContext";
import { auth } from "../db/firebase-config";
const cookies = new Cookies();

import Category from "./Category";
import "./styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Deconnexion
  const logOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav>
      <div
        className={`burger-menu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`menu-items ${isOpen ? "open" : ""}`}>
        <li>
          <FontAwesomeIcon icon={faHome} />
          <a href="/" onClick={closeMenu}>
            Accueil
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faEnvelope} />
          <a href="/check/Messages" onClick={closeMenu}>
            Messages
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faSearch} />
          <a href="/check/result" onClick={closeMenu}>
            Recherche
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faBookmark} />
          <a href="/" onClick={closeMenu}>
            Enregistrer
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <a href="/check/Profil" onClick={closeMenu}>
            Profil
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faCog} />
          <a href="/" onClick={closeMenu}>
            Paramètres
          </a>
        </li>
        <Category />
        <li className="button-logout">
          {currentUser && <button onClick={logOut}>Log Out</button>}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
