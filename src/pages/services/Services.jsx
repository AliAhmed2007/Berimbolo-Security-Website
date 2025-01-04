/* eslint-disable react/no-unescaped-entities */
import InstallationImg from '../../assets/images/installationService.webp';
import MaintainaceImg from '../../assets/images/maintainace.webp';
import MonitoringImg from '../../assets/images/monitoring.png';
import EmergencyImg from '../../assets/images/emergency.png';
import ConsultationImg from '../../assets/images/consultation.png';
import { Link } from 'react-router-dom';

function Services() {
  return (
    <div>
      <section id="hero" className="text-center p-5 bg-light hero-background">
        <div className="hero-overlay"></div>
        <div className="content mb-5 pb-5 position-absolute top-50 start-50 translate-middle">
          <h1>Welcome to Berimbolo Security Services</h1>
          <p>Your safety is our priority. Explore our range of services below.</p>
        </div>
      </section>

      <section id="core_services" className="p-4 px-5 mx-3">
        <h2 className='text-center'>Core Services</h2>

        <div id="installation_services" className="my-3 d-flex flex-column flex-md-row">
          <div className="service-text my-auto">
            <h3>Installation Services</h3>
            <p className="service-description">
              We provide top-notch installation services for all your security needs. Our team of experts ensures that every installation is done with precision and care, using the latest technology and equipment. Whether it's a small residential setup or a large commercial project, we have the expertise to handle it all. Trust us to secure your property with our reliable and efficient installation services.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="service-image">
            <img src={InstallationImg} alt="Installation Services" className="img-fluid custom-img" />
          </div>
        </div>

        <div id="maintenance_services" className="my-3 d-flex flex-column flex-md-row-reverse">
          <div className="service-text my-auto">
            <h3>Maintenance Services</h3>
            <p className="service-description">
              Our maintenance services ensure your security systems are always operational. Regular maintenance checks and timely repairs are crucial to keep your security systems functioning optimally. Our skilled technicians are available round the clock to address any issues and perform routine maintenance. With our comprehensive maintenance services, you can have peace of mind knowing that your security systems are in good hands.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="service-image">
            <img src={MaintainaceImg} alt="Maintenance Services" className="img-fluid custom-img" />
          </div>
        </div>

        <div id="monitoring_services" className="my-3 d-flex flex-column flex-md-row">
          <div className="service-text my-auto">
            <h3>Monitoring Services</h3>
            <p className="service-description">
              24/7 monitoring services to keep you and your property safe. Our state-of-the-art monitoring systems provide real-time surveillance and alerts, ensuring that any suspicious activity is detected and addressed immediately. Our dedicated monitoring team is always on standby to respond to any emergencies and coordinate with local authorities if needed. With our monitoring services, you can rest assured that your property is under constant watch.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="service-image">
            <img src={MonitoringImg} alt="Monitoring Services" className="img-fluid custom-img" />
          </div>
        </div>
      </section>

      <section id="other_services" className="p-4 px-5 mx-3">
        <h2 className='text-center'>Other Services</h2>

        <div id="consultation_services" className="my-3 d-flex flex-column flex-md-row-reverse">
          <div className="service-text my-auto">
            <h3>Consultation Services</h3>
            <p className="service-description">
              Expert consultation to help you choose the best security solutions. Our experienced consultants work closely with you to understand your specific security needs and recommend the most effective solutions. From assessing potential risks to designing a comprehensive security plan, we provide personalized consultation services to ensure that you get the best protection for your property. Let our experts guide you in making informed decisions about your security.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="service-image">
            <img src={ConsultationImg} alt="Consultation Services" className="img-fluid custom-img" />
          </div>
        </div>

        <div id="emergency_services" className="my-3 d-flex flex-column flex-md-row">
          <div className="service-text my-auto">
            <h3>Emergency Services</h3>
            <p className="service-description">
              Quick response emergency services available round the clock. In case of any security breach or emergency situation, our rapid response team is ready to act immediately. We provide swift and effective solutions to mitigate any threats and ensure your safety. Our emergency services are designed to handle any situation with professionalism and urgency, giving you the confidence that help is just a call away.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </div>
          <div className="service-image">
            <img src={EmergencyImg} alt="Emergency Services" className="img-fluid custom-img" />
          </div>
        </div>
      </section>

      <section id="cta" className="text-center p-5 text-white cta-gradient">
        <h2>Ready to Secure Your Property?</h2>
        <Link to='/contact' className="btn btn-primary btn-lg mt-3">Contact Us</Link>
      </section>

    </div>
  );
}

export default Services;
