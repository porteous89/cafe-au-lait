import "../assets/css/navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({name, cart}) => {
    return (
        <nav className="navbar navbar-light navbar-expand-md sticky-top nav-bar">
            <div className="container">
                <a className="navbar-brand" href="#">{name}</a>
                <button data-bs-toggle="collapse" data-bs-target="#navcol-1" className="navbar-toggler">
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggle-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav ns-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Menu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tables</a>
                        </li>
                        {/* <li className="nav-item">
                        <button onClick={} className="btn btn-outline-dark d-flex align-items-end" type="button">
                            <i className="fas fa-shopping-cart"/>
                            <span className="badge bg-danger rounded-pill">{cart}</span>
                            </i>
                        </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Header;