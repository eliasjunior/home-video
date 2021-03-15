import React, { useState } from "react";
import PropTypes from "prop-types";
import "./header.css";

function Header({ onChangeSearch }) {
  const [isDisplaySearch, setIsDisplaySearch] = useState(false);

  const displaySearch = () => {
    if (!isDisplaySearch) {
      return (
        <i
          className="fas fa-search"
          onClick={() => {
            setIsDisplaySearch(!isDisplaySearch);
          }}
        ></i>
      );
    }
    return (
      <>
        <i className="fas fa-search header__search_icon_animate"></i>
        <input
          type="text"
          onChange={onChangeSearch}
          placeholder="search movie"
          autoFocus={true}
        ></input>
      </>
    );
  };

  return (
    <div className="header">
      <img src={`/favicon.png`}></img>
      <div className="header__search">{displaySearch()}</div>
    </div>
  );
}
export default Header;
Header.propTypes = {
  onChangeSearch: PropTypes.func.isRequired,
};
