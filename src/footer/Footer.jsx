import React from 'react'
import PropTypes from 'prop-types'
import './Footer.css';
import { Link } from "react-router-dom";

function Footer({ path = '/' }) {
  return (
    <div className="footer">
      <Link
        className='link-base btn-back'
        to={path}>
        Back
      </Link>
    </div>
  )
}
Footer.propTypes = {
  path: PropTypes.string,
}
export default Footer;