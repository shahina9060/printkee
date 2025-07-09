import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); 
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const toggleSearch = () => {
    setIsSearchVisible((prevSearch) => !prevSearch);
  };

  console.log("keyword",keyword)

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const query = keyword.trim();
    if (query) {
      // navigate(`/search/${encodeURIComponent(query)}`);
      navigate(`/search?query=${encodeURIComponent(query)}`); // ✅ CORRECT

    }
  };

  return (
    <>
      <div
        className="search-icon"
        onClick={toggleSearch}
        style={{
          marginLeft: "10px",
          width: "100px",
          marginTop: "19px",
          marginRight: "5px",
        }}
      >
        <FaSearch size={24} style={{ float: "right" }} />
      </div>
      <div className={`header-search ${isSearchVisible ? "active" : ""}`}>
        <form role="search" method="get" className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            className="search-field"
            placeholder="Search …"
            name="search"
            value={keyword}
            onChange={(e)=>{setKeyword(e.target.value)}}
          />
          <input type="submit" className="search-submit" value="Search" />
        </form>
      </div>
    </>
  );
};

export default SearchBox;
