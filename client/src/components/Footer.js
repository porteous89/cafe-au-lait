import React from 'react';
// import { MDBContainer, MDBFooter } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <div className="fixed-bottom">
            <div className="footer-copyright text-center py-3">
                
                    &copy; {new Date().getFullYear()} All Rights Reserved.
                
            </div>
        </div>
    );
};

export default Footer;