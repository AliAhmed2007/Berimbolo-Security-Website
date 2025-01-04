import { Link } from 'react-router-dom'
import ProCamera from '../../assets/images/ProCamera.png'

function CTA() {
  return (
    <div className='cta rounded-4 d-flex justify-content-between align-items-center'>
        <div className="cta-content d-flex flex-column gap-4 justify-content-start align-items-center px-5 pt-5 pt-md-0">
            <h6>Home Security</h6>
            <h1>Get Started Today</h1>
            <p>Every Berimbolo home security system features our exclusive Smart Deter technology, engineered to intelligently identify and deter real threats, using light and sound to scare away lurkers before they become burglars.</p>
            <button className="btn btn-warning btn-lg rounded-pill fw-bold">
                Get a Quote <i className="bi bi-arrow-right"></i>
            </button>
            <Link className='d-block'>Berimbolo Home Security Systms <i className="bi bi-arrow-right"></i></Link> 
        </div>
        <div className="cta-image">
            <img className='d-none d-lg-inline' src={ProCamera} alt="ProCamera" />
        </div>
    </div>
  )
}

export default CTA