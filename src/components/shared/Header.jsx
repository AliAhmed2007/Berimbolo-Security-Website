import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import darkLogo from "../../assets/icons/darkLogo.png";
import lightLogo from "../../assets/icons/ligthLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import Offcanvas from './Offcanvas';
import navItems from '../../utils/AllNavigations';
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { cartContext } from '../../contexts/CartContext';
import ImgForAll from "../../assets/images/boy.jpg";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function Header() {
  const [hoveredNavItem, setHoveredNavItem] = useState(false);
  const [isTogglerOpen, setIsTogglerOpen] = useState(false);
  const { dispatch } = useContext(cartContext);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isLinkHovered = hoveredNavItem ?? false;
  const currentPath = useLocation();

  const showSignUp = currentPath.pathname === '/register' || currentPath.pathname === '/login';

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser({
              firtName: userDoc.data().firstName || currentUser.displayName,
              lastName: userDoc.data().lastName || currentUser.displayName,
              photoURL: userDoc.data().photoURL || currentUser.photoURL, 
            });
          } 
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchUserData();
    }
  }, [auth.currentUser]);

  const navigationTheme = isLinkHovered ? 'light' : 'dark';

  function handleSearchClick() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm.classList.contains('show')) {
      searchByInput();
    } else {
      searchForm.focus();
      setShowSearch(prev => !prev);
    }
  }

  function searchByInput() {
  
  }

  async function logout() {
    await signOut(auth);
    dispatch({ type: "CLEAR_CART" });
    navigate('/login');
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${navigationTheme} bg-${navigationTheme} sticky-top py-4 p-lg-0`} data-bs-theme={navigationTheme}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/">
            <img src={isLinkHovered ? darkLogo : lightLogo} alt="The Logo" className='logo' />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsTogglerOpen(!isTogglerOpen)}
            aria-controls="offcanvasNavbar"
            aria-expanded={isTogglerOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className="nav-item"
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <div className={`nav-link ${isLinkHovered ? 'text-dark' : 'text-white'} py-5 px-3 d-flex gap-2 align-items-center relative navigation-link`}>
                    {item.collapsable
                      ? <span>{item.name}</span>
                      : <Link to={item.name.toLowerCase()}>{item.name}</Link>
                    }

                    {item.collapsable && (
                      <i className={`bi bi-caret-down-fill ms-2 ${isLinkHovered ? 'text-dark' : 'text-white'}`}></i>
                    )}
                  </div>

                  {hoveredNavItem === item.id && item.collapsable && (
                    <div className="list-group">
                      <div className="sections-wrapper d-flex justify-content-evenly py-3">
                        {Object.entries(item.navigationSections).map(([title, links]) => {
                          if (title === 'sectionId') return;
                          return (
                            <div key={`${item.id}-${title}`}>
                              <h3>{title}</h3>
                              <div className="section-links d-flex flex-column mt-3">
                                {links.map((link, index) => (
                                  <Link className='offcanvas-links py-2' key={index} to={link.path}>
                                    {link.text}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="beside-links d-flex align-items-center gap-4">
              <div className="search d-flex align-items-center gap-3 position-relative">
                <input type="text" onBlur={() => setShowSearch(false)} placeholder='Search...' className={`form-control-lg pe-5 rounded-pill search-form ${showSearch ? "show" : "hide"} p-3 `} />
                <i
                  className={`bi bi-search fs-3 ${isLinkHovered ? "text-dark" : "text-white"} position-absolute `}
                  onClick={handleSearchClick}
                  style={{ cursor: 'pointer', top: '50%', right: '10px', transform: 'translate(-50%, -50%)' }}
                ></i>
              </div>

              {!showSignUp && (
                <div className="register">
                  {auth.currentUser
                    ? <Link onClick={logout} className='btn btn-danger text-white p-3 px-4 rounded-pill'>Log Out</Link>
                    : <Link to='register' className='btn btn-danger text-white p-3 px-4 rounded-pill'>Sign Up</Link>
                  }
                </div>
              )}

              {/* Display user profile */}
              {auth.currentUser && user && (
                <Link to='/dashboard' className="profile d-flex align-items-center gap-3">
                  <img
                    src={user.photoURL || ImgForAll}
                    alt="User Profile"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <span className={isLinkHovered ? 'text-dark' : 'text-white'}>{user.firtName} {user.lastName}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Offcanvas handleSearchClick={handleSearchClick} isTogglerOpen={isTogglerOpen} darkLogo={darkLogo} setIsTogglerOpen={setIsTogglerOpen} />
    </>
  );
}

export default Header;
