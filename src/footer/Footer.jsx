import React from 'react'
import PropTypes from 'prop-types'
import './Footer.css';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <Link className='link-base btn-back' to='/'>Back</Link> 
        </div>
    )
}
Footer.propTypes = {
   // isReverseVisible: PropTypes.bool,
}
export default Footer;