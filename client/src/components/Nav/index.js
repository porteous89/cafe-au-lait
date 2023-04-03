import "../../assets/css/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "../../imageData";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import cart from "../Cart";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Nav = ({ name, cart }) => {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [activeLink, setActiveLink] = useState("Home");

  const [links, setLinks] = useState([
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Profile", path: "/profile" },
    { name: "Cart", path: "/cart" },
    { name: "Tables", path: "/tables" },
  ]);

  const handleClick = (path) => {
    if (path === "Cart") {
      window.location = "/cart";
    }
    setActiveLink(path);
  };

  const { pathname } = useLocation();

  return (
    <div className="header-container">
      <nav className="navbar navbar-light navbar-expand-md sticky-top nav-bar">
        <span className="navbar-brand">{name}</span>
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-nav" id="navcol-1">
          <ul className="navbar-nav ns-auto">
            {links.map((link) => {
              return (
                <li className="nav-item" key={link.name}>
                  <Link
                    className={`nav-link ${
                      activeLink === link.name ? "active" : ""
                    }`}
                    to={link.name !== "Cart" && link.path}
                    onClick={() => handleClick(link.name)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {Auth.loggedIn() ? (
              <>
                <li className="nav-item">
                  <Link
                    onClick={() => handleClick("Order History")}
                    className={`nav-link ${
                      activeLink === "Order History" ? "active" : ""
                    }`}
                    to="/orderHistory"
                  >
                    Order History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => Auth.logout()}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    onClick={() => handleClick("Login/Signup")}
                    className={`nav-link ${
                      activeLink === "Login/Signup" ? "active" : ""
                    }`}
                    to="/signup"
                  >
                    Login/Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="slider-container">
        <div className="relative flex items-center">
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />
          <div
            id="slider"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {data.map((item, index) => (
              <img
                key={index}
                className="w-[180px] h-[180px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 slide-img"
                src={item.img}
                alt="/"
              />
            ))}
          </div>
          <MdChevronRight
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideRight}
            size={40}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
