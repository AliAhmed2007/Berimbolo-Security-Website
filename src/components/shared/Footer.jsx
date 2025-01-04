import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import lightLogo from '../../assets/icons/ligthLogo.png';
function Footer() {
  return (
    <footer className="footer-section bg-dark text-white p-0 pt-5 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="footer-logo d-flex gap-2 align-items-center justify-content-center mb-4">
              <img src={lightLogo} alt="Logo" className='logo'/>
              <h1 className='m-0'>Berimbolo Security</h1>
            </div>
          </div>
          <div className="col-md-3">
            <h5>Products and Services</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/packages/home-security">Home Security Systems</Link></li>
              <li><Link to="/packages/security-cameras">Security Cameras</Link></li>
              <li><Link to="/products/doorbell-camera">Doorbell Cameras</Link></li>
              <li><Link to="/products/outdoor-camera">Outdoor Camera Pro (Gen 2)</Link></li>
              <li><Link to="/packages/home-automation">Smart Home Automation</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Resources</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/resources">Berimbolo Blog</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Company</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/company/about-us">About Berimbolo</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/locations">Store Locations</Link></li>
              <li><Link to="/company/newsroom">Newsroom</Link></li>
              <li><Link to="/company/careers">Careers</Link></li>
              <li><Link to="/company/gives-back">Berimbolo Gives Back</Link></li>
              <li><Link to="/company/customer-stories">Customer Stories</Link></li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <div className="footer-social">
              <a href="https://www.facebook.com/BerimboloHome/" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
              <a href="https://x.com/BerimboloHome" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
              <a href="https://www.instagram.com/Berimbolo/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="https://www.youtube.com/Berimbolo" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube"></i></a>
              <a href="https://www.pinterest.com/Berimbolo/" target="_blank" rel="noopener noreferrer"><i className="bi bi-pinterest"></i></a>
              <a href="https://www.linkedin.com/company/Berimbolo" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>Copyright © 2024 Berimbolo Security. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;