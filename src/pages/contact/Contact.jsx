import 'bootstrap/dist/css/bootstrap.min.css';

function Contact() {
  return (
    <div className="contact-container d-flex justify-content-center align-items-center pb-5 bg-dark">
      <form
        className="text-center mx-auto fs-5 bg-light w-75 p-5 py-3 mt-4 shadow-lg rounded-3"
      >
        <h2 className="mb-4 text-primary">Contact Us</h2>

        <div className="mb-4">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input type="text" id="name" className="form-control border-primary shadow-none" />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input type="email" id="email" className="form-control border-primary shadow-none" />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea className="form-control border-primary shadow-none" id="message" rows="4"></textarea>
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="sendMessage"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="sendMessage">
            Send me a copy of this message
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block mb-4 btn-lg px-4"
          style={{ backgroundColor: "#0056b3", borderColor: "#0056b3", fontWeight: "bold" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
