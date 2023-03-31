import "../assets/css/navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from '../../src/imageData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Header = ({name, cart}) => {

const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
};
const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
}

    return (
        
        <nav className="navbar navbar-light navbar-expand-md sticky-top nav-bar">
            
                
                <div className="navbar-nav" id="navcol-1">
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
                            <a className="nav-link" href="#" button>Tables</a>
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
               
            
            <div className="relative flex items-center">
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
            <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                {data.map((item) => (
                    <img className='w-[180px] h-[180px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300' src={item.img} alt='/' />
                    ))}
                
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
            </div>
            
                    </nav>
    )
};

export default Header;