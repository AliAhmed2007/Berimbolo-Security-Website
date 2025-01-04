import { Link } from "react-router-dom"
import ProductsSection from "../../components/Home/ProductsSection"
import SolutionsSection from "../../components/Home/SolutionsSection"
import FAQ from "../../components/shared/FAQ"
import CTA from "../../components/Home/CTA"
import Testimonials from "../../components/Home/Testimonials"

function Home() {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-shadow">
          <div className="container">
            <div className="hero-content d-flex flex-column gap-4 justify-content-start align-items-start ">
              <h3>Smart Home Alarm Systems</h3>
              <h1 className="hero-title text-start">Berimbolo Security, <br /> Your Trusted Partner In Security Solutions</h1>
              <p className="hero-description text-start fs-5">Personalized Security Risk Assessments, Tailored Solutions for Homes & Businesses, Fully Integrated Security Systems</p>
              <Link to='services' className='productsLink d-flex gap-2 align-items-center btn btn-warning btn-lg rounded-pill fw-bold flex-row' >
                Explore Our Services <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Link to='#requestQuote' className="d-block fw-bold separator py-3 px-5 fs-2 m-5 rounded-4 text-center">Call <span className="text-warning">+1(555)123-4567</span> now to get a free quote</Link>
      <section className="installation-section text-white  mx-0 m-md-5  rounded-4">
        <div className="container-fluid px-5">
          <div className="installation-content text-center d-flex flex-column gap-3 justify-content-center align-items-center">
            <h2>Professional Installation</h2>
            <p className="fs-5">
              Our team of experts will install your security system with precision and care, ensuring your peace of mind.
            </p>
            <Link
              to="contact"
              className="btn btn-warning btn-lg rounded-pill fw-bold"
            >
              Contact Us <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
      <section className="products-section my-5 d-none d-md-block">
        <div className="container">
          <ProductsSection />
        </div>
      </section>
      <section className="products-section my-5">
        <div className="container">
          <SolutionsSection />
        </div>
      </section>

      <section className="cta-section my-5 py-5 py-sm-0">
        <div className="container">
          <CTA />
        </div>
      </section>

      <section className="testimonials my-5">
        <Testimonials />
      </section>

      <section className="faq-section my-5">
        <div className="container">
          <FAQ />
        </div>
      </section>
    </div>
  )
}

export default Home