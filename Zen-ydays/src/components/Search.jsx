import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/Search.css"; 

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/results', { state: { searchQuery } });
  };

  return (

    <div>
      <input
        className="Search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher..."
      />
      <button className="searchButton" onClick={handleSearch}>Rechercher</button>
    </div>
  );
};



export default Search;
