import React from 'react';
import FooterLogo from "./FooterLogo";
import '../../styles/Footer.css'
function Footer (){
    return(
        <div className="footer_b">
            <div className="logo-footer">
                <FooterLogo alt="Footer Logo" />
            </div>
            <div className="address">
                <div className="address_rows">
                    <p className="address_q">Studio 20m Kirsty Burgs</p>
                    <p className="address_p">New Jasonborough</p>
                    <p className="address_p">info@skan.com</p>
                </div>
                <div className="copyright"> Copyright, 2023</div>
            </div>
        </div>
    )
}

export default Footer;