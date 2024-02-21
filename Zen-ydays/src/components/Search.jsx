import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/Search.css";
import HeaderAll from "../layout/HeaderAll.jsx";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      <HeaderAll />

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
    </>
  );
};

export default Search;
