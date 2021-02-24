import React from 'react'
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <Link to="/">
        <i class="fas fa-home"></i>
      </Link>
      <Link to="/movies">
        <i class="fas fa-film"></i>
      </Link>
      <Link to="/settings">
        <i class="fas fa-user-cog"></i>
      </Link>
    </div>
  );
}
export default Footer;