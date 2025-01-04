import { Link } from "react-router-dom"

function UnAuthorized() {
    return (
        <div className="container my-5 py-5 text-center">
            <div className="alert alert-danger py-4 shadow-lg">
                <h1 className="display-4 fw-bold text-danger">401</h1>
                <h2 className="mb-3">Unauthorized Access</h2>
                <p className="fs-5">
                    You need to be authenticated to access this page. Please sign in to continue.
                </p>
                <p className="text-muted">Error Code: 401 - Unauthorized</p>
                <Link to="/login" className="btn btn-primary btn-lg mt-3">
                    Sign In Here
                </Link>
            </div>
            <div className="mt-4">
                <p className="text-muted">
                    If you believe this is a mistake, please contact our support team.
                </p>
            </div>
        </div>
    )
}

export default UnAuthorized