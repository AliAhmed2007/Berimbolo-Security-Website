import { useState, useEffect, useContext } from "react";
import { db, auth } from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Message from "../../components/shared/Message";
import Loading from "../../components/shared/Loading";
import ImgForAll from "../../assets/images/boy.jpg";
import UnAuthorized from "../UnAuthorized";
import Gender from "./Gender";
import { signOut } from "firebase/auth";
import { cartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch } = useContext(cartContext);
  const navigate = useNavigate()

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]);

  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        setMessage({ state: "error", message: "No user data found." });
      }
    } catch (error) {
      setMessage({ state: "error", message: error.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const updateUserDoc = async (data) => {
    try {
      const userDocRef = doc(db, "users", data.id);
      await updateDoc(userDocRef, data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      await updateUserDoc(userData);
      setMessage({
        state: "success",
        message: "Profile updated successfully!",
      });
      setIsEditing(false);
    } catch (error) {
      const errorMessage = error.message.replace(/Firebase:\s/, "");
      setMessage({ state: "error", message: errorMessage });
    }
  };

  const handleEditingToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

   async function logout() {
      await signOut(auth);
      dispatch({ type: "CLEAR_CART" });
      navigate('/login');
    }
  

  if (!auth.currentUser) return <UnAuthorized />;

  if (!userData) {
    return (
      <div>
        {message && <Message state={message.state} message={message.message} />}
        <Loading />
      </div>
    );
  }

  const userProfile = (
    <div className="col-12 col-md-4 text-center">
      <img
        src={userData.photoURL || ImgForAll}
        alt="User Profile"
        className="rounded-circle img-fluid"
        style={{ maxWidth: "150px" }}
      />
    </div>
  );

  const userDetails = (
    <ul className="list-unstyled d-flex flex-column gap-3">
      <li className="d-flex align-items-center flex-row gap-2">
        <strong>Gender:</strong>
        <Gender
          isEditing={isEditing}
          userData={userData}
          currentUser={currentUser}
          handleChange={handleChange}
        />
      </li>
      <li className="d-flex align-items-center flex-row gap-2">
        <strong>Country:</strong>
        {isEditing ? (
          <input
            placeholder="Your Country"
            className="form-control"
            type="text"
            name="country"
            value={userData.country || ""}
            onChange={handleChange}
          />
        ) : (
          userData.country || "N/A"
        )}
      </li>
      <li className="d-flex align-items-center flex-row gap-2">
        <strong>Member Since:</strong>{" "}
        {userData.createdAt
          ? new Date(userData.createdAt).toUTCString().replace(" GMT", "")
          : "N/A"}
      </li>
      <li className="d-flex align-items-center flex-row gap-2">
        <strong>Last Login:</strong>{" "}
        {userData.lastLogin
          ? new Date(userData.lastLogin).toUTCString().replace(" GMT", "")
          : "N/A"}
      </li>
    </ul>
  );

  return (
    <div className="container-fluid my-5 py-5 pt-3">
      <div>
        {message && <Message state={message.state} message={message.message} />}
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3>User Dashboard</h3>
            </div>
            <div className="card-body">
              <div className="row">
                {userProfile}
                <div className="col-12 col-md-8">
                  <h4 className="mt-4">
                    {isEditing ? (
                      <div className="d-flex flex-column gap-2">
                        <input
                          placeholder="First Name"
                          className="form-control"
                          type="text"
                          name="firstName"
                          value={userData.firstName || ""}
                          onChange={handleChange}
                        />
                        <input
                          placeholder="Last Name"
                          className="form-control"
                          type="text"
                          name="lastName"
                          value={userData.lastName || ""}
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      `${userData.firstName || "N/A"} ${
                        userData.lastName || "N/A"
                      }`
                    )}
                  </h4>
                  <p className="text-muted">{userData.email}</p>
                  <hr />
                  <h5>Details</h5>
                  <div className="ps-3">{userDetails}</div>
                  <hr />
                  <div className="d-flex justify-content-center flex-row gap-4 mt-4">
                    <button className="btn btn-danger" onClick={logout}>Log Out</button>
                    <button
                      onClick={handleEditingToggle}
                      className="btn btn-primary"
                    >
                      {isEditing ? "Save Profile" : "Edit Profile"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
