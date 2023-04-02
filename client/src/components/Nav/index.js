import "../../assets/css/navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from '../../imageData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Auth from "../../utils/auth";
import  cart  from '../Cart';

const Nav = ({name, cart}) => {

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div className="header-container">
      <nav className="navbar navbar-light navbar-expand-md sticky-top nav-bar">
        <span className="navbar-brand" href="#">{name}</span>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"/>
          </button>
        <div className="navbar-nav" id="navcol-1">
          <ul className="navbar-nav ns-auto">
            <li className="nav-item">
            <NavLink className="nav-link active" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/menu">Menu</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/profile">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/cart">Cart</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/tables" button>Tables</NavLink>
            </li>
            {Auth.loggedIn() ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orderHistory">
                    Order History
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={() => Auth.logout()}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/signup">
                    Login/Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="slider-container">
        <div className="relative flex items-center">
          <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
          <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {data.map((item) => (
              <img className='w-[180px] h-[180px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' src={item.img} alt='/' />
            ))}
          </div>
          <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
        </div>
      </div>
    </div>
  )
};

export default Nav;