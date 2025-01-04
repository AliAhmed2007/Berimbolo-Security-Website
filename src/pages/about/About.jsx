import aboutImg from "../../assets/images/LandingPage.jpeg";
import Testimonials from "../../components/Home/Testimonials";
import FAQ from "../../components/shared/FAQ";
function About() {
  const features = [
    {
      title: "Reliable Protection",
      icon: "bi-shield-fill-check",
      description:
        "Our systems are designed to deliver unmatched security with 24/7 monitoring and instant alerts.",
    },
    {
      title: "Innovative Solutions",
      icon: "bi-lightbulb-fill",
      description:
        "Combining the latest technology with intelligent designs for seamless security management.",
    },
    {
      title: "Customer-Centric",
      icon: "bi-people-fill",
      description:
        "Our priority is to build lasting relationships by delivering exceptional service.",
    },
    {
      title: "Award-Winning",
      icon: "bi-award-fill",
      description:
        "Recognized for our excellence in innovation and client satisfaction.",
    },
  ]
  return (
    <>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            {/* Image Section */}
            <div className="col-12 col-lg-6 col-xl-5 mb-4 mb-lg-0">
              <img
                className="img-fluid rounded shadow"
                loading="lazy"
                src={aboutImg}
                alt="Berimbolo Security - About Us"
              />
            </div>

            {/* Content Section */}
            <div className="col-12 col-lg-6 col-xl-7">
              <div className="px-lg-4">
                <h2 className="mb-4 fw-bold text-primary">Who Are We?</h2>
                <p className="lead text-secondary mb-4">
                  At <strong>Berimbolo Security</strong>, we specialize in providing top-notch security solutions tailored to protect what matters most to you. From residential safety to business security, we are your trusted partner in ensuring peace of mind.
                </p>
                <p className="mb-5">
                  Our team combines cutting-edge technology with years of expertise to deliver reliable, innovative, and affordable security systems. We believe in empowering our clients with knowledge, transparency, and superior service to make informed decisions for their safety.
                </p>

                {/* Feature Highlights */}
                <div className="row g-4">
                  {features.map((feature, index) => (
                    <div className="col-12 col-md-6" key={index}>
                      <div className="d-flex align-items-start">
                        <div className="me-3 text-primary">
                          <i className={`bi ${feature.icon} fs-1`}></i>
                        </div>
                        <div>
                          <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                          <p className="text-secondary mb-0">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-5 px-5 ">
        <FAQ />
      </section>
      <section className="my-5">
        <Testimonials />
      </section>
    </>
  );
}

export default About;
