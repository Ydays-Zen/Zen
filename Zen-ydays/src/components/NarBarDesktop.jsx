import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from "../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../db/firebase-config";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { faHome, faEnvelope, faSearch, faBookmark, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
const cookies = new Cookies();

import logo from '../assets/logo_zen_blanc.png'; // Importez votre image de logo
import './styles/NavBarDesktop.css'; // Assurez-vous d'importer votre fichier de style CSS pour la version desktop

const NavBarDesktop = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    // Déconnexion
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
        <nav className="desktop-nav">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <ul className="menu-items-desktop">
                <li><FontAwesomeIcon icon={faHome} /><a href="/">Accueil</a></li>
                <li><FontAwesomeIcon icon={faEnvelope} /><a href="/check/Messages">Messages</a></li>
                <li><FontAwesomeIcon icon={faSearch} /><a href="/search">Recherche</a></li>
                <li><FontAwesomeIcon icon={faBookmark} /><a href="/">Enregistrer</a></li>
                <li><FontAwesomeIcon icon={faUser} /><a href="/check/Profil">Profil</a></li>
                <li><FontAwesomeIcon icon={faCog} /><a href="/">Paramètres</a></li>
            </ul>
            {currentUser && <button className='button-logout' onClick={logOut}>Log Out</button>}
        </nav>
    );
};

export default NavBarDesktop;