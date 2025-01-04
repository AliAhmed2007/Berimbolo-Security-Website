import { Link } from "react-router-dom";
import navItems from "../../utils/AllNavigations";
import PropTypes from 'prop-types';

export default function Offcanvas({handleSearchClick , setIsTogglerOpen, isTogglerOpen, darkLogo}) {
  return (
    <div
        className={`offcanvas offcanvas-start text-dark ${isTogglerOpen ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        data-bs-backdrop="true"
      >
        <div className="offcanvas-header p-3 pt-4" data-bs-scroll="true" tabIndex="-1">
          <div className="company d-flex gap-4 align-items-center ">
            <img src={darkLogo} alt="logo" className='logo' />
            <h2 className='mt-3'>Berimbolo</h2>
          </div>
          <button
            type="button"
            className="btn-close btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => setIsTogglerOpen(false)}
          ></button>
        </div>
        <div className="offcanvas-body position-relative text-white">
          <ul className="navbar-nav">
            <div className="accordion" id="navlinksAccordion">
              {navItems.map((item) => (
                <>
                  {
                    !item.collapsable
                      ? <Link to={item.name.toLowerCase()} className='text-dark d-block px-4 py-3 collapsed-links' > {item.name} </Link>
                      : <div key={item.id} className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${item.id}`}
                            aria-expanded="true"
                            aria-controls={`collapse-${item.id}`}
                          >
                            {item.name}
                          </button>
                        </h2>
                        <div
                          id={`collapse-${item.id}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#navlinksAccordion"
                        >
                          <div className="accordion-body">
                            {item.collapsable && item.navigationSections ? (
                              <div className="accordion" id={`subAccordion-${item.id}`}>
                                {Object.entries(item.navigationSections).map(
                                  ([sectionName, links]) => {
                                    if (sectionName === 'sectionId') return null;
                                    return (
                                      <div key={sectionName} className="accordion-item">
                                        <h2 className="accordion-header">
                                          <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${sectionName}-${item.id}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse-${sectionName}-${item.id}`}
                                          >
                                            {sectionName}
                                          </button>
                                        </h2>
                                        <div
                                          id={`collapse-${sectionName}-${item.id}`}
                                          className="accordion-collapse collapse"
                                          data-bs-parent={`#subAccordion-${item.id}`}
                                        >
                                          <div className="accordion-body">
                                            <ul>
                                              {links.map((link, index) => (
                                                <li key={index}>
                                                  <Link className='text-dark d-block py-2 offcanvas-links' to={link.path}>{link.text}</Link>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div >
                  }
                </>
              ))}
              <div className="beside-links d-flex align-items-center flex-column gap-5 text-dark">
                <div className="register">
                  <button className='btn btn-danger text-white btn-lg py-2 px-5 w-100 rounded-pill'>Sign Up</button>
                </div>
                <div className="search d-flex align-items-center gap-3 position-relative">
                  <input type="text" placeholder='Search...' className="form-control-lg rounded-pill search-form p-3 " />
                  <i
                    className={`bi bi-search fs-3 position-absolute `}
                    onClick={handleSearchClick}
                    style={{ cursor: 'pointer', top: '50%', right: '10px', transform: 'translate(-50%, -50%)' }}
                  ></i>

                </div>
                <div className="contact d-flex flex-column gap-2 text-center">
                  <span>Get Peace Of Mind Today</span>
                  <Link to='contact' className='d-flex gap-2 align-items-center btn btn-warning btn-lg rounded-pill fw-bold' >
                    <i className="bi bi-telephone-fill fs-3"></i>
                    <span>+1 (555) 123-4567</span>
                  </Link>
                </div>
              </div>
            </div>
          </ul>
          <div className="social-media">
            <div className="d-flex justify-content-evenly gap-4 mt-5 text-dark">
              <i style={{cursor: 'pointer'}} className="bi bi-facebook fs-3"></i>
              <i style={{cursor: 'pointer'}} className="bi bi-twitter fs-3"></i>
              <i style={{cursor: 'pointer'}} className="bi bi-instagram fs-3"></i>
              <i style={{cursor: 'pointer'}} className="bi bi-linkedin fs-3"></i>
            </div>
          </div>
        </div>
    </div >
  )
}

Offcanvas.propTypes = {
  handleSearchClick: PropTypes.func.isRequired,
  setIsTogglerOpen: PropTypes.func.isRequired,
  isTogglerOpen: PropTypes.bool.isRequired,
  darkLogo: PropTypes.string.isRequired
};


