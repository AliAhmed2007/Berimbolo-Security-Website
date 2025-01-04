import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import Message from "../../components/shared/Message";

function SignUp() {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    country: "",
    password: "",
    confirmPassword: "",
  }
  const [formData, setFormData] = useState(initialData);

  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.gender) newErrors.gender = "Gender isn't Selected"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  async function storeInDB(formData, currentUser) {
    try {
      await setDoc(doc(db, 'users', currentUser.user.uid), {
        id: currentUser.user.uid,
        ...formData,
        createdAt: currentUser.user.metadata.creationTime,
        lastLogin: currentUser.user.metadata.lastSignInTime
      });

      setFormData(initialData);
    } catch (error) {
      const errorMessage = error.message.replace(/Firebase:\s/, "");
      setErrors({ db: errorMessage });
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    if (!validate()) return;

    try {
      const credintials = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      storeInDB(formData, credintials)
      setSuccess("Account created successfully!");
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);
    } catch (error) {
      const errorMessage = error.message.replace(/Firebase:\s/, "");
      setErrors({ auth: errorMessage });
    }
  };

  return (
    <section className="bg-dark" style={{minHeight: 'calc(100vh - 120px)'}}>
      <div className="container py-0 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-12">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-3 text-uppercase text-center">
                      Get Started with Berimbolo Now
                    </h3>
                    {success && <Message state="success" message={success} />}
                    {errors.auth && <Message state="error" message={errors.auth} />}
                    {errors.db && <Message state="error" message={errors.db} />}
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label className="form-label" htmlFor="firstNameInput">
                            First Name:
                          </label>
                          <input
                            type="text"
                            id="firstNameInput"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                          {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label" htmlFor="lastNameInput">
                            Last Name:
                          </label>
                          <input
                            type="text"
                            id="lastNameInput"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                          {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                        </div>
                      </div>

                      <label className="form-label" htmlFor="emailAddressInput">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="emailAddressInput"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                      {errors.email && <p className="text-danger">{errors.email}</p>}
                      <div className="row mt-3">
                        <div className="col-md-6 mb-4">
                          <label className="form-label" htmlFor="passwordInput">
                            Password:
                          </label>
                          <input
                            type="password"
                            id="passwordInput"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                          {errors.password && <p className="text-danger">{errors.password}</p>}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label" htmlFor="confirmPasswordInput">
                            Confirm Password:
                          </label>
                          <input
                            type="password"
                            id="confirmPasswordInput"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                          {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="country col-md-7 mb-4">
                          <label className="form-label" htmlFor="country">
                            Your Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                        </div>
                        <div className="gender col-md-5 mb-4 d-flex flex-row gap-4 mt-4 fs-5">
                          <div className="male d-flex flex-row gap-2 align-items-center">
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value="male" // Use "male" as the value
                              checked={formData.gender === "male"} // Check if gender is male
                              onChange={handleChange}
                            />
                            <label htmlFor="male">Male</label>
                          </div>
                          <div className="female d-flex flex-row gap-2 align-items-center">
                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value="female" // Use "female" as the value
                              checked={formData.gender === "female"} // Check if gender is female
                              onChange={handleChange}
                            />
                            <label htmlFor="female">Female</label>
                          </div>
                          {errors.gender && <p className="text-danger mt-3">{errors.gender}</p>}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center gap-4 pt-3">
                        <button
                          type="reset"
                          className="btn btn-dark text-white btn-lg"
                          onClick={() => setFormData({})}
                        >
                          Reset all
                        </button>
                        <button type="submit" className="btn btn-warning btn-lg">
                          Get Started
                        </button>
                      </div>
                    </form>
                    <Link
                      to="/login"
                      className="d-block fw-bold text-black-50 text-center mt-4 loginLink"
                    >
                      Already Own An Existing One?
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

export default SignUp;
