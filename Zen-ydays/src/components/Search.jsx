import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/Search.css";
import Script from "./Script";
import NavBar from "./NavBar";
import NavBarDesktop from "./NarBarDesktop";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768 est un exemple de largeur pour basculer vers la version mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifie la taille de l'écran au chargement de la page

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate("/result", { state: { searchQuery } });
    } else {
      alert("Veuillez entrer une requête de recherche valide.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {isMobile ? <NavBar /> : <NavBarDesktop />}
      <div className="searchBar">
        <input
          className="Search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Rechercher..."
        />
        <button className="searchButton" onClick={handleSearch}>
          Rechercher
        </button>
      </div>

      <main className="mainDisplayBooks">
        <Script />
      </main>
    </>
  );
};

export default Search;
