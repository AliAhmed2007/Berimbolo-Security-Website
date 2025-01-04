/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth, db } from "../../firebase/firebase";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import Message from "../../components/shared/Message";
import Loading from "../../components/shared/Loading";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  async function updateUserDoc(currentUser) {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);

      await updateDoc(userDocRef, {
        lastLogin: currentUser.metadata.lastSignInTime,
      });

    } catch (error) {
      const errorMessage = error.message.replace(/Firebase:\s/, "");
      setError(errorMessage);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      credentials.displayName = credentials.user.displayName;
      updateUserDoc(credentials.user)
      setMessage({ state: "success", message: "You became Authenticated!" });
      setIsLoading(true)
      setTimeout(() => {
        navigate("/dashboard");
        setIsLoading(false)
      }, 2000);
    } catch (err) {
      const errMsg = err.message.replace(/Firebase:\s/, "");
      setError(errMsg);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const credentials = await signInWithPopup(auth, googleProvider);
      const user = credentials.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        updateUserDoc(credentials.user)
        setMessage({ state: "success", message: "You became Authenticated!" });
      } else {
        await setDoc(userDocRef, {
          id: user.uid,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '', 
          email: user.email,
          photoURL: user.photoURL || '',
          createdAt: user.metadata.creationTime,
          lastLogin: user.metadata.lastSignInTime,
          country: '',
          gender: '',
          password: '',
        });
      }

      setIsLoading(true)
      setTimeout(() => {
        navigate("/dashboard");
        setIsLoading(false)
      }, 2000);
    } catch (err) {
      const errMsg = err.message.replace(/Firebase:\s/, "");
      setError(errMsg);
    }
  };

  if (isLoading) {
    return (
      <>
        <Loading />
        {message && <Message state={message.state} message={message.message} />}
      </>
    )
  }

  return (
    <section className="bg-dark" style={{minHeight: 'calc(100vh - 120px)'}}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-12">
                  <div className="card-body bg-white p-md-5 text-black login-body">
                    <h3 className="mb-3 text-uppercase text-center">
                      Log In to Berimbolo
                    </h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="emailAddressInput">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="emailAddressInput"
                          className="form-control form-control-lg"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="passwordInput">
                          Password
                        </label>
                        <input
                          type="password"
                          id="passwordInput"
                          className="form-control form-control-lg"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-center flex-row pt-3">
                        <button
                          type="button"
                          className="btn btn-light btn-lg bg-dark text-white"
                          onClick={() => {
                            setEmail("");
                            setPassword("");
                            setError("");
                          }}
                        >
                          Reset all
                        </button>
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2 text-white"
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                    <div className="login-methods text-center py-3">
                      <p className="text-black-50 fw-bold">Or Login Using</p>
                      <div className="social-media">
                        <div className="d-flex justify-content-center gap-4 flex-row text-dark">
                          <i
                            onClick={signInWithGoogle}
                            style={{ cursor: "pointer" }}
                            className="bi bi-google fs-3"
                          ></i>
                          <i
                            style={{ cursor: "pointer" }}
                            className="bi bi-facebook fs-3"
                          ></i>
                          <i
                            style={{ cursor: "pointer" }}
                            className="bi bi-linkedin fs-3"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/register"
                      className="d-block fw-bold text-black-50 text-center mt-4 loginLink"
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
