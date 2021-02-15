import React from 'react'
import './Footer.css';
import { useHistory} from "react-router-dom";

function Footer() {
    const history = useHistory()
    return (
        <div className="footer">
            <button  className='link-base btn-back' 
                onClick={() => {
                    history.goBack()
                }}>
                Back
            </button>
        </div>
    )
}
export default Footer;