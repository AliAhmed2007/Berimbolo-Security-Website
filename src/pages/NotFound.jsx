/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="container my-5 py-5 text-center">
        <div className="alert alert-danger py-4 shadow-lg">
          <h1 className="display-4 fw-bold text-danger">404</h1>
          <h2 className="mb-3">Not Found Page</h2>
          <p className="fs-5">
            This Page isn't Exist, you can go home
          </p>
          <p className="text-muted">Error Code: 404 - NotFound</p>
          <Link to="/" className="btn btn-primary btn-lg mt-3">
            Go Back Home
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-muted">
            If you believe this is a mistake, please contact our support team.
          </p>
        </div>
      </div>
    </>
  );
}

export default NotFound;
