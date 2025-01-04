import PropTypes from "prop-types";
const Gender = ({ isEditing, userData, handleChange }) => {
    const genderSelection = (
      <>
        <div className="male d-flex flex-row gap-2 align-items-center">
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male" // Ensure this matches the casing stored in userData.gender
            checked={userData.gender === "Male"} // Match case
            onChange={handleChange}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="female d-flex flex-row gap-2 align-items-center">
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female" // Ensure this matches the casing stored in userData.gender
            checked={userData.gender === "Female"} // Match case
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
        </div>
      </>
    );
  
    return (
      <div className="d-flex align-items-center gap-3 flex-row">
        {isEditing ? genderSelection : userData.gender || "N/A"}
      </div>
    );
  };
  
  export default Gender;
  
  Gender.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
  };
  