import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footerstrap = () => {
    return (
        <MDBFooter className="fixed-bottom">
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} All Rights Reserved.
                </MDBContainer>
            </div>
        </MDBFooter>
    );
};

export default Footerstrap;