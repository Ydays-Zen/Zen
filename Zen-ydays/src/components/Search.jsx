import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/Search.css";
import HeaderAll from "../layout/HeaderAll.jsx";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/result", { state: { searchQuery } });
  };

  return (
    <>
      <input
        className="Search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher..."
      />
      <button className="searchButton" onClick={handleSearch}>
        Rechercher
      </button>

      <HeaderAll />
    </>
  );
};



export default Search;
